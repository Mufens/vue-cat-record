<script setup lang="ts">
import { Fold, Expand, ArrowRight } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { menuData } from '@/components/menu'
import { useRoute } from 'vue-router'
import { generateBreadcrumbs } from '@/utils/breadcrumb'

//折叠状态
const emit = defineEmits(['toggle-collapse'])
const isCollapsed = ref(false)
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
}

// 根据当前路由生成面包屑数组
const route = useRoute()
const breadcrumbs = computed(() => {
  return generateBreadcrumbs(route.path, menuData).map(crumb => {
    return typeof crumb === 'string' ? { title: crumb, path: '', icon: undefined } : crumb
  })
})
</script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon color="#819d60" size="15px">
          <component :is="isCollapsed ? Expand : Fold" />
        </el-icon>
      </div>
      <div class="bread-container">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
            <i v-if="crumb.icon" :class="['iconfont', crumb.icon]"></i>
            <span>{{ crumb.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">bababoyi</div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--bg-color);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .header-left {
    display: flex;
    text-align: center;
    align-items: center;
    .collapse-btn {
      margin-left: 20px;
      cursor: pointer;
    }
    .bread-container {
      margin-left: 20px;
    }
  }
  :deep(.el-breadcrumb__inner) {
    color: var(--el-text-color-primary) !important;
    i.iconfont {
      color: inherit; // 继承父级颜色
    }
  }

  // 修复折叠图标颜色
  :deep(.el-icon) {
    color: var(--el-text-color-primary) !important;
  }
}
:deep(.el-breadcrumb__inner) {
  color: var(--el-text-color-primary) !important;
  i.iconfont {
    color: inherit;
  }
}
:deep(.el-icon) {
  color: var(--el-text-color-primary) !important;
}
</style>
