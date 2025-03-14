<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
</script>
<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px">
        <div class="el-aside__logo"></div>
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
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
</style>
