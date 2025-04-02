<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="space-y-4">
            <DataTable :data="categoryList" :columns="columns" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { categoryListData } from "@/service/category";
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import { Category } from "./data/schema";
import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')

// 接收事件 - 自动推断类型
bus.on((payload) => {
    getCategoryList()  
})

const categoryList = ref<Array<Category>>([]);
const loading = ref(false)
const getCategoryList = async () => {
    loading.value = true;
    let res = await categoryListData({ page: 1, size: 9999 });
    loading.value = false;
    categoryList.value = res
}
onMounted(() => {
    getCategoryList()
})
</script>
<style lang="scss" scoped></style>