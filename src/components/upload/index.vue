<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-vue-next'

interface FileWithPreview extends File {
  preview?: string
}

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: '*'
  },
  maxSize: {
    type: Number,
    default: 10 // MB
  }
})

const emits = defineEmits(['update:modelValue'])

const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<FileWithPreview[]>([])
const isDragging = ref(false)

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    addFiles(Array.from(input.files))
  }
}

const addFiles = (newFiles: File[]) => {
  // Check file size
  const oversizedFiles = newFiles.filter(
    file => file.size > props.maxSize * 1024 * 1024
  )
  
  if (oversizedFiles.length > 0) {
    alert(`Some files exceed the maximum size of ${props.maxSize}MB`)
    return
  }

  // Add preview for images
  const filesWithPreview = newFiles.map(file => {
    if (file.type.startsWith('image/')) {
      const fileWithPreview: FileWithPreview = file
      fileWithPreview.preview = URL.createObjectURL(file)
      return fileWithPreview
    }
    return file
  })

  if (props.multiple) {
    files.value = [...files.value, ...filesWithPreview]
  } else {
    files.value = filesWithPreview.slice(0, 1)
  }
  
  emits('update:modelValue', files.value)
}

const removeFile = (index: number) => {
  // Revoke object URL if it's an image
  if (files.value[index].preview) {
    URL.revokeObjectURL(files.value[index].preview!)
  }
  files.value.splice(index, 1)
  emits('update:modelValue', files.value)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files))
  }
}

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :multiple="multiple"
      :accept="accept"
      @change="handleFileChange"
    />

    <!-- Drop zone -->
    <div
      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
      :class="{
        'border-primary bg-primary/10': isDragging,
        'border-border': !isDragging
      }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <div class="flex flex-col items-center justify-center space-y-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5 text-muted-foreground"
          >
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <line x1="16" x2="22" y1="5" y2="5" />
            <line x1="19" x2="19" y1="2" y2="8" />
            <path d="M15 8a7 7 0 0 0-7 7" />
            <circle cx="15" cy="15" r="3" />
          </svg>
        </div>
        <div class="text-sm text-muted-foreground">
          <span class="font-medium text-primary">Click to upload</span> or drag and drop
        </div>
        <div class="text-xs text-muted-foreground">
          {{ accept === '*' ? 'Any file type' : accept }} (max. {{ maxSize }}MB)
        </div>
      </div>
    </div>

    <!-- Selected files preview -->
    <div v-if="files.length > 0" class="space-y-2">
      <Label>Selected files</Label>
      <div class="space-y-2">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between rounded-md border p-3"
        >
          <div class="flex items-center space-x-3">
            <div v-if="file.preview" class="h-10 w-10 overflow-hidden rounded-md">
              <img
                :src="file.preview"
                :alt="file.name"
                class="h-full w-full object-cover"
              />
            </div>
            <div v-else class="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 text-muted-foreground"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ (file.size / 1024 / 1024).toFixed(2) }} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            class="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            @click.stop="removeFile(index)"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>