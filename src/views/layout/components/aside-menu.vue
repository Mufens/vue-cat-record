<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuData } from '@/components/menu'
import { useUserStore } from '@/stores/modules/user'

const route = useRoute()
const userStore = useUserStore()
const filteredMenu = computed(() => {
  return menuData.filter(item => {
    if (item.permiss && !userStore.permissions.includes(item.permiss)) return false
    if (item.children) {
      item.children = item.children.filter(
        sub => !sub.permiss || userStore.permissions.includes(sub.permiss)
      )
    }
    return true
  })
})

const onRoutes = computed(() => {
  return route.path
})

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="aside" :style="{ width: isCollapsed ? '0px' : '200px' }">
    <div class="aside_logo"></div>
    <el-menu
      class="aside-menu"
      :collapse="isCollapsed"
      :collapse-transition="false"
      :default-active="onRoutes"
      router
    >
      <template v-for="item in filteredMenu">
        <template v-if="item.children">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="['iconfont', item.icon]"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu v-if="subItem.children" :index="subItem.index" :key="subItem.index">
                <template #title>
                  <span>{{ subItem.title }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.children"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="'else-' + subItem.index">
                <i :class="['iconfont', subItem.icon]"></i>
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="['iconfont', item.icon]"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
.aside {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 200px;
  height: 100vh;
  border-right: 1px solid var(--border-color);
  overflow-x: hidden;
  //background-color: #fcf2f0;
  background-color: var(--aside-bg-color);

  &_logo {
    height: 150px;
    background: url('@/assets/images/logo.png') no-repeat center / 200px auto;

    .aside-menu {
      border-right: none;
      width: 100%;
    }
  }
}

.iconfont {
  margin-right: 5px;
}
.el-menu {
  border-right: none;
}
.el-menu-item {
  height: 46px;
}
</style>
