<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { CommentInfo } from '../data/schema'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { computed } from 'vue'

import { categories, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Cross2Icon from '@radix-icons/vue/Cross2Icon'
import {Plus} from 'lucide-vue-next'

interface DataTableToolbarProps {
  table: Table<CommentInfo>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
const isSomeRowsSelected = computed(() => props.table.getIsSomeRowsSelected())
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        :model-value="(table.getColumn('content')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('content')?.setFilterValue($event.target.value)"
      />
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
