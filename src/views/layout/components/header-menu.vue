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
        <el-icon color="#819d60">
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
