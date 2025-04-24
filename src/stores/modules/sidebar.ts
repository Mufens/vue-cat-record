import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  // 响应式状态
  const isCollapsed = ref(false)

  // 操作方法
  const setCollapsed = (state: boolean) => {
    isCollapsed.value = state
  }

  return {
    isCollapsed,
    setCollapsed,
  }
})
