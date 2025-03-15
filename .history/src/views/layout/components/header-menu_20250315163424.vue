<script setup lang="ts">
import { onMounted } from 'vue'
// 侧边栏折叠
const collapseChage = () => {
  .handleCollapse()
}
onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage()
  }
})
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
