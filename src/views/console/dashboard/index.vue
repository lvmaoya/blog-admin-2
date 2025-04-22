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
            Articles
          </CardTitle>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.2 1H4.17741H4.1774C3.86936 0.999988 3.60368 0.999978 3.38609 1.02067C3.15576 1.04257 2.92825 1.09113 2.71625 1.22104C2.51442 1.34472 2.34473 1.51442 2.22104 1.71625C2.09113 1.92825 2.04257 2.15576 2.02067 2.38609C1.99998 2.60367 1.99999 2.86935 2 3.17738V3.1774V3.2V11.8V11.8226V11.8226C1.99999 12.1307 1.99998 12.3963 2.02067 12.6139C2.04257 12.8442 2.09113 13.0717 2.22104 13.2837C2.34473 13.4856 2.51442 13.6553 2.71625 13.779C2.92825 13.9089 3.15576 13.9574 3.38609 13.9793C3.60368 14 3.86937 14 4.17741 14H4.2H10.8H10.8226C11.1306 14 11.3963 14 11.6139 13.9793C11.8442 13.9574 12.0717 13.9089 12.2837 13.779C12.4856 13.6553 12.6553 13.4856 12.779 13.2837C12.9089 13.0717 12.9574 12.8442 12.9793 12.6139C13 12.3963 13 12.1306 13 11.8226V11.8V3.2V3.17741C13 2.86936 13 2.60368 12.9793 2.38609C12.9574 2.15576 12.9089 1.92825 12.779 1.71625C12.6553 1.51442 12.4856 1.34472 12.2837 1.22104C12.0717 1.09113 11.8442 1.04257 11.6139 1.02067C11.3963 0.999978 11.1306 0.999988 10.8226 1H10.8H4.2ZM3.23875 2.07368C3.26722 2.05623 3.32362 2.03112 3.48075 2.01618C3.64532 2.00053 3.86298 2 4.2 2H10.8C11.137 2 11.3547 2.00053 11.5193 2.01618C11.6764 2.03112 11.7328 2.05623 11.7613 2.07368C11.8285 2.11491 11.8851 2.17147 11.9263 2.23875C11.9438 2.26722 11.9689 2.32362 11.9838 2.48075C11.9995 2.64532 12 2.86298 12 3.2V11.8C12 12.137 11.9995 12.3547 11.9838 12.5193C11.9689 12.6764 11.9438 12.7328 11.9263 12.7613C11.8851 12.8285 11.8285 12.8851 11.7613 12.9263C11.7328 12.9438 11.6764 12.9689 11.5193 12.9838C11.3547 12.9995 11.137 13 10.8 13H4.2C3.86298 13 3.64532 12.9995 3.48075 12.9838C3.32362 12.9689 3.26722 12.9438 3.23875 12.9263C3.17147 12.8851 3.11491 12.8285 3.07368 12.7613C3.05624 12.7328 3.03112 12.6764 3.01618 12.5193C3.00053 12.3547 3 12.137 3 11.8V3.2C3 2.86298 3.00053 2.64532 3.01618 2.48075C3.03112 2.32362 3.05624 2.26722 3.07368 2.23875C3.11491 2.17147 3.17147 2.11491 3.23875 2.07368ZM5 10C4.72386 10 4.5 10.2239 4.5 10.5C4.5 10.7761 4.72386 11 5 11H8C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10H5ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM5 4C4.72386 4 4.5 4.22386 4.5 4.5C4.5 4.77614 4.72386 5 5 5H10C10.2761 5 10.5 4.77614 10.5 4.5C10.5 4.22386 10.2761 4 10 4H5Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalBlogCount }}
          </div>
          <p class="text-xs text-muted-foreground">
            +{{ articleStatisticsData?.lastMonthBlogCount }} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Views
          </CardTitle>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalPageView }}
          </div>
          <p class="text-xs text-muted-foreground">
            +{{ articleStatisticsData?.lastMonthPageView }} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Notes
          </CardTitle>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ articleStatisticsData?.totalCharCount }}
          </div>
          <p class="text-xs text-muted-foreground">
            +{{ articleStatisticsData?.lastMonthCharCount }} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Active Now
          </CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-4 w-4 text-muted-foreground">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
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
            <CardTitle>Recent Updated</CardTitle>
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
