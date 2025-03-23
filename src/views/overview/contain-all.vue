<script setup lang="ts">
import { use } from 'echarts/core'

import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'

import { LineChart, PieChart, BarChart } from 'echarts/charts'

import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
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

import { createLineOptions, createPieOptions, createBarOptions } from '@/components/options'

// 折线图配置（猫咪动态）
const dashOpt1 = createLineOptions({
  xData: ['一月', '二月', '三月', '四月', '五月', '六月'],
  seriesData: [120, 200, 150, 80, 70, 110],
  xAxisType: 'category'
})

// 种类分布环形图配置
const dashOpt2 = createPieOptions(
  [
    { value: 22, name: '奶牛猫' },
    { value: 55, name: '狸花猫' },
    { value: 99, name: '橘猫' },
    { value: 27, name: '玳瑁猫' },
    { value: 50, name: '三花猫' },
    { value: 11, name: '白猫' },
    { value: 5, name: '金色传说' },
    { value: 17, name: '黑猫' }
  ],
  true // 启用环形模式
)

// 颜色分布环形图配置
const dashOpt3 = createPieOptions(
  [
    { value: 135, name: '白色' },
    { value: 110, name: '黑色' },
    { value: 175, name: '橘色' },
    { value: 115, name: '三花' }
  ],
  true // 启用环形模式
)
const dashOpt4 = createBarOptions({
  xData: ['幼猫 (<1岁)', '青年猫 (1-2岁)', '状年猫 (3-6岁)', '中年猫(7-10岁)', '老年猫 (>11岁)'],
  seriesData: [20, 70, 90, 55, 18],
  color: '#fea0b1'
})
</script>
<template>
  <el-row :gutter="20" class="mgb20">
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div>用户访问量</div>
          <div class="count">999</div>
        </div>
        <div class="icon first">
          <i class="iconfont icon-fangwenliang"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div>系统消息</div>
          <div class="count">999</div>
        </div>
        <div class="icon second">
          <i class="iconfont icon-xitongxiaoxi"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div>猫咪数量</div>
          <div class="count">999</div>
        </div>
        <div class="icon third">
          <i class="iconfont icon-xiaomao"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <div class="card-content">
          <div>救助数量</div>
          <div class="count">999</div>
        </div>
        <div class="icon fourth">
          <i class="iconfont icon-jiuzhuicon"></i>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="mgb20">
    <el-col :span="15">
      <el-card shadow="hover">
        <div class="card-header">
          <p class="card-header-title">猫咪动态</p>
          <p class="card-header-desc">最近半年猫咪数量变化</p>
        </div>
        <v-chart class="chart1" :option="dashOpt1" />
      </el-card>
      <el-card shadow="hover">
        <div class="card-header">
          <p class="card-header-title">猫咪年龄分布</p>
          <p class="card-header-desc">2025年3月统计</p>
        </div>
        <v-chart class="chart1" :option="dashOpt4" />
      </el-card>
    </el-col>
    <el-col :span="9">
      <el-card shadow="hover">
        <div class="card-header">
          <p class="card-header-title">猫咪品种</p>
        </div>
        <v-chart class="chart2" :option="dashOpt2" />
      </el-card>
      <el-card shadow="hover">
        <div class="card-header"><p class="card-header-title">猫咪颜色</p></div>
        <v-chart class="chart2" :option="dashOpt3" />
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
  height: 300px;
}
</style>
