<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { computed } from 'vue'
import {Cross2Icon} from '@radix-icons/vue'

import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'


</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        class="h-8 w-[150px] lg:w-[250px]"
      />
      <DataTableFacetedFilter/>
      <DataTableFacetedFilter/>

      <Button
        variant="ghost"
        class="h-8 px-2 lg:px-3"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions/>
  </div>
</template>
