import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  name: string
  path: string
  title: string
  icon: string
}

export const useTabsStore = defineStore('tabs', () => {
  // 状态定义
  const tabList = ref<TabItem[]>([])

  // 计算属性
  const nameList = computed(() => tabList.value.map((t) => t.name))
  const hasTabs = computed(() => tabList.value.length > 0)
  const tabPaths = computed(() => tabList.value.map((t) => t.path))
  const tabCount = computed(() => tabList.value.length)

  // 操作方法
  const addTab = (route: RouteLocationNormalized) => {
    const targetPath = route.path
    if (route.meta.hidden) return
    if (!targetPath || typeof targetPath !== 'string') return

    const exists = tabList.value.some((t) => t.path === targetPath)
    if (!exists) {
      const newTab = {
        name: route.name?.toString() || targetPath,
        path: targetPath,
        title: route.meta.title as string,
        icon: (route.meta.icon as string) || 'el-icon-document',
      }
      tabList.value = [...tabList.value, newTab]
    }
  }
  const removeTab = (path: string) => {
    tabList.value = tabList.value.filter((t) => t.path !== path)
  }

  const clearAllTabs = () => {
    tabList.value = []
  }

  const keepSpecificTabs = (paths: string[]) => {
    tabList.value = tabList.value.filter((t) => paths.includes(t.path))
  }

  const findNextTab = (currentPath: string) => {
    const index = tabList.value.findIndex((t) => t.path === currentPath)
    if (index === -1) return null

    return tabList.value[index + 1] || tabList.value[index - 1] || null
  }

  // 暴露接口
  return {
    tabs: tabList,
    nameList,
    hasTabs,
    tabPaths,
    tabCount,
    addTab,
    removeTab,
    clearAllTabs,
    keepSpecificTabs,
    findNextTab,
  }
})
