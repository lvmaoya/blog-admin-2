<template>
  <div ref="chart" class="line-chart"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  option: {
    type: Object,
    required: true
  }
});

const chart = ref(null);

const initChart = () => {
  const chartInstance = echarts.init(chart.value);
  chartInstance.setOption(props.option);
};

onMounted(() => {
  initChart();
});

watch(() => props.option, () => {
  initChart();
}, { deep: true });
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>