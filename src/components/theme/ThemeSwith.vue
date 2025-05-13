<script setup lang="ts">
import { useThemesStore } from '@/stores/modules/themes'
import { themes } from './themes'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const themesStore = useThemesStore()
const containerRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const visibleThemes = computed(() => themes.filter(t => t.className !== 'dark'))

onMounted(() => {
  themesStore.initializeTheme()
})

const togglePanel = () => (visible.value = !visible.value)

const clickHandler = (e: MouseEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) {
    visible.value = false
  }
}

onMounted(() => document.addEventListener('click', clickHandler))
onBeforeUnmount(() => document.removeEventListener('click', clickHandler))
</script>

<template>
  <div class="theme-container" ref="containerRef">
    <div class="switch-group">
      <!-- 暗黑模式切换按钮 -->
      <div class="darkchange" @click="themesStore.toggleDarkMode()">
        <i v-if="!themesStore.isDarkMode" class="iconfont icon-taiyang"></i>
        <i v-else class="iconfont icon-icon-heiyemoshi"></i>
      </div>

      <!-- 浅色主题切换按钮 -->
      <template v-if="themesStore.isDarkMode">
        <el-tooltip effect="dark" content="浅色主题使用请切换为白天模式 ᖰ⌯'▾'⌯ᖳ" placement="bottom">
          <div class="theme-switch disabled">
            <i class="iconfont icon-zhuti_tiaosepan_o"></i>
          </div>
        </el-tooltip>
      </template>
      <template v-else>
        <div class="theme-switch" @click="togglePanel">
          <i class="iconfont icon-zhuti_tiaosepan_o"></i>
        </div>
      </template>
    </div>
    <!-- 主题面板 -->
    <div
      class="theme-panel"
      v-show="visible"
      :style="{
        background: themesStore.isDarkMode ? '#232324' : '#fff',
        '--trangle-color': themesStore.isDarkMode ? '#232324' : '#fff'
      }"
    >
      <div class="trangle"></div>
      <div
        v-for="theme in visibleThemes"
        :key="theme.name"
        class="theme-item"
        :class="{ active: themesStore.currentTheme === theme.className }"
        @click.stop="themesStore.applyTheme(theme.className)"
      >
        <div class="theme-content">
          <div class="block">
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
.switch-group {
  display: flex;
  align-items: center;
  .darkchange {
    .iconfont {
      font-size: 18px;
      color: var(--text-color-primary) !important;
    }
  }
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
  top: 50px;
  right: -9px;
  background: #fff;
  border: 1px solid #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  z-index: 10;
  .trangle {
    position: absolute;
    width: 0px;
    height: 0px;
    top: -28px;
    right: 47px;
    &::after {
      content: '';
      border: 10px solid transparent;
      border-bottom-color: var(--trangle-color);
      transform: rotate(90deg);
    }
  }

  filter: drop-shadow(2px 0 2px rgba(0, 0, 0, 0.05)) drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.05));
  .theme-item {
    width: auto;
    padding-top: 5px;
    cursor: pointer;
    .theme-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .block {
        width: 46px;
        height: 24px;
        border-radius: 8px;
        border: 1.5px solid #e5e6eb;
        display: flex;
        justify-content: center;
        align-items: center;
        .color-block {
          width: 16px;
          height: 16px;
          border-radius: 5px;
        }
      }

      .theme-label {
        margin: 5px;
        font-size: 12px;
        color: var(--text-color-primary);
        text-align: center;
      }
    }
  }
}
.theme-item {
  &:hover {
    .block {
      border-color: var(--bg-color) !important;
    }
  }
  &.active {
    .block {
      border-color: var(--bg-color) !important;
    }
  }
}
</style>
