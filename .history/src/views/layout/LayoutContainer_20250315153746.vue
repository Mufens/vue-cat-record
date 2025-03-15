<script setup lang="ts">
import { ref } from 'vue'
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'

const isCollapsed = ref(false)
const asideWidth = ref('200px')

const toggleAside = () => {
  isCollapsed.value = !isCollapsed.value
  asideWidth.value = isCollapsed.value ? '64px' : '200px'
}
</script>
<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px">
        <div class="el-aside__logo"></div>
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
    background-color: #fcf2f0;
    .el-aside__logo {
      height: 150px;
      background: url('@/assets/images/logo.png') no-repeat center / 200px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
}
// 折叠状态样式
 .collapsed { .el-aside__logo { background-size: 40px auto !important; } .el-main {
margin-left: 64px; }
</style>
