<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { Article } from '../data/schema'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed } from 'vue'

import { labels } from '../data/data'
import { articleSchema } from '../data/schema'
import DotsHorizontalIcon from '@radix-icons/vue/DotsHorizontalIcon'

interface DataTableRowActionsProps {
  row: Row<Article>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => articleSchema.parse(props.row.original))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <DotsHorizontalIcon class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Top</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Share</DropdownMenuItem>
      <DropdownMenuItem>Preview</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Delete
        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
