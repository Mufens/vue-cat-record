<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { ref } from 'vue'
cosnt isCollapsed = ref(false)
const toggleCollapse = () => { isCollapsed.value = !isCollapsed.value
}
</script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon :size="20">
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </div>
    </div>
  </div>
</template>
