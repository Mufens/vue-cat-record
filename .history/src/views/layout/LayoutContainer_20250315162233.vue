<script setup lang="ts">
import { ref } from 'vue'
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'

const isCollapsed = ref(false)
const asideWidth = ref('200px')

const toggleAside = () => {
  isCollapsed.value = !isCollapsed.value
  asideWidth.value = isCollapsed.value ? '0' : '200px'
}
</script>
<template>
  <div class="layout-container">
    <el-container>
      <el-aside :width="asideWidth">
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderMenu :is-collapsed="isCollapsed" @toggle-collapse="toggleAside"> </HeaderMenu>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    height: 100vh;
    width: 200px;
    display: flex;
    flex-direction: column;
    background-color: #fcf2f0;
    overflow: hidden;
    transition: width 0.3s;

    .el-menu {
      border-right: none;
    }
  }
}
// 折叠时main区域左边距为0
.collapsed {
  .el-main {
    margin-left: 0 !important;
  }
}
</style>
