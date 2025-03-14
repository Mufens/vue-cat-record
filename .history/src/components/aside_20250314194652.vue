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
  <el-menu
    active-text-color="#EDC0A9"
    background-color="#D67E65"
    :default-active="onRoutes"
    text-color="#819D60"
    router
  >
    <template v-for="item in menuData">
      <template v-if="item.children">
        <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-sub-menu
              v-if="subItem.children"
              :index="subItem.index"
              :key="subItem.index"
              v-permiss="item.id"
            >
              <template #title>{{ subItem.title }}</template>
              <el-menu-item
                v-for="(threeItem, i) in subItem.children"
                :key="i"
                :index="threeItem.index"
              >
                {{ threeItem.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :index="subItem.index"
              :key="'else-' + subItem.index"
              v-permiss="item.id"
            >
              {{ subItem.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index" v-permiss="item.id">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
