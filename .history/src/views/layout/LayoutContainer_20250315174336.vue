<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'
import { ref } from 'vue'
const isCollapsed = ref(false)
</script>
<template>
  <div class="layout-container">
    <el-container>
      <el-aside>
        <AsideMenu :is-collapsed="isCollapsed"></AsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderMenu @toggle-collapse="state => (isCollapsed = state)"> </HeaderMenu>
        </el-header>
        <el-main :style="{ marginLeft: isCollapsed ? '0px' : '200px' }">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  min-width: 0 !important;
  .el-aside {
    height: 100vh;
    background-color: #fcf2f0;
    overflow: hidden;
    transition: width 0.3s;
    .el-menu {
      border-right: none;
    }
  }
}
.el-main {
  transition: margin-left 0.3s; /* 添加过渡动画 */
}
</style>
