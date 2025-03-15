<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
defineProps<{ isCollapsed: boolean }>()
const emit = defineEmits(['toggle-collapse'])
</script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="collapse-btn" @click="emit('toggle-collapse')">
        <el-icon :size="20">
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </div>
    </div>
  </div>
</template>
