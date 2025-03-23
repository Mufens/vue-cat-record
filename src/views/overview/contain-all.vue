<script setup lang="ts">
import { use } from 'echarts/core'
import type { EChartsOption } from 'echarts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { createLineOptions, createPieOptions, createBarOptions } from '@/components/options'
import { ref, onMounted, watch, computed } from 'vue'
import { fetchCardData } from '@/api/count'
import { fetchLineData, fetchBreedPieData, fetchAgeBarData } from '@/api/echarts'
import { useThemesStore } from '@/stores/modules/themes'
import type { CardData } from '@/types/count'
import type { LineData, PieData, BarData } from '@/types/echarts'
import { nextTick } from 'vue'

// 初始化ECharts组件
use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
  UniversalTransition
])

const themesStore = useThemesStore()
const cards = ref<CardData[]>([])
const lineData = ref<LineData>()
const breedData = ref<PieData[]>()
const ageData = ref<BarData>()

// 图表选项使用computed实现响应式
const dashOpt1 = computed<EChartsOption | undefined>(() => {
  return lineData.value ? createLineOptions(lineData.value) : undefined
})

const dashOpt2 = computed<EChartsOption | undefined>(() => {
  return breedData.value ? createPieOptions(breedData.value, true) : undefined
})

const dashOpt4 = computed<EChartsOption | undefined>(() => {
  return ageData.value ? createBarOptions(ageData.value) : undefined
})

// 加载卡片数据
const loadData = async () => {
  try {
    const { data } = await fetchCardData()
    if (data.success) {
      cards.value = data.data
    }
  } catch (err) {
    console.error('数据加载失败', err)
  }
}

// 加载图表数据
const loadChartsData = async () => {
  try {
    const [lineRes, breedRes, ageRes] = await Promise.all([
      fetchLineData(),
      fetchBreedPieData(),
      fetchAgeBarData()
    ])

    lineData.value = lineRes.data.data
    breedData.value = breedRes.data.data
    ageData.value = ageRes.data.data
  } catch (err) {
    console.error('图表数据加载失败', err)
  }
}

// 主题变化时强制更新图表
watch(
  () => themesStore.currentTheme,
  async () => {
    // 清空数据触发图表卸载
    lineData.value = undefined
    breedData.value = undefined
    ageData.value = undefined
    // 等待DOM更新后重新加载
    await nextTick()
    await loadChartsData()
  },
  {
    deep: true
  }
)

onMounted(async () => {
  await loadData()
  await loadChartsData()
})
</script>

<template>
  <el-row :gutter="20" class="mgb20">
    <el-col v-for="card in cards" :key="card.name" :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div class="count">{{ card.count }}</div>
          <div class="name">{{ card.name }}</div>
        </div>
        <div class="icon" :class="card.iconClass">
          <i class="iconfont" :class="card.icon"></i>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="mgb20">
    <el-col :span="15">
      <el-card shadow="hover">
        <v-chart class="chart1" :option="dashOpt1" autoresize />
      </el-card>
      <el-card shadow="hover">
        <v-chart class="chart1" :option="dashOpt4" autoresize />
      </el-card>
    </el-col>
    <el-col :span="9">
      <el-card shadow="hover">
        <v-chart class="chart2" :option="dashOpt2" autoresize />
      </el-card>
    </el-col>
  </el-row>
</template>

<style>
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 10px;
}
</style>

<style scoped lang="scss">
.el-card {
  margin: 10px 8px;
  .icon {
    height: 60px;
    width: 60px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 25px;
      color: #fff !important;
    }

    &.first {
      background: radial-gradient(at top left, #67b3da, #98d0e6);
      .iconfont {
        font-size: 35px;
      }
    }
    &.second {
      background: radial-gradient(at top left, #ea9381, #f0b09f);
    }
    &.third {
      background: radial-gradient(at top left, #fea0b1, #f7bac3);
      .iconfont {
        font-size: 35px;
      }
    }
    &.fourth {
      background: radial-gradient(at top left, #96ccbe, #96c9a3);
    }
  }
  .card-content {
    text-align: center;
    font-size: 16px;
    .count {
      font-size: 25px;
    }
  }
}
.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.card-header-desc {
  font-size: 14px;
  color: #999;
}

.chart1 {
  width: 100%;
  height: 400px;
}
.chart2 {
  width: 100%;
  height: 400px;
}
</style>
