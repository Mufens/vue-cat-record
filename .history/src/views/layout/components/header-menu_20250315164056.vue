<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue' defineProps<{ isCollapsed: boolean }>() const
emit = defineEmits(['toggle-collapse'])
</script>
<template>
  <div calss="header">
    <div class="header-left">
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="is.collapse">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
        </el-icon>
      </div>
    </div>
  </div>
</template>
