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
  <div class="aside" :style="{ width: isCollapsed ? '0px' : '200px' }">
    <div class="aside_logo"></div>
    <el-menu
      class="aside-menu"
      :collapse="isCollapsed"
      :collapse-transition="false"
      :default-active="onRoutes"
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
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 200px;
  height: 100vh;
  overflow-x: hidden;
  //background-color: #fcf2f0;
  background-color: var(--bg-color);
  transition: all 0.05s ease;

  &_logo {
    height: 150px;
    background: url('@/assets/images/logo.png') no-repeat center / 200px auto;

    .aside-menu {
      border-right: none;
      width: 100%;
      transition: all 0.1s ease;
    }
  }
}

.iconfont {
  margin-right: 5px;
}
.el-menu {
  border-right: none;
}
</style>
