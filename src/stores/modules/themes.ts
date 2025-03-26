import { defineStore } from 'pinia'
import { themes } from '@/components/theme/themes'
import type { ThemeConfig } from '@/types/themes'
import { ref } from 'vue'

export const useThemesStore = defineStore('themes', () => {
  const currentTheme = ref<ThemeConfig['className']>('default')
  const isDarkMode = ref(false)

  const applyTheme = (theme: ThemeConfig['className']) => {
    const root = document.documentElement

    // 清理所有旧主题类（包含dark）
    themes.forEach((t) => {
      root.classList.remove(t.className)
    })

    currentTheme.value = theme
    localStorage.setItem('theme', theme)

    // 根据暗黑模式状态应用主题
    const actualTheme = isDarkMode.value ? 'dark' : theme
    root.classList.add(actualTheme)
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value.toString())
    applyTheme(currentTheme.value) // 重新应用当前主题
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'default'
    const darkMode = localStorage.getItem('darkMode') === 'true'

    isDarkMode.value = darkMode
    currentTheme.value = savedTheme

    // 通过applyTheme应用以保证清理旧主题
    applyTheme(savedTheme)
  }
  return { currentTheme, isDarkMode, applyTheme, toggleDarkMode, initializeTheme }
})
