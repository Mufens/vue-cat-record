<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'
import TabContainer from '@/components/TabContainer.vue'
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
        width: isCollapsed ? '100%' : 'calc(100% - 200px)'
      }"
    >
      <HeaderMenu @toggle-collapse="state => (isCollapsed = state)"> </HeaderMenu>
      <div class="main">
        <TabContainer></TabContainer>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  display: flex;
  height: 100vh;

  .container {
    flex: 1;
  }
}
</style>
