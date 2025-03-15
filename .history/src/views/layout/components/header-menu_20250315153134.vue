<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'

defineProps<{
  isCollapsed: boolean
}>()

const emit = defineEmits(['toggle-collapse'])
</script>

<template>
  <div class="header-container">
    <el-button link @click="emit('toggle-collapse')" class="collapse-btn">
      <el-icon :size="20">
        <component :is="isCollapsed ? Expand : Fold" />
      </el-icon>
    </el-button>

    <!-- 其他头部内容 -->
    <div class="header-right">
      <!-- 用户信息等其他组件 -->
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.collapse-btn {
  transition: all 0.3s;
  padding: 8px;
  border-radius: 50%;

  &:hover {
    background-color: var(--el-color-primary-light-9);
    transform: rotate(180deg);
  }

  &:active {
    transform: scale(0.9) rotate(180deg);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
