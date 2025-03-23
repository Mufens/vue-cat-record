<script setup lang="ts">
import { useThemesStore } from '@/stores/modules/themes'
import { themes } from './themes'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const themesStore = useThemesStore()
const containerRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// 初始化主题
onMounted(() => {
  themesStore.initializeTheme()
})

// 面板显隐控制
const togglePanel = () => (visible.value = !visible.value)

// 点击外部关闭
const clickHandler = (e: MouseEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) {
    visible.value = false
  }
}

// 事件监听管理
onMounted(() => document.addEventListener('click', clickHandler))
onBeforeUnmount(() => document.removeEventListener('click', clickHandler))
</script>

<template>
  <div class="theme-container" ref="containerRef">
    <div class="theme-switch" @click="togglePanel">
      <i class="iconfont icon-zhuti_tiaosepan_o"></i>
    </div>
    <div
      class="theme-panel"
      v-show="visible"
      :style="{
        background: themesStore.currentTheme === 'dark' ? '#1a1a1a' : '#fff',
        '--trangle-color': themesStore.currentTheme === 'dark' ? '#1a1a1a' : '#fff'
      }"
    >
      <!-- 三角 -->
      <div class="trangle"></div>
      <!-- 主题颜色列表 -->
      <div
        v-for="theme in themes"
        :key="theme.name"
        class="theme-item"
        :class="{ active: themesStore.currentTheme === theme.className }"
        @click.stop="themesStore.applyTheme(theme.className)"
      >
        <div class="theme-content">
          <div class="border">
            <div class="color-block" :style="{ backgroundColor: theme.color }"></div>
          </div>
          <div class="theme-label">{{ theme.label }}</div>
        </div>
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
  padding: 0 15px;
  i {
    font-size: 20px;
    color: var(--text-color-primary);
  }
}

.theme-panel {
  position: absolute;
  width: 180px;
  height: 120px;
  top: 50px;
  right: -9px;
  background: #fff;
  border: 0.1px solid var(--border-color, #fff);

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  z-index: 10;
  transition: opacity 0.05s;
  .trangle::after {
    position: absolute;
    width: 0px;
    height: 0px;
    top: -20px;
    right: 27px;
    content: '';
    border-right: 10px solid transparent;
    border-top: 10px solid var(--trangle-color);
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
    transform: rotate(180deg);
  }

  filter: drop-shadow(2px 0 2px rgba(0, 0, 0, 0.05)) drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.05));
  .theme-item {
    flex: 1;
    width: 50px;
    padding-top: 5px;
    cursor: pointer;
    .theme-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .color-block {
        width: 46px;
        height: 17px;
        margin: 5px;
        border-radius: 4px;
        border: 2px solid transparent;
        transition: border-color 0.2s;
      }

      .theme-label {
        margin: 5px;
        font-size: 12px;
        color: var(--color-primary);
        text-align: center;
      }
    }
  }
}
.theme-item {
  &:hover {
    .color-block {
      border-color: var(--text-color-primary) !important
;
    }
  }
  &.active {
    .color-block {
      border-color: var(--text-color-primary) !important;
    }
  }
}
</style>
