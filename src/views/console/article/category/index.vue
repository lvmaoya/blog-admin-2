<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="space-y-4">
            <!-- <Table :tableData="articleList"/> -->
            <DataTable :data="categoryList" :columns="columns" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";
import Table from "./components/Table.vue";
import { categoryListData } from "@/service/category";
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import { Category } from "./data/schema";


const categoryList = ref<Array<Category>>([]);
const getCategoryList = async () => {
    let res = await categoryListData({ page: 1, size: 9999 });
    categoryList.value = res
}
onMounted(() => {
    getCategoryList()
})
</script>
<style lang="scss" scoped></style>