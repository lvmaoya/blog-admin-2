<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="p-4" v-loading="loading">
        <DataTable :data="articleList" :columns="columns" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";
import { Article } from "./data/schema";
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')

// 接收事件 - 自动推断类型
bus.on((payload) => {
    getArticleList()  
})
const loading = ref(true)
const articleList = ref<Array<Article>>([]);
const getArticleList = async () => {
    loading.value = true
    let res = await articleListData({ page: 1, size: 9999 });
    articleList.value = res.records
    loading.value = false
}
onMounted(() => {
    getArticleList()
})
</script>
<style lang="scss" scoped></style>