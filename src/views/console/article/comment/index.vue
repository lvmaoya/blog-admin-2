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
            <DataTable :data="commentList" :columns="columns"  v-model:loading="loading"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { commentListData } from "@/service/comment";
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import { CommentInfo } from "./data/schema";
import { useEventBus } from '@vueuse/core'
const bus = useEventBus<string>('refresh-table')

// 接收事件 - 自动推断类型
bus.on((payload) => {
    getCommentList() 
})
const loading = ref(false)

const commentList = ref<Array<CommentInfo>>([]);
const getCommentList = async () => {
    loading.value = true
    let res = await commentListData({ page: 1, size: 9999 });
    commentList.value = res.records
    loading.value = false
}
onMounted(() => {
    getCommentList()
})
</script>
<style lang="scss" scoped></style>