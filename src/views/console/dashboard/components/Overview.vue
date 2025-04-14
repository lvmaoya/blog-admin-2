<template>
  <BarChart class="h-full" index="month" :data="data" :categories="['charCount']" :rounded-corners="4"
    :show-legend="false" type="stacked" />
</template>

<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar';
import { DataType } from '..';
import { ref, watch } from 'vue';

const data = ref<Array<{ month: String, charCount: number }>>([])
const props = defineProps<{
  data: DataType
}>()
watch(
  () => props.data,
  (newData) => {
    if (newData && newData?.timeRange) {
      data.value = newData.timeRange.map((month, index) => ({
        month,
        charCount: newData.charCount[index],
      }));
    }
  },
  { immediate: true }
)
</script>