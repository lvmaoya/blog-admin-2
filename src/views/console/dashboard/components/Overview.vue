<template>
  <BarChart
    index="month"
    :data="articleData"
    :categories="['articleType1', 'articleType2', 'articleType3']"
    :rounded-corners="4"
    :show-legend="false"
    type="stacked"
  />
</template>

<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import type { Spacing } from '@unovis/ts';
// 生成 12 个月的数据
const articleData = [];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

for (const month of months) {
  const item = {
    month,
    // 随机生成每种文章类型的数量
    articleType1: Math.floor(Math.random() * 200) + 50,
    articleType2: Math.floor(Math.random() * 200) + 50,
    articleType3: Math.floor(Math.random() * 200) + 50,
  };
  articleData.push(item);
}
</script>