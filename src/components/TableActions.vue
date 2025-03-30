<!-- TableActions.vue -->
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { RefreshRight, Setting } from '@element-plus/icons-vue'
import type { PropType } from 'vue'

interface ColumnItem {
  label: string
  prop: string
  visible: boolean
}

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnItem[]>,
    required: true
  },
  showColumnsType: {
    type: String as PropType<'transfer' | 'checkbox'>,
    default: 'checkbox'
  }
})

const emit = defineEmits(['refresh', 'update:columns'])

// 刷新处理
const handleRefresh = () => {
  emit('refresh')
}

// 复选框状态变化
const handleCheckboxChange = (event: boolean, label: string) => {
  const newColumns = props.columns.map(item => {
    if (item.label === label) {
      return { ...item, visible: event }
    }
    return item
  })
  emit('update:columns', newColumns)
}

// 显隐列弹窗控制
const showColumnDropdown = ref(false)
</script>

<template>
  <div class="column-right">
    <!-- 刷新按钮 -->
    <el-tooltip effect="dark" content="刷新" placement="top">
      <el-icon size="large" class="action-icon" @click="handleRefresh">
        <RefreshRight />
      </el-icon>
    </el-tooltip>

    <!-- 列设置 -->
    <el-tooltip effect="dark" content="列设置" placement="top">
      <el-dropdown v-model="showColumnDropdown" trigger="click" :hide-on-click="false">
        <el-icon size="large" class="action-icon">
          <Setting />
        </el-icon>

        <template #dropdown>
          <el-dropdown-menu v-if="showColumnsType === 'checkbox'">
            <el-dropdown-item v-for="item in columns" :key="item.prop">
              <el-checkbox
                :checked="item.visible"
                @change="handleCheckboxChange($event, item.label)"
              >
                {{ item.label }}
              </el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.el-dropdown-menu {
  height: 190px;
  :deep(.el-dropdown-menu__item) {
    color: var(--el-dropdown-menuItem-text-color) !important;
    &:hover {
      background-color: transparent !important;
      color: var(--menu-active-text-color) !important ;
    }
  }
}

.el-checkbox {
  height: 15px;
}
</style>
