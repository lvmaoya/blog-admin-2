<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="space-y-4">
            <DataTableToolbar :table="table" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";

const articleList = ref([]);

const getArticleList = async () => {
    tableDataLoading.value = true
    let res = await articleListData({ page: 1, size: 20 });
    articleList.value = res.records
    tableDataLoading.value = false
}
const tableDataLoading = ref(false)
onMounted(() => {
    getArticleList()
})
</script>
<style lang="scss" scoped></style>