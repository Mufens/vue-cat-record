<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const today = new Date()
const currentDay = new Date().getDate()
const todayDay = today.getDate()
const todayMonth = today.getMonth()
const todayYear = today.getFullYear()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const dateTitle = ref(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
// 动态生成日历日期
const calendarDays = computed(() => {
  const days = []
  // 获取当月信息
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startWeekday = firstDay.getDay()
  // 0-6（周日-周六）
  // 添加上个月补全日期
  const prevMonthDays = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = startWeekday - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrent: false })
  }

  //添加当月日期
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const isToday =
      day === todayDay && currentMonth.value === todayMonth && currentYear.value === todayYear
    days.push({ day, isCurrent: true, isToday })
  }

  // 添加下个月补全日期
  const totalCells = Math.ceil(days.length / 7) * 7
  for (let i = 1; days.length < totalCells; i++) {
    days.push({ day: i, isCurrent: false })
  }

  return days
})
const seasonBg = computed(() => {
  const month = currentMonth.value + 1
  if (month >= 3 && month <= 5) return 'spring.jpg'
  if (month >= 6 && month <= 8) return 'summer.jpg'
  if (month >= 9 && month <= 11) return 'autumn.jpg'
  return 'winter.jpg'
})
// 月份切换逻辑
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<template>
  <div class="calendar">
    <el-card shadow="never">
      <div class="calendar-title" :style="{ backgroundImage: `url(@/assets/images/${seasonBg})` }">
        <el-icon @click="prevMonth" class="nav-button"><ArrowLeft /></el-icon>

        <div class="day">{{ currentDay }}</div>
        <div class="ym">
          <div class="year">{{ currentYear }}/</div>
          <div class="month">{{ months[currentMonth - 1] }}</div>
        </div>
        <el-icon @click="nextMonth" class="nav-button"><ArrowRight /></el-icon>
      </div>

      <div class="calendar-content">
        <div class="row title">
          <span v-for="item in dateTitle" :key="item">{{ item }}</span>
        </div>
        <div class="row content">
          <span
            v-for="(dayObj, index) in calendarDays"
            :key="index"
            :class="{ 'not-current': !dayObj.isCurrent }"
          >
            {{ dayObj.day }}
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.calendar {
  &-title {
    height: 150px;
    color: var(--text-color-primary);
    display: flex;
    justify-content: space-between;
    .day {
      font-weight: bold;
      font-size: 60px;
    }
    .ym {
      display: flex;
      align-items: flex-end;
      .year {
        font-size: 12px;
      }
      .month {
        font-weight: bold;
        font-size: 30px;
      }
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    &.title {
      font-weight: bold;
      color: var(--text-color-primary);
      span {
        width: calc(100% / 7);
        text-align: center;
      }
    }
    &.content {
      flex-wrap: wrap;
      span {
        width: calc(100% / 7);
        text-align: center;
        padding: 4px 0;
        &.not-current {
          color: #aeb1b7;
        }
      }
    }
  }
}
</style>
