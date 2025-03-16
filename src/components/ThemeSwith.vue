<script setup lang="ts">
import { themes } from '@/components/themes'
import type { ThemeConfig } from '@/types/themes'
import { ref } from 'vue'

const isThemeMenuVisible = ref(false)
const currentTheme = ref<ThemeConfig['className']>('default')
let panelTimeout: number | null = null

const applyTheme = (themeClass: ThemeConfig['className']) => {
  const root = document.documentElement
  themes.forEach(t => root.classList.remove(t.className))
  root.classList.add(themeClass)
  currentTheme.value = themeClass
  isThemeMenuVisible.value = false
}

const handleMouseEnter = () => {
  if (panelTimeout) {
    clearTimeout(panelTimeout)
    panelTimeout = null
  }
  isThemeMenuVisible.value = true
}

const handleMouseLeave = () => {
  panelTimeout = setTimeout(() => {
    isThemeMenuVisible.value = false
  }, 100)
}
</script>

<template>
  <div class="theme-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="theme-switch">
      <i class="iconfont icon-zhuti_tiaosepan_o"></i>
    </div>

    <div
      class="theme-panel"
      v-show="isThemeMenuVisible"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-for="theme in themes"
        :key="theme.name"
        class="theme-item"
        :class="{ 'active-theme': currentTheme === theme.className }"
        @click.stop="applyTheme(theme.className)"
      >
        <div class="color-block" :style="{ backgroundColor: theme.color }"></div>
        <div class="theme-label">{{ theme.label }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-container {
  position: relative;
  display: inline-block;
}

.theme-switch {
  cursor: pointer;
  padding: 0 15px;
  i {
    font-size: 20px;
    color: var(--text-color-primary);
  }
}

.theme-panel {
  position: absolute;
  top: 35px;
  right: 20px;
  background: var(--bg-color);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 16px;
  z-index: 999;
  transition: opacity 0.2s;

  &[v-show='false'] {
    opacity: 0;
    pointer-events: none;
  }
}

.theme-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: var(--menu-hover-bg);
  }

  &.active-theme {
    border: 2px solid var(--color-primary);
  }

  .color-block {
    width: 40px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .theme-label {
    font-size: 12px;
    color: var(--text-color-primary);
  }
}
</style>
