<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed } from 'vue'
import { disableComment } from "@/service/comment";
import { labels } from '../data/data'
import type { CommentInfo } from '../data/schema'
import DotsHorizontalIcon from '@radix-icons/vue/DotsHorizontalIcon'
import { useToast } from '@/components/ui/toast'
import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')
interface DataTableRowActionsProps {
  row: Row<CommentInfo>
}
const props = defineProps<DataTableRowActionsProps>()
const { toast } = useToast()
const row = computed(() => props.row.original)


const handleDisable = async () => {
  let form = {
    commentId: row.value.id, status: Number(!Boolean(row.value.status))
  }
  try {
    await disableComment(form)
    toast({
      title: '成功',
      description: '评论状态更新成功'
    })
    bus.emit("refresh-table")

  } catch (error) {
    toast({
      title: '错误',
      description: error.message || '评论状态更新失败',
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">打开菜单</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem @click="handleDisable">
        {{ row.status ? '设为不可见' : '设为可见' }}
      </DropdownMenuItem>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>
        删除
        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
      </DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
