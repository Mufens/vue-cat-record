<script setup lang="ts">
import DatePunch from '@/components/calendar/date-punch.vue'
</script>
<template>
  <div class="cat-record">
    <el-row>
      <el-col :span="17">
        <el-space direction="vertical">
          <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }}
            </div>
          </el-card>
        </el-space>

        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
      </el-col>
      <el-col :span="7" class="todoList"><DatePunch /> </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">
.cat-record {
  margin: 10px;

  .todoList {
    border-left: 1px solid var(--border-line-color);
  }
}
</style>
