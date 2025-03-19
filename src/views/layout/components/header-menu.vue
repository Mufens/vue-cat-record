<script setup lang="ts">
import {
  Fold,
  Expand,
  ArrowRight,
  User,
  Crop,
  EditPen,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'

import { ref, computed } from 'vue'
import { menuData } from '@/components/menu'
import { useRoute } from 'vue-router'
import { generateBreadcrumbs } from '@/utils/breadcrumb'
import ThemeSwith from '@/components/ThemeSwith.vue'

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

const isFullscreen = ref(false)
function toggleFullscreen () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  isFullscreen.value = !isFullscreen.value
}
</script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon color="#819d60" size="18px">
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
    <div class="header-right">
      <ThemeSwith></ThemeSwith>
      <div class="btn-icon" @click="toggleFullscreen">
        <i class="iconfont icon-quanping" v-if="!isFullscreen"> </i>
        <i class="iconfont icon-tuichuquanping" v-else></i>
      </div>
      <div class="message">
        <i class="iconfont icon-xiaoxi1"></i>
      </div>
      <div class="user">
        <el-dropdown placement="bottom-end">
          <!-- 展示给用户，默认看到的 -->
          <div class="el-dropdown__box">
            <el-avatar></el-avatar>
            <div class="arrow">
              <el-icon><CaretBottom /></el-icon>
            </div>
          </div>

          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
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
      margin-left: 18px;
      margin-top: 3px;
      cursor: pointer;
    }
    .bread-container {
      margin-left: 18px;
    }
  }
  .header-right {
    display: flex;
    margin-right: 5px;
    text-align: center;
    align-items: center;
    .btn.icon {
      margin: 0 15px;
      .i {
        font-size: 25px;
      }
    }
    .message {
      margin: 0 15px;
      i {
        font-size: 19px;
      }
    }
    .user {
      margin: 0 20px;
      .el-dropdown__box {
        display: flex;
        .arrow {
          margin: 15px 5px;
        }
      }
    }
  }
}
</style>
