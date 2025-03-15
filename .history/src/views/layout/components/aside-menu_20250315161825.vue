<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuData } from '@/components/menu'

const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})
</script>
<template>
  <div calss="aside">
    <div class="aside_logo"></div>
    <el-menu
      class="aside-menu"
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
<style scoped>
.aside {
  width: 200px;
  height: 100%;
  overflow-x: hidden;
  &_logo {
    height: 150px;
    background: url('@/assets/images/logo.png') no-repeat center / 200px auto;

    .aside-menu {
      border-right: none;
      width: 200px;
    }
  }
}
.iconfont {
  margin-right: 5px;
}
</style>
