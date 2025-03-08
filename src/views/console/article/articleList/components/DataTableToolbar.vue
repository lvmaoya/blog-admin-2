<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { Article } from '../data/schema'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { computed } from 'vue'

import { categories, statuses } from '../data/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Cross2Icon from '@radix-icons/vue/Cross2Icon'
import {Trash2} from 'lucide-vue-next'

interface DataTableToolbarProps {
  table: Table<Article>
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
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('fatherCategoryId')"
        :column="table.getColumn('fatherCategoryId')"
        title="Category"
        :options="categories"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>
      <Button
        v-if="isSomeRowsSelected"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click=""
      >
        Delete
        <Trash2 class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
