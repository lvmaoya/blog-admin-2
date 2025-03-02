<!--
 * @Author: sun
 * @Date: 2022-11-08 08:57:35
 * @LastEditTime: 2022-12-13 12:00:17
 * @Description: Do not edit
-->
<template>
    <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="space-y-4">
            <DataTableToolba />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { articleListData } from "@/service/article";
import DataTableToolbar from "./comps/DataTableToolbar.vue";




const articleList = ref([]);
const getArticleList = async () => {
    let res = await articleListData({ page: 1, size: 20 });
    articleList.value = res.records
}
onMounted(() => {
    // getArticleList()
})
</script>
<style lang="scss" scoped></style>