<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
</script>
<template>
  <div class="layout-container">
    <aside></aside>
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
    background-color: #f0f0f0;
    .el-aside__logo {
      height: 60px;
      background: url('@/assets/images/logo.png') no-repeat center;
    }
  }
}
</style>
