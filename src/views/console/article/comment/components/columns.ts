import type { ColumnDef } from '@tanstack/vue-table'
import type { CommentInfo } from '../data/schema'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, categories, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<CommentInfo>[] = [
  // {
  //   accessorKey: 'id',
  //   header: () => h('div', 'ID'),
  //   cell: ({ row }) => {      
  //     return h('div', { class: 'flex space-x-2' }, [
  //       h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('id')),
  //     ])
  //   },
  // },
  {
    accessorKey: 'content',
    header: () => h('div', 'Content'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('content')),
      ])
    },
  },
  {
    accessorKey: 'articleTitle',
    header: () => h('div', 'Article Title'),
    cell: ({ row }) => {
      return h('div', { class: '' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('articleTitle')),
      ])
    },
  },
  {
    accessorKey: 'type',
    header: () => h('div', 'Type'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('type') == 0 ? '评论' : '回复'),
      ])
    },
  },

  {
    accessorKey: 'userName',
    header: () => h('div', 'Name'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('userName')),
      ])
    },
  },
  {
    accessorKey: 'toUserName',
    header: () => h('div', 'To'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('toUserName') ?? '--'),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('email')),
      ])
    },
  },

  {
    accessorKey: 'status',
    header: () => h('div', 'status'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('status') ? '正常' : '不可见'),
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
