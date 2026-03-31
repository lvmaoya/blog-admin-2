import type { ColumnDef } from '@tanstack/vue-table'
import type { CommentInfo } from '../data/schema'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, categories, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

const displayValue = (value: unknown) => {
  if (value === null || value === undefined)
    return '--'
  if (typeof value === 'string' && value.trim() === '')
    return '--'
  return value
}

export const columns: ColumnDef<CommentInfo>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'w-[50px] text-center truncate font-medium' }, 'ID'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'w-[50px] text-center truncate font-medium' }, displayValue(row.getValue('id'))),
      ])
    },
  },
  {
    accessorKey: 'content',
    header: () => h('div', '内容'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, displayValue(row.getValue('content'))),
      ])
    },
  },
  {
    accessorKey: 'articleTitle',
    header: () => h('div', '文章标题'),
    cell: ({ row }) => {
      return h('div', { class: '' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, displayValue(row.getValue('articleTitle'))),
      ])
    },
  },
  {
    accessorKey: 'type',
    header: () => h('div', '类型'),
    cell: ({ row }) => {
      const typeValue = row.getValue('type')
      const typeLabel = typeValue == 0 ? '评论' : typeValue == 1 ? '回复' : '--'
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, typeLabel),
      ])
    },
  },

  {
    accessorKey: 'username',
    header: () => h('div', '用户名'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, displayValue(row.getValue('username'))),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', '用户邮箱'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, displayValue(row.getValue('email'))),
      ])
    },
  },

  {
    accessorKey: 'status',
    header: () => h('div', '评论状态'),
    cell: ({ row }) => {
      const statusValue = row.getValue('status')
      const statusLabel = statusValue == 1 ? '不可见' : statusValue == 0 ? '正常' : '--'
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, statusLabel),
      ])
    },
  },
  {
    accessorKey: 'createdTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: '创建时间' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px]' }, displayValue(row.getValue('createdTime'))),
      ])
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
