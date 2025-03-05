<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataTableToolbar from './DataTableToolbar.vue';
import DataTablePagination from './DataTablePagination.vue';
import DataTableRowActions from './DataTableRowActions.vue';
import DataTableColumnHeader from './DataTableColumnHeader.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Article } from '../Data';

interface TableData {
  tableData: Array<Article>
}

defineProps<TableData>()

</script>

<template>
  <DataTableToolbar />
  <div class="border border-[#e5e7eb] rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px] text-center">
            <Checkbox />
          </TableHead>
          <TableHead class="text-center">
            ID
          </TableHead>
          <TableHead class="text-center">
            标题
          </TableHead>
          <TableHead class="text-center">
            类别
          </TableHead>
          <TableHead class="text-center">
            状态
          </TableHead>
          <TableHead class="text-center">
            <DataTableColumnHeader title="浏览量" />
          </TableHead>
          <TableHead class="text-center">
            <DataTableColumnHeader title="发布日期" />
          </TableHead>
          <TableHead class="w-[100px] text-center">
            操作
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in tableData" :key="item.id">
          <TableCell class="text-center">
            <Checkbox />
          </TableCell>
          <TableCell class="text-center">
            {{ item.id }}
          </TableCell>
          <TableCell class="text-center">
            {{ item.title }}
          </TableCell>
          <TableCell class="text-center">
            {{ item.fatherCategoryId }}
          </TableCell>
          <TableCell class="text-center">
            {{ item.status }}
          </TableCell>
          <TableCell class="text-center">
            {{ item.pageView }}
          </TableCell>
          <TableCell class="text-center ">
            {{ item.publishedTime }}
          </TableCell>
          <TableCell class="text-center w-[100px] flex items-center justify-center">
            <DataTableRowActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <DataTablePagination />
</template>