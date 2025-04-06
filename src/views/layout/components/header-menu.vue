<script setup lang="ts">
import { Fold, Expand, ArrowRight, CaretBottom, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { menuData } from '@/components/menu'
import { useRoute } from 'vue-router'
import { generateBreadcrumbs } from '@/utils/breadcrumb'
import ThemeSwith from '@/components/theme/ThemeSwith.vue'
import GetMessage from './GetMessage.vue'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import avatar from '@/assets/images/avatar1.jpg'
const userStore = useUserStore()
const router = useRouter()
onMounted(async () => {
  try {
    if (userStore.user?.id) {
      userStore.getUser()
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

const handleCommand = async (key: string) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('确认退出吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.user = null
    router.push('/login')
  } else {
    router.push('/user')
  }
}

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
function toggleFullscreen() {
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
      <GetMessage></GetMessage>
      <div class="user">
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 展示给用户，默认看到的 -->
          <div class="el-dropdown__box">
            <el-avatar :src="userStore.user?.avatar || avatar"></el-avatar>
            <div class="name">{{ userStore.user?.name }}</div>
            <div class="arrow">
              <el-icon><CaretBottom /></el-icon>
            </div>
          </div>

          <!-- 折叠的下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu active-text-color="#fff">
              <el-dropdown-item command="profile">
                <i class="iconfont icon-personalcenter"></i>
                个人中心</el-dropdown-item
              >
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
  border-bottom: 1px solid var(--border-color, #f5f6f6);
  align-items: center;
  height: 60px;
  background-color: var(--header-bg-color);
  border-left: 1px solid var(--border-color);
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
    text-align: center;
    align-items: center;
    .user {
      margin: 20px;
      .el-dropdown__box {
        display: flex;
        .el-avatar {
          margin-top: 8px;
        }
        .name {
          padding: 22px 5px;
        }

        .arrow {
          margin: 17px 0px;

          .el-icon {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--el-dropdown-menuItem-hover-fill) !important;
  color: var(--el-dropdown-menuItem-hover-color) !important;
}
</style>
