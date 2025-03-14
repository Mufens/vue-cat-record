<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
</script>
<template>
  <div class="common-layout">
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
