<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'
import { ref } from 'vue'
const isCollapsed = ref(false)
</script>
<template>
  <div class="layout-container">
    <AsideMenu :is-collapsed="isCollapsed"></AsideMenu>
    <div
      class="container"
      :style="{
        marginLeft: isCollapsed ? '0px' : '200px',
        width: isCollapsed ? 'calc(100% - 0px)' : 'calc(100% - 200px)'
      }"
    >
      <HeaderMenu @toggle-collapse="state => (isCollapsed = state)"> </HeaderMenu>
      <div class="main">Main</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}
</style>
