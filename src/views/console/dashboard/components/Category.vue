<template>
    <Card class="col-span-2 h-full overflow-hidden flex flex-col">
        <CardHeader class="flex-shrink-0">
            <CardTitle>分类</CardTitle>
            <CardDescription>
                本月共发布 {{ props.articleStatisticsData?.totalBlogCount }} 篇文章。
            </CardDescription>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ul class="space-y-8 pr-2">
                <li v-for="item in props.articleStatisticsData?.categoryCountList">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-black rounded-xl"></div>
                        <div>{{ categories.find(i=> i.value == item.father_category_id).name }} ({{ item.count }})</div>
                        <div class="flex-1 text-right">
                            <a 
                                href="#" 
                                target="_blank"
                                class="text-xs hover:underline"
                            >
                                查看全部
                            </a>
                        </div>
                    </div>
                    <div class="pl-4 mt-2">
                        <Progress class="h-4"
                            :model-value="item.count / props.articleStatisticsData?.totalBlogCount * 100" />
                    </div>
                </li>
            </ul>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Button from '@/components/ui/button/Button.vue'
import { BlogStatistics } from '..';

const props = defineProps<{ articleStatisticsData: BlogStatistics }>()

const categories = [
    {
        name: "项目文章",
        value: 1
    }, {
        name: "学习文章",
        value: 2
    }, {
        name: "随笔文章",
        value: 3
    }, {
        name: "图片",
        value: 4
    }
]
</script>
