import type { ColumnDef } from '@tanstack/vue-table'
import { getFatherCategoryName, type Category } from '../data/schema'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, categories, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'w-[50px] text-center truncate font-medium' }, 'ID'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'w-[50px] text-center truncate font-medium' }, row.getValue('id')),
      ])
    },
  },
  {
    accessorKey: 'categoryName',
    header: () => h('div', '名称'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('categoryName')),
      ])
    },
  },
  {
    accessorKey: 'fatherCategoryId',
    header: () => h('div', '类别'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, getFatherCategoryName(row.getValue('fatherCategoryId')) ),
      ])
    },
  },
  {
    accessorKey: 'createdTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: '创建时间' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px]' }, row.getValue('createdTime')),
      ])
    },
  },
  
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
