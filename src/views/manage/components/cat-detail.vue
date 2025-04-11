<script setup lang="ts">
import { formatDate } from '@/utils/format'
import type { CatItem } from '@/types/cat'
import { computed } from 'vue'
import cat from '@/assets/images/cat.jpg'

const props = defineProps<{ catData: CatItem; visible: boolean }>()

const emit = defineEmits(['update:visible'])
const localVisible = computed({ get: () => props.visible, set: val => emit('update:visible', val) })

const healthTagType = (status: string) => {
  return status === '健康' ? 'success' : status === '生病' ? 'warning' : 'info'
}

const getStarColor = (index: number, friendliness: number): string => {
  return index <= friendliness ? 'var(--rate-color)' : '#C0C0C0'
}
</script>

<template>
  <el-dialog v-model="localVisible" title="猫咪详情" width="60%">
    <el-descriptions border>
      <el-descriptions-item label="活动区域">{{ catData.area }}</el-descriptions-item>

      <el-descriptions-item label="亲和度等级">
        <div class="rate">
          <span v-for="i in 5" :key="i" :style="{ color: getStarColor(i, catData.friendliness) }">
            {{ i <= catData.friendliness ? '★' : '☆' }}
          </span>
        </div>
      </el-descriptions-item>

      <el-descriptions-item label="健康状况">
        <el-tag :type="healthTagType(catData.healthStatus)">
          {{ catData.healthStatus }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item :rowspan="2" label="照片">
        <el-image style="width: 200px; height: 200px" :src="catData.catImg || cat" fit="cover" />
      </el-descriptions-item>
      <el-descriptions-item label="姓名">{{ catData.name }}</el-descriptions-item>

      <el-descriptions-item label="品种">{{ catData.breed }}</el-descriptions-item>

      <el-descriptions-item label="年龄">{{ catData.age }}</el-descriptions-item>

      <el-descriptions-item label="领养状态">
        <el-tag :type="catData.adoptionStatus === '已领养' ? 'success' : 'info'">
          {{ catData.adoptionStatus }}
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item label="编号">{{ catData.id }}</el-descriptions-item>

      <el-descriptions-item label="性别">{{ catData.gender }}</el-descriptions-item>
      <el-descriptions-item label="登记时间">{{
        formatDate(catData.createTime)
      }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<style scoped>
.rate {
  display: flex;
  gap: 2px;
}
</style>
