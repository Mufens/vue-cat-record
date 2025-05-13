import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

const getCssVarValue = (varName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

const getPrimaryColor = () => getCssVarValue('--color-primary')
const getTextColor = () => {
  const color = getCssVarValue('--message-panel-text')
  return color
}

// 使用时可灵活扩展
export const createLineOptions = (config: {
  xData: string[]
  seriesData: number[]
  xAxisType?: 'category' | 'value' | 'time' | 'log' // 添加可选的xAxis类型配置
}): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: (config.xAxisType as 'category') || 'category', // 使用传入类型或默认category
    data: config.xData,
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      data: config.seriesData,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: getPrimaryColor() + '60',
          },
          {
            offset: 1,
            color: getPrimaryColor() + '00',
          },
        ]),
      },
      symbol: 'circle',
      symbolSize: 5,
      itemStyle: { color: getPrimaryColor() },
      lineStyle: { color: getPrimaryColor(), width: 2 },
    },
  ],
})

export const createBarOptions = (config: {
  xData: string[]
  seriesData: number[]
  color?: string
}): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: config.xData,
    axisLabel: {
      rotate: 45, // 标签旋转45度防重叠
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: config.seriesData,
      itemStyle: {
        color: config.color || getPrimaryColor(),
        borderRadius: [4, 4, 0, 0], // 顶部圆角
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    },
  ],
})

export const createPieOptions = (
  data: Array<{ value: number; name: string }>,
  isRing: boolean = false,
): EChartsOption => ({
  title: {
    text: '猫咪种类分布',
    left: 'center',
    textStyle: {
      color: getTextColor(),
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  color: ['#F7E8AA', '#70887D', '#EBB471', '#9a8878', '#F1908C', '#61649F', '#F6C555', '#7B90D2'],
  series: [
    {
      type: 'pie',
      radius: isRing ? ['40%', '70%'] : '50%', // 环形图配置
      avoidLabelOverlap: true,
      label: {
        show: true,
        formatter: '{b|{b}:} {d}%',
        rich: {
          b: { fontWeight: 'bold' },
        },
      },
      itemStyle: {
        borderRadius: 1, // 圆角效果
      },
      data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
