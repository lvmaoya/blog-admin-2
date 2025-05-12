import type { ColumnDef } from '@tanstack/vue-table'
import type { CommentInfo } from '../data/schema'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, categories, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<CommentInfo>[] = [
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
    accessorKey: 'content',
    header: () => h('div', '内容'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('content')),
      ])
    },
  },
  {
    accessorKey: 'articleTitle',
    header: () => h('div', '文章标题'),
    cell: ({ row }) => {
      return h('div', { class: '' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('articleTitle')),
      ])
    },
  },
  {
    accessorKey: 'type',
    header: () => h('div', '类型'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('type') == 0 ? '评论' : '回复'),
      ])
    },
  },

  {
    accessorKey: 'username',
    header: () => h('div', '用户名'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('username')),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', '用户邮箱'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('email')),
      ])
    },
  },

  {
    accessorKey: 'status',
    header: () => h('div', '评论状态'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('status') ? '不可见' : '正常'),
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
