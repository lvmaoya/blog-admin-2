<template>
    <Card class="col-span-2 h-full overflow-hidden flex flex-col">
        <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
                You made 265 sales this month.
            </CardDescription>
        </CardHeader>
        <CardContent class="flex-1">
            <ul class="h-full flex flex-col justify-between">
                <li v-for="item in categories">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-black rounded-xl"></div>
                        <div>{{ item.name }} ({{ item.value }})</div>
                        <div class="flex-1 text-right">
                            <Button variant="ghost" class="h-6 font-normal text-[#666]">view all</Button>
                        </div>
                    </div>
                    <div class="pl-4 mt-2">
                        <Progress class="h-4" :model-value="item.value" />
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


const categories = [
    {
        name: "Project Articles",
        value: 9
    },{
        name: "Study Articles",
        value: 79
    },{
        name: "Blog Articles",
        value: 12
    },{
        name: "Pictures",
        value: 30
    }
]
</script>