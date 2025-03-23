<script lang="ts" setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册 ECharts 核心模块
use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

// 响应式配置项
const option = ref({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true }]
})
</script>

<template>
  <v-chart :option="option" autoresize class="chart" />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 400px; /* 关键：确保容器有明确高度 */
}
</style>
