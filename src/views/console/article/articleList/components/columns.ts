import type { ColumnDef } from '@tanstack/vue-table'
import type { Article } from '../data/schema'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { labels, categories, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'w-[50px] text-center truncate font-medium' }, 'ID'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'w-[50px] text-center truncate font-medium' }, row.getValue('id')),
      ])
    },
  },
  // {
  //   id: 'select',
  //   header: ({ table }) => h(Checkbox, {
  //     'modelValue': table.getIsAllPageRowsSelected(),
  //     'indeterminate': table.getIsSomePageRowsSelected(),
  //     'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
  //     'ariaLabel': 'Select all',
  //     'class': 'translate-y-0.5',
  //   }),
  //   cell: ({ row }) => h(Checkbox, { 'modelValue': row.getIsSelected(), 'onUpdate:modelValue': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'title',
    header: () => h('div', '标题'),
    // cell: ({ row }) => {
    //   return h('div', { class: 'flex space-x-2' }, [
    //     h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
    //   ])
    // },
    cell: ({ row }) => {
      const category = categories.find(
        category => category.value == row.original.fatherCategoryId,
      )

      return h('div', { class: 'flex space-x-2' }, [
        category ? h(Badge, { variant: 'outline' }, () => category.label) : null,
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
      ])
    },
  },
  {
    accessorKey: 'fatherCategoryId',
    header: () => h('div', '分类'),
    cell: ({ row }) => {      
      const category = categories.find(
        category => category.value == row.getValue('fatherCategoryId'),
      )

      if (!category)
        return null

      return h('div', { class: 'flex w-[100px] items-center' }, [
        h('span', category.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h('div', "状态"),

    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value == row.getValue('status'),
      )

      if (!status)
        return null

      return h('div', { class: 'flex w-[100px] items-center' }, [
        status.icon && h(status.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
        h('span', status.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'pageView',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: '浏览量' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px]' }, row.getValue('pageView')),
      ])
    },
  },
  {
    accessorKey: 'description',
    header: () => h('div', '描述'),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('description')),
      ])
    },
  },
  {
    accessorKey: 'publishedTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: '发布日期' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px]' }, row.getValue('publishedTime')),
      ])
    },
  },
  
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
