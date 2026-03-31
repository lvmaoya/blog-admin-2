<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Row } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast/use-toast'
import DotsHorizontalIcon from '@radix-icons/vue/DotsHorizontalIcon'
import { TrashIcon, Pencil1Icon } from '@radix-icons/vue'
import { addOrUpdateCategory, deleteCategory } from "@/service/category";
import type { Category } from '../data/schema'
import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')
interface DataTableRowActionsProps {
  row: Row<Category>
}

const props = defineProps<DataTableRowActionsProps>()
const { toast } = useToast()
const row = computed(() => props.row.original)

// 编辑状态
const isEditDialogOpen = ref(false)
const editName = ref('')
const isEditing = ref(false)

// 删除状态
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)

// 打开编辑对话框
const openEditDialog = () => {
  editName.value = row.value.categoryName
  isEditDialogOpen.value = true
}

// 提交编辑
const handleEdit = async () => {
  if (!editName.value.trim()) {
    toast({
      title: '错误',
      description: '分类名称不能为空',
      variant: 'destructive'
    })
    return
  }

  if (editName.value.length > 50) {
    toast({
      title: '错误',
      description: '分类名称不能超过 50 个字符',
      variant: 'destructive'
    })
    return
  }

  try {
    isEditing.value = true
    await addOrUpdateCategory({ id: row.value.id, categoryName: editName.value.trim(), fatherCategoryId: row.value.fatherCategoryId })
    isEditDialogOpen.value = false
    toast({
      title: '成功',
      description: '分类更新成功'
    })
    bus.emit("refresh-table")

  } catch (error) {
    toast({
      title: '错误',
      description: error.message || '分类更新失败',
      variant: 'destructive'
    })
  } finally {
    isEditing.value = false
  }
}

// 提交删除
const handleDelete = async () => {
  try {
    isDeleting.value = true
    await deleteCategory(row.value.id)
    isDeleteDialogOpen.value = false
    toast({
      title: '成功',
      description: '分类删除成功'
    })
    bus.emit("refresh-table")

  } catch (error) {
    toast({
      title: '错误',
      description: error.message || '分类删除失败',
      variant: 'destructive'
    })
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="flex gap-2">
    <!-- 编辑对话框 -->
    <Dialog v-model:open="isEditDialogOpen">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon class="h-4 w-4" />
            <span class="sr-only">打开菜单</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[160px]">
          <DropdownMenuItem @click="openEditDialog">
            <Pencil1Icon class="mr-2 h-3.5 w-3.5" />
            编辑
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            @click="isDeleteDialogOpen = true">
            <TrashIcon class="mr-2 h-3.5 w-3.5" />
            删除
            <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑分类</DialogTitle>
          <DialogDescription>
            修改分类名称，完成后点击保存。
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              名称
            </Label>
            <Input id="name" v-model="editName" class="col-span-3" :disabled="isEditing" @keyup.enter="handleEdit" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isEditDialogOpen = false" :disabled="isEditing">
            取消
          </Button>
          <Button type="submit" @click="handleEdit" :disabled="isEditing || !editName.trim()">
            <span v-if="isEditing" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              保存中...
            </span>
            <span v-else>保存修改</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认对话框 -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            确认删除“{{ row.categoryName }}”吗？
            删除后将无法恢复。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="isDeleteDialogOpen = false" :disabled="isDeleting">
            取消
          </Button>
          <Button variant="destructive" @click="handleDelete" :disabled="isDeleting">
            <span v-if="isDeleting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              删除中...
            </span>
            <span v-else>删除</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
