<script setup lang="ts">
import CountUp from 'vue-countup-v3'
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
import { fetchRankData } from '@/api/rank'
import type { RankItem } from '@/types/rank'

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
const themeWatcher = computed(() => themesStore.currentTheme + themesStore.isDarkMode)

// 主题变化时强制更新图表
watch(
  () => themeWatcher.value,
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

const ranks = ref<RankItem[]>([])
const loadRankData = async () => {
  try {
    const { data } = await fetchRankData()
    if (Array.isArray(data)) {
      ranks.value = data
      console.log('排行榜数据:', ranks.value)
    } else if (data.success) {
      ranks.value = data.data
      console.log('排行榜数据:', ranks.value)
    }
  } catch (err) {
    console.error('排行榜数据加载失败', err)
  }
}

onMounted(async () => {
  await loadData()
  await loadChartsData()
  await loadRankData()
})

//时间线数据
const activities = ref([
  { content: '第五次大抓捕13号圆满成功ᕑᗢᓫ', timestamp: '2025-04-12 ', color: '#00bcd4' },
  { content: '恭喜我队成功拿到猫德学院赞助⌯>ᴗo⌯ಣ', timestamp: '2025-02-15 ', color: '#1231d4' },
  { content: '经过多日训练多只猫咪已具猫德/•᷅•᷄\୭', timestamp: '2025-01-1 ', color: '#ff7aaE' },
  { content: '第三次大抓捕13号出师不利被放走𖦹𖦹 .ᐟ.ᐟ', timestamp: '2024-12-12 ', color: '#07bcd4' },
  { content: '今日开启猫咪领养平台=• ֊ •=', timestamp: '2024-11-15 ', color: '#bab267' },
  { content: '严厉加强绝育工作', timestamp: '2024-11-10 ', color: '#e58333' }
])
</script>

<template>
  <el-row :gutter="20" class="card">
    <el-col v-for="card in cards" :key="card.name" :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div class="name">{{ card.name }}</div>
          <div class="num">
            <count-up
              class="count"
              :startVal="0"
              :endVal="card.count"
              :duration="2"
              :options="{
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.'
              }"
            />

            <span
              class="change"
              :style="{ color: card.change.startsWith('+') ? '#67C23A' : '#F56C6C' }"
            >
              {{ card.change }}
            </span>
          </div>
        </div>
        <div class="icon" :class="card.iconClass">
          <i class="iconfont" :class="card.icon"></i>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="chart">
    <el-col :span="14">
      <el-card shadow="never">
        <div class="card-header">
          <p class="card-header-title">猫咪动态</p>
          <p class="card-header-desc">最近一年猫咪数量变化</p>
        </div>
        <v-chart class="chart1" :option="dashOpt1" :key="themeWatcher" autoresize />
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card shadow="never">
        <div class="card-header">
          <p class="card-header-title">猫咪年龄分布</p>
          <p class="card-header-desc">猫咪年龄统计截止日期为2024.12.31</p>
        </div>
        <v-chart class="chart1" :option="dashOpt4" :key="themeWatcher" autoresize />
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="chart">
    <el-col :span="8">
      <el-card shadow="never">
        <v-chart class="chart1" :option="dashOpt2" autoresize />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never" :body-style="{ height: '400px' }">
        <div class="card-header">
          <p class="card-header-title">排行榜</p>
          <p class="card-header-desc">猫咪所花费的大米Top5</p>
        </div>
        <div>
          <div class="rank">
            <div
              class="rank-item"
              v-for="(rank, index) in [...ranks].sort((a, b) => b.value - a.value).slice(0, 5)"
              :key="rank.title + index"
            >
              <div class="rank-item-avatar" :style="{ backgroundColor: rank.color }">
                {{ index + 1 }}
              </div>
              <div class="rank-item-content">
                <div class="rank-item-top">
                  <div class="rank-item-title">{{ rank.title }}</div>
                  <div class="rank-item-desc">花销：¥{{ rank.value.toLocaleString() }}</div>
                </div>
                <el-progress
                  :show-text="false"
                  striped
                  :stroke-width="8"
                  :percentage="rank.percent"
                  :color="rank.color"
                />
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{ height: '400px' }">
        <div class="card-header">
          <p class="card-header-title">时间线</p>
          <p class="card-header-desc">最新猫咪大事件消息</p>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.color"
            :timestamp="activity.timestamp"
          >
            <div class="timeline-item">
              {{ activity.content }}
            </div>
          </el-timeline-item>
        </el-timeline>
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
  margin: 8px 6px;
}
.card {
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
}
.card-content {
  font-size: 16px;
  .name {
    padding-bottom: 5px;
  }
  .num {
    display: flex;
    .count {
      font-size: 25px;
    }
    .change {
      padding-left: 7px;
      padding-top: 12px;
      font-size: 12px;
    }
  }
}
.card-header {
  padding-left: 5px;
  margin-bottom: 5px;
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
.rank {
  .rank-item {
    display: flex;
    margin: 8px 0;
    padding: 10px 0;

    &-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      text-align: center;
      line-height: 38px;
      color: white;
      font-weight: bold;
      margin-right: 12px;
    }
    &-content {
      flex: 1;
      .rank-item-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    }
  }
}
.el-timeline {
  margin-top: 15px;
}
</style>
