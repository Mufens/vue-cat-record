<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuData } from '@/components/menu'

const route = useRoute()
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
  <div class="aside" :style="{ width: isCollapsed ? '64px' : '200px' }">
    <div
      class="aside_logo"
      :style="{ backgroundSize: isCollapsed ? '60px auto' : '200px auto' }"
    ></div>
    <el-menu
      class="aside-menu"
      :collapse="isCollapsed"
      active-text-color="#D68262"
      background-color="#FCF2F0"
      :default-active="onRoutes"
      text-color="#819D60"
      router
    >
      <template v-for="item in menuData">
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
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: 0;
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
</style>
