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
    header: () => h('div', 'ID'),
    cell: ({ row }) => {      
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('id')),
      ])
    },
  },
  {
    accessorKey: 'categoryName',
    header: () => h('div', 'Category Name'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('categoryName')),
      ])
    },
  },
  {
    accessorKey: 'fatherCategoryId',
    header: () => h('div', 'Father Category Name'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, getFatherCategoryName(row.getValue('fatherCategoryId')) ),
      ])
    },
  },
  {
    accessorKey: 'createdTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Created Time' }),
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
