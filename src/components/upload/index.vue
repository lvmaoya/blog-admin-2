<script setup lang="ts">
import { ref, watch, onBeforeUnmount, PropType, h } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-vue-next'
import { toast } from '../ui/toast/use-toast'

type FileWithPreview = File & {
  preview?: string
  id: string // 添加唯一标识
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<FileWithPreview[]>,
    default: () => []
  },
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
  },
  maxFiles: {
    type: Number,
    default: Infinity
  },
  disabled: {
    type: Boolean,
    default: false
  },
  initUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'error'])

const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<FileWithPreview[]>([])
const isDragging = ref(false)

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 11)

// 同步外部modelValue变化
watch(() => props.modelValue, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(files.value)) {
    files.value = [...newVal]
  }
}, { deep: true })

// 清理预览URL
onBeforeUnmount(() => {
  files.value.forEach(cleanupFilePreview)
})

const cleanupFilePreview = (file: FileWithPreview) => {
  if (file.preview) {
    URL.revokeObjectURL(file.preview)
  }
}

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    addFiles(Array.from(input.files))
    input.value = '' // 重置input，允许重复选择相同文件
  }
}

const validateFile = (file: File): string | null => {
  // 文件大小验证
  if (file.size > props.maxSize * 1024 * 1024) {
    return `文件 "${file.name}" 超过最大限制 ${props.maxSize}MB`
  }

  // 文件类型验证
  if (props.accept !== '*') {
    const acceptedTypes = props.accept.split(',')
      .map(type => type.trim().toLowerCase())
    
    const fileType = file.type.toLowerCase()
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    
    const isTypeValid = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return `.${fileExtension}` === type
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'))
      }
      return fileType === type
    })
    
    if (!isTypeValid) {
      return `文件 "${file.name}" 类型不符合要求 (${props.accept})`
    }
  }

  return null
}

const addFiles = (newFiles: File[]) => {
  console.log(newFiles);
  
  // 检查文件数量限制
  if (files.value.length + newFiles.length > props.maxFiles) {
    const errorMsg = `最多只能上传 ${props.maxFiles} 个文件`
    emit('error', errorMsg)
    toast({
        title: errorMsg
    })
    return
  }

  const validFiles: FileWithPreview[] = []
  const errors: string[] = []

  newFiles.forEach(file => {
    const error = validateFile(file)
    if (error) {
      errors.push(error)
    } else {
      const fileWithPreview: FileWithPreview = Object.assign(file, {
        id: generateId(),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      })
      validFiles.push(fileWithPreview)
    }
  })

  if (errors.length > 0) {
    emit('error', errors.join('\n'))
    alert(errors.join('\n'))
  }

  if (validFiles.length > 0) {
    if (props.multiple) {
      files.value = [...files.value, ...validFiles]
    } else {
      // 清理之前的文件预览
      files.value.forEach(cleanupFilePreview)
      files.value = validFiles.slice(0, 1)
    }
    emit('update:modelValue', files.value)
  }
}

const removeFile = (index: number) => {
  cleanupFilePreview(files.value[index])
  files.value.splice(index, 1)
  emit('update:modelValue', files.value)
}

const clearFiles = () => {
  files.value.forEach(cleanupFilePreview)
  files.value = []
  emit('update:modelValue', files.value)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (props.disabled) return
  
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files))
  }
}

const triggerFileInput = () => {
  if (!props.disabled && fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// 暴露方法给父组件
defineExpose({
  clearFiles,
  triggerFileInput
})
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
      :disabled="disabled"
    />

    <!-- Drop zone -->
    <div
      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
      :class="{
        'border-primary bg-primary/10': isDragging && !disabled,
        'border-border': !isDragging || disabled,
        'cursor-pointer': !disabled,
        'cursor-not-allowed opacity-50': disabled
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
          <span class="font-medium" :class="{
            'text-primary': !disabled,
            'text-muted-foreground': disabled
          }">点击上传</span> 或拖放文件到此处
        </div>
        <div class="text-xs text-muted-foreground">
          {{ accept === '*' ? '支持所有文件类型' : `支持: ${accept}` }} (最大 {{ maxSize }}MB)
          <span v-if="maxFiles < Infinity">, 最多 {{ maxFiles }} 个文件</span>
        </div>
      </div>
    </div>

    <!-- Selected files preview -->
    <div v-if="files.length > 0" class="space-y-2">
      <div class="flex items-center justify-between">
        <Label>已选择文件 ({{ files.length }})</Label>
        <button
          type="button"
          class="text-sm text-primary hover:underline"
          @click="clearFiles"
          :disabled="disabled"
        >
          清空所有
        </button>
      </div>
      <div class="space-y-2">
        <div
          v-for="(file, index) in files"
          :key="file.id"
          class="flex items-center justify-between rounded-md border p-3"
        >
          <div class="flex items-center space-x-3 min-w-0">
            <div v-if="file.preview" class="h-10 w-10 overflow-hidden rounded-md flex-shrink-0">
              <img
                :src="file.preview"
                :alt="file.name"
                class="h-full w-full object-cover"
              />
            </div>
            <div v-else class="flex h-10 w-10 items-center justify-center rounded-md bg-muted flex-shrink-0">
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
                {{ (file.size / 1024 / 1024).toFixed(2) }} MB · {{ file.type || '未知类型' }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            @click.stop="removeFile(index)"
            :disabled="disabled"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="props.initUrl" class="space-y-2">
      <div class="flex items-center justify-between">
        <Label>默认图片</Label>
      </div>
      <div class="space-y-2">
        <div
          class="flex items-center justify-between rounded-md border p-3"
        >
          <div class="flex items-center space-x-3 min-w-0">
            <div class="h-10 w-10 overflow-hidden rounded-md flex-shrink-0">
              <img
                :src="props.initUrl"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>