<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const today = new Date()
const currentDay = today.getDate()
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
const bgPositionX = computed(() => {
  const month = currentMonth.value
  if (month >= 2 && month <= 4) {
    return '0%'
  } else if (month >= 5 && month <= 7) {
    return '33.333%'
  } else if (month >= 8 && month <= 10) {
    return '66.6%'
  } else {
    return '100%'
  }
})
const seasonClass = computed(() => {
  const month = currentMonth.value
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
})
</script>

<template>
  <div class="calendar">
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <div class="calendar-title">
        <div class="day" :class="seasonClass">{{ currentDay }}</div>
        <div class="ym">
          <div class="year" :class="seasonClass">{{ currentYear }}/</div>
          <div class="month" :class="seasonClass">{{ months[currentMonth] }}</div>
        </div>
        <div class="change">
          <div @click="prevMonth" class="change prev">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <div @click="nextMonth" class="change next">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
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
    position: relative;
    z-index: 1;
    cursor: pointer;
    height: 150px;
    overflow: hidden;
    background: url(@/assets/images/season.png) no-repeat;
    background-size: 400% 100%;
    background-position-y: center;
    background-position-x: v-bind(bgPositionX);
    transition: background-position-x 0.3s ease;
    transform: 0.3s;
    //文字有背景颜色
    //color: transparent;
    //background-clip: text;
    display: flex;
    justify-content: space-between;
    .day,
    .year,
    .month {
      &.spring {
        background: -webkit-linear-gradient(45deg, #2d98419b 30%, #84c74ac2 60%, #47c09e65 90%);
        -webkit-background-clip: text;
        background-clip: text;
      }
      &.summer {
        background: -webkit-radial-gradient(#99755963 20%, #4abbc7f7 50%, #48cd8ac3 80%);
        -webkit-background-clip: text;
        background-clip: text;
      }
      &.autumn {
        background-color: #897042bb;
        -webkit-background-clip: text;
        background-clip: text;
      }

      &.winter {
        background: linear-gradient(to bottom, #a4d7fe, #bfc8dc, #a5c8d5);
        -webkit-background-clip: text;
        background-clip: text;
      }
      color: transparent;
    }

    .day {
      margin-left: 20px;
      margin-top: 10px;
      font-weight: bold;
      font-size: 70px;
    }
    .ym {
      display: flex;
      margin-bottom: 10px;

      align-items: flex-end;
      .year {
        font-weight: bold;
        font-size: 14px;
      }
      .month {
        font-weight: bold;
        font-size: 28px;
      }
    }

    .change {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: transparent;
      color: #fff;
      opacity: 0;
      .prev,
      .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
      .prev {
        left: 10px;
      }
      .next {
        right: 10px;
      }
    }
    &:hover .change {
      opacity: 1;
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
      font-size: 14px;
      text-align: center;
    }
  }
  &.content {
    flex-wrap: wrap;
    span {
      font-family: 'YaHei';
      width: calc(100% / 7);
      text-align: center;
      padding: 4px 0;
      &.not-current {
        color: #aeb1b7;
      }
    }
  }
}
</style>
