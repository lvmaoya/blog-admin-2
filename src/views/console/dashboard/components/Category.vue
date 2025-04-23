<template>
    <Card class="col-span-2 h-full overflow-hidden flex flex-col">
        <CardHeader class="flex-shrink-0">
            <CardTitle>Categories</CardTitle>
            <CardDescription>
                You wrote {{ props.articleStatisticsData?.totalBlogCount }} blog(s) this month.
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
                                View all
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
        name: "Project Articles",
        value: 1
    }, {
        name: "Study Articles",
        value: 2
    }, {
        name: "Blog Articles",
        value: 3
    }, {
        name: "Pictures",
        value: 4
    }
]
</script>
