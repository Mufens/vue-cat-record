import { defineStore } from 'pinia'
import { themes } from '@/components/theme/themes'
import type { ThemeConfig } from '@/types/themes'
import { ref } from 'vue'

export const useThemesStore = defineStore('themes', () => {
  // 状态
  const currentTheme = ref<ThemeConfig['className']>(
    (localStorage.getItem('defaultTheme') as ThemeConfig['className']) || 'default',
  )

  // 方法
  const applyTheme = (theme: ThemeConfig['className']) => {
    if (!themes.some((t) => t.className === theme)) return

    // 清理旧主题类
    const root = document.documentElement
    themes.forEach((t) => root.classList.remove(t.className))

    // 应用新主题
    root.classList.add(theme)
    currentTheme.value = theme
    localStorage.setItem('defaultTheme', theme)
  }

  // 初始化主题
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('defaultTheme')
    if (savedTheme && themes.some((t) => t.className === savedTheme)) {
      applyTheme(savedTheme as ThemeConfig['className'])
    } else {
      applyTheme('default')
    }
  }

  return {
    currentTheme,
    applyTheme,
    initializeTheme,
  }
})
