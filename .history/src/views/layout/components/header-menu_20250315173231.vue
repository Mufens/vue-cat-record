<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { ref } from 'vue'
const emit = defineEmits(['toggle-collapse'])
const isCollapsed = ref(false)
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
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
