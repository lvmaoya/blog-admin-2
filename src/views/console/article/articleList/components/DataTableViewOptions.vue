<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Article } from '../data/schema'
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
  table: Table<Article>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))

const columnLabelMap: Record<string, string> = {
  id: 'ID',
  title: '标题',
  fatherCategoryId: '分类',
  status: '状态',
  pageView: '浏览量',
  description: '描述',
  publishedTime: '发布日期',
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
