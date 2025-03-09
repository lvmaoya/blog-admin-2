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
            <DataTable :data="commentList" :columns="columns" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";
import Table from "./components/Table.vue";
import { commentListData } from "@/service/comment";
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import { CommentInfo } from "./data/schema";


const commentList = ref<Array<CommentInfo>>([]);
const getCommentList = async () => {
    let res = await commentListData({ page: 1, size: 9999 });
    commentList.value = res.records
}
onMounted(() => {
    getCommentList()
})
</script>
<style lang="scss" scoped></style>