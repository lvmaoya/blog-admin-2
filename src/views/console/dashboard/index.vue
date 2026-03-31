<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { articleStatsData, articleListData, blogStatisticsData, onlineUserCount } from "@/service/article";

import Overview from './components/Overview.vue'
import RecentUpdate from './components/RecentUpdate.vue'
import LineChart from './components/LineChart.vue'
import Category from './components/Category.vue'
import SignIn from './components/SignIn.vue'
import Release from "./components/Release.vue";
import ArticleStatIcon from './components/icons/ArticleStatIcon.vue'
import ViewStatIcon from './components/icons/ViewStatIcon.vue'
import WordStatIcon from './components/icons/WordStatIcon.vue'
import ActiveStatIcon from './components/icons/ActiveStatIcon.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { Article, BlogStatistics } from '.';
let timer;  // 添加定时器变量

let chartData = ref<{ timeRange: Array<string>, articleCount: Array<number>, pageView: Array<number>, charCount: Array<number>, preferNum: Array<number> }>()
let recentUpdate = ref<Array<Article>>()
const articleStatisticsData = ref<BlogStatistics>()
const onlineUserData = ref<BlogStatistics>()
const getData = async () => {
  chartData.value = await articleStatsData(dayjs().subtract(1, 'year').format('YYYY-MM-DD'), dayjs().format("YYYY-MM-DD"))
}
const getRecentUpdata = async () => {
  recentUpdate.value = (await articleListData({ page: 1, size: 10 })).records
}
const getStatisticsNumber = async () => {
  articleStatisticsData.value = await blogStatisticsData()
}
const getOnlineNumber = async () => {
  onlineUserData.value = await onlineUserCount()
}
onMounted(() => {
  getData()
  getRecentUpdata()
  getStatisticsNumber()
  getOnlineNumber()
  // 添加定时器，每10秒刷新一次在线用户数
  timer = setInterval(() => {
    getOnlineNumber()
  }, 10000)
})
// 添加组件卸载时的清理函数
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="flex-1 p-4 overflow-hidden max-lg:overflow-y-scroll flex flex-col space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 text-muted-foreground">
          <CardTitle class="text-sm font-medium">
            文章
          </CardTitle>
          <ArticleStatIcon />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalBlogCount }}
          </div>
          <p class="text-xs text-muted-foreground">
            较上月 +{{ articleStatisticsData?.lastMonthBlogCount }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            浏览
          </CardTitle>
          <ViewStatIcon />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalPageView }}
          </div>
          <p class="text-xs text-muted-foreground">
            较上月 +{{ articleStatisticsData?.lastMonthPageView }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            字数
          </CardTitle>
          <WordStatIcon />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalCharCount }}
          </div>
          <p class="text-xs text-muted-foreground">
            较上月 +{{ articleStatisticsData?.lastMonthCharCount }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            活跃
          </CardTitle>
          <ActiveStatIcon />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ onlineUserData }}
          </div>
          <!-- <p class="text-xs text-muted-foreground">
            +201 since last hour
          </p> -->
        </CardContent>
      </Card>
    </div>
    <div class="flex-1 overflow-hidden max-lg:overflow-visible">
      <div style="height: calc(50% - 0.5rem);"
        class="max-lg:!h-[800px] grid gap-4 max-lg:gap-x-0 max-lg:grid-cols-2 lg:grid-cols-7 overflow-hidden">
        <Card class="col-span-4 flex flex-col h-full overflow-hidden">
          <CardHeader>
            <CardTitle>文章数量增长量、阅读量、访客数量</CardTitle>
          </CardHeader>
          <CardContent class="pl-2 flex-1 overflow-hidden">
            <LineChart :data="chartData" />
          </CardContent>
        </Card>
        <Card class="col-span-3 h-full overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle>最近更新</CardTitle>
          </CardHeader>
          <CardContent class="flex-1 overflow-y-scroll">
            <RecentUpdate :data="recentUpdate" />
          </CardContent>
        </Card>
      </div>
      <div style="height: calc(50% - 0.5rem);"
        class="max-lg:!h-[800px] grid gap-4 max-lg:gap-x-0 max-lg:grid-cols-2 lg:grid-cols-7 mt-4 overflow-hidden">
        <Card class="col-span-3 flex flex-col h-full overflow-hidden">
          <CardHeader>
            <CardTitle>产出字数、代码量</CardTitle>
          </CardHeader>
          <CardContent class="pl-2 flex-1 overflow-hidden">
            <Overview :data="chartData" />
          </CardContent>
        </Card>
        <Category :articleStatisticsData="articleStatisticsData"></Category>
        <Release></Release>
      </div>
    </div>
  </div>
</template>
