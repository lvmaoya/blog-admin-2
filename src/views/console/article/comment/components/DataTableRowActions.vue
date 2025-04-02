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
    ...row.value, status: Number(!Boolean(row.value.status))
  }
  try {
    await disableComment(form)
    toast({
      title: 'Success',
      description: 'Comment disabled successfully'
    })
    bus.emit("refresh-table")

  } catch (error) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to disable comment',
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
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem @click="handleDisable">
        {{ row.status ? '设为不可见' : '设为可见' }}
      </DropdownMenuItem>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuItem>
        Delete
        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
      </DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
