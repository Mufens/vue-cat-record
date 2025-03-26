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
      <div
        class="fixed-header"
        :style="{
          width: isCollapsed ? '100%' : 'calc(100% - 200px)',
          left: isCollapsed ? '0' : '200px'
        }"
      >
        <HeaderMenu @toggle-collapse="state => (isCollapsed = state)"> </HeaderMenu>

        <TabContainer></TabContainer>
      </div>
      <div class="main">
        <router-view> </router-view>
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
    .fixed-header {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: var(--bg-color);
      height: 105px;
    }
    .main {
      height: calc(100vh - 105px);
      margin-top: 105px;
      overflow-x: hidden;
    }
  }
}
</style>
