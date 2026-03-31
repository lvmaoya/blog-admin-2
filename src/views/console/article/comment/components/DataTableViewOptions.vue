<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { CommentInfo } from '../data/schema'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { computed } from 'vue'
import MixerHorizontalIcon from '@radix-icons/vue/MixerHorizontalIcon'

interface DataTableViewOptionsProps {
  table: Table<CommentInfo>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))

const columnLabelMap: Record<string, string> = {
  id: 'ID',
  content: '内容',
  articleTitle: '文章标题',
  type: '类型',
  username: '用户名',
  email: '用户邮箱',
  status: '评论状态',
  createdTime: '创建时间',
  actions: '操作',
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
      >
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        视图
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>列显示</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
      >
        {{ columnLabelMap[column.id] || column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
