<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { ref, watch } from 'vue'
import { DataType } from '..';

const data = ref<Array<{month: String,articleCount: number,pageView: number,charCount: number,preferNum: number}>>([])
const props = defineProps<{
  data: DataType
}>()
watch(
  () => props.data,
  (newData) => {
    
    if (newData && newData?.timeRange) {
      data.value = newData.timeRange.map((month, index) => ({
        month,
        articleCount: newData.articleCount[index],
        pageView: newData.pageView[index],
        charCount: newData.charCount[index],
        preferNum: newData.preferNum[index]
      }));
      console.log(data.value);
    }

  },
  { immediate: true }
)
</script>

<template>
  <LineChart class="h-full" :data="data" index="month" :categories="['articleCount', 'pageView', 'preferNum']"
    :show-legend="false" :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"  />
</template>