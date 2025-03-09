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
    header: () => h('div', 'ID'),
    cell: ({ row }) => {      
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('id')),
      ])
    },
  },
  {
    accessorKey: 'articleId',
    header: () => h('div', 'Article Id'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('articleId')),
      ])
    },
  },
  {
    accessorKey: 'type',
    header: () => h('div', 'type'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('type')),
      ])
    },
  },
  {
    accessorKey: 'rootId',
    header: () => h('div', 'rootId'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('rootId')),
      ])
    },
  },
  {
    accessorKey: 'toUserId',
    header: () => h('div', 'toUserId'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('toUserId')),
      ])
    },
  },
  {
    accessorKey: 'toUserName',
    header: () => h('div', 'toUserName'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('toUserName')),
      ])
    },
  },
  {
    accessorKey: 'avatar',
    header: () => h('div', 'avatar'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('avatar')),
      ])
    },
  },
  {
    accessorKey: 'userName',
    header: () => h('div', 'userName'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('userName')),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', 'email'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('email')),
      ])
    },
  },
  {
    accessorKey: 'content',
    header: () => h('div', 'content'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('content')),
      ])
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', 'status'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('status')),
      ])
    },
  },
  {
    accessorKey: 'preferNumber',
    header: () => h('div', 'preferNumber'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('preferNumber')),
      ])
    },
  },
  {
    accessorKey: 'deleted',
    header: () => h('div', 'Deleted'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('deleted')),
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
