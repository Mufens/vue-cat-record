<script setup lang="ts">
import AsideMenu from './components/aside-menu.vue'
import HeaderMenu from './components/header-menu.vue'
import TabContainer from '@/components/TabContainer.vue'
import { useTabsStore } from '@/stores'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const isCollapsed = ref(false)
const isMobileMenuActive = ref(false)
const isMobile = ref(false)
const showMask = ref(false)
const tabs = useTabsStore()
const checkCollapse = () => {
  isMobile.value = window.innerWidth < 800
  if (isMobile.value) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
  showMask.value = false
  isMobileMenuActive.value = false
}
const closeMenu = () => {
  if (isMobile.value && !isCollapsed.value) {
    isCollapsed.value = true
    showMask.value = false
  }
}
const handleClickOutside = (event: MouseEvent) => {
  const asideMenu = document.querySelector('.aside') as HTMLElement
  const mask = document.querySelector('.mask') as HTMLElement
  if (
    asideMenu &&
    !asideMenu.contains(event.target as Node) &&
    mask &&
    mask.contains(event.target as Node)
  ) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', checkCollapse)
  checkCollapse()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkCollapse)
})
const handleCollapseToggle = () => {
  if (isMobile.value) {
    isCollapsed.value = !isCollapsed.value
  } else {
    isCollapsed.value = !isCollapsed.value
  }
}
watch(isMobile, newVal => {
  if (newVal) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
})

watch(isCollapsed, newVal => {
  if (isMobile.value) {
    showMask.value = !newVal
    isMobileMenuActive.value = !newVal
    if (!newVal) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
  }
})
</script>
<template>
  <div class="layout-container">
    <AsideMenu :is-collapsed="isCollapsed"></AsideMenu>
    <div
      v-show="showMask"
      class="mask"
      :class="{ 'mask-visible': showMask }"
      @click="closeMenu"
    ></div>

    <div
      class="container"
      :style="{
        marginLeft: isMobile ? '0' : isCollapsed ? '0px' : '180px',
        width: isMobile ? '100%' : isCollapsed ? '100%' : 'calc(100% - 180px)'
      }"
    >
      <div
        class="fixed-header"
        :style="{
          width: isMobile ? '100%' : isCollapsed ? '100%' : 'calc(100% - 180px)',
          left: isMobile ? '0' : isCollapsed ? '0' : '180px'
        }"
      >
        <HeaderMenu :is-collapsed="isCollapsed" @toggle-collapse="handleCollapseToggle">
        </HeaderMenu>

        <TabContainer></TabContainer>
      </div>
      <div class="main">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tabs.nameList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  display: flex;
  height: 100vh;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    &.mask-visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

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
      overflow-x: auto;
    }
  }
}
</style>
