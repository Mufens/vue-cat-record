<script setup lang="ts">
import { ArrowDown, DocumentRemove, DocumentDelete, CloseBold } from '@element-plus/icons-vue'

import { ref, watch, onMounted, nextTick } from 'vue'
import { useTabsStore } from '@/stores/modules/tabs'

import { useRoute, useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const activePath = ref(route.fullPath)

onMounted(() => {
  const savedState = localStorage.getItem('cachedTabs')
  if (savedState) {
    try {
      const { tabs } = JSON.parse(savedState)
      // 严格类型校验
      const validTabs = tabs.filter(
        (t: { path: string; title: string; icon: string }) =>
          typeof t.path === 'string' &&
          typeof t.title === 'string' &&
          typeof t.icon === 'string' &&
          router.resolve(t.path).matched.length > 0
      )
      const currentTab = {
        name: route.name?.toString() || route.path,
        path: route.path, // 改用 path
        title: (route.meta.title as string) || '未命名',
        icon: (route.meta.icon as string) || 'el-icon-document'
      }

      const mergedTabs = [...validTabs]
      const exists = mergedTabs.some(t => t.path === currentTab.path)
      if (!exists) {
        mergedTabs.push(currentTab)
      }
      tabsStore.tabs = mergedTabs
      activePath.value = route.path
    } catch (error) {
      console.error('解析缓存标签失败:', error)
      localStorage.removeItem('cachedTabs')
    }
  } else {
    if (!tabsStore.tabs.some(t => t.path === route.path)) {
      tabsStore.addTab(route)
    }
    activePath.value = route.path
  }
})

watch(
  () => route.path,
  newPath => {
    activePath.value = newPath
    const exists = tabsStore.tabs.some(t => t.path === newPath)
    if (!exists) {
      tabsStore.addTab(route)
    }
    //立即保存状态
    localStorage.setItem(
      'cachedTabs',
      JSON.stringify({ tabs: tabsStore.tabs, activePath: newPath })
    )
  },
  { immediate: true, flush: 'sync' }
)

// 标签页点击处理
const handleTabClick = (tabName: string) => {
  const targetTab = tabsStore.tabs.find(t => t.path === tabName)
  if (targetTab && targetTab.path !== route.path) {
    activePath.value = targetTab.path
    router
      .push(targetTab.path)
      .then(() => {
        activePath.value = targetTab.path
      })
      .catch(() => {})
  }
}

// 关闭标签页处理
const handleTabClose = async (path: string) => {
  if (tabsStore.tabs.length <= 1) return
  const nextTab = tabsStore.findNextTab(path)
  tabsStore.removeTab(path)
  await nextTick()
  if (path === route.fullPath) {
    if (nextTab?.path) {
      router.push(nextTab.path)
    } else {
    }
  }
}

// 下拉菜单命令处理
const handleMenuCommand = (command: 'current' | 'all' | 'other') => {
  switch (command) {
    case 'current':
      handleTabClose(route.path)
      break
    case 'all':
      if (tabsStore.tabs.length === 0) return
      tabsStore.clearAllTabs()
      break
    case 'other':
      tabsStore.keepSpecificTabs([route.path])
      break
  }
}
tabsStore.$subscribe(() => {
  localStorage.setItem(
    'cachedTabs',
    JSON.stringify({ tabs: tabsStore.tabs, activePath: route.path })
  )
})
</script>

<template>
  <div class="tab-container">
    <el-tabs
      v-model="activePath"
      type="card"
      :closable="tabsStore.tabs.length > 1"
      @tab-click="(tab: TabsPaneContext) => handleTabClick(tab.paneName as string)"
      @tab-remove="handleTabClose"
    >
      <el-tab-pane v-for="tab in tabsStore.tabs" :key="tab.path" :name="tab.path">
        <template #label>
          <i :class="['iconfont', tab.icon]"></i>
          {{ tab.title }}
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="tab-actions">
      <el-dropdown @command="handleMenuCommand">
        <el-icon><ArrowDown /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other" :disabled="tabsStore.tabs.length <= 1"
              ><el-icon><DocumentRemove /></el-icon> 关闭其他标签页</el-dropdown-item
            >
            <el-dropdown-item command="current" :disabled="tabsStore.tabs.length <= 1"
              ><el-icon><CloseBold /></el-icon> 关闭当前标签页</el-dropdown-item
            >
            <el-dropdown-item command="all" :disabled="tabsStore.tabs.length === 0"
              ><el-icon><DocumentDelete /></el-icon> 关闭所有标签页</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-container {
  display: flex;
  align-items: center;
  height: 45px;
  overflow: hidden;
  background-color: #ffffff;

  html.dark & {
    background-color: #1a1a1a !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    /* 调整标签页分割线颜色 */
    .el-tabs :deep(.el-tabs__item)::after {
      background-color: rgba(255, 255, 255, 0.1);
    }
    /* 调整操作按钮边框颜色 */
    .tab-actions {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }

  .el-tabs {
    flex: 1;
    margin: 20px 0 0 4px;
    :deep(.el-tabs__header) {
      border: none;
      .el-tabs__nav {
        border: none;
      }
    }
    :deep(.el-tabs__item) {
      border: none !important;
      border-radius: 4px;
      padding: 0 16px !important;
      margin-right: 2px;
      position: relative;
      transition: all 0.3s;
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: -3px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        width: 1px;
        background-color: #ddd;
      }

      &.is-active {
        &::after,
        .el-tabs__item::before {
          display: none;
        }
      }
      &:hover {
        &::after,
        .el-tabs__item::before {
          display: none;
        }
      }

      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
  .tab-actions {
    margin-top: 5px;
    margin-right: 10px;
    padding: 12px;
    border-left: 2px solid rgba(245, 245, 245);
    border-right: 2px solid rgba(245, 245, 245);
  }
}
</style>
