<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { Menus } from '@/types/menu'
import TableActions from '@/components/table/TableActions.vue'
import { menuData } from '@/components/menu'
const tableData = ref<Menus[]>([])
const dialogVisible = ref(false)
const formRef = ref()
const isEdit = ref(false)
const form = ref<Menus>({
  id: '',
  title: '',
  index: '',
  icon: '',
  permiss: '',
  pid: undefined
})
const columns = ref([
  { label: '菜单ID', prop: 'id', width: '120', visible: true },
  { label: '菜单名称', prop: 'title', visible: true, align: 'center' },
  { label: '图标', prop: 'icon', width: '80', visible: true, align: 'center' },
  { label: '路由地址', prop: 'index', visible: true },
  { label: '权限标识', prop: 'permiss', visible: true },
  {
    label: '操作',
    prop: 'actions',
    visible: true,
    width: '200',
    headerAlign: 'center',
    align: 'center'
  }
])

const rules = {
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  index: [
    {
      required: true,
      message: '请输入路由地址',
      trigger: 'blur'
    }
  ]
}
const cascaderProps = { value: 'id', label: 'title', checkStrictly: true, emitPath: false }
const cascaderMenuOptions = computed(() => {
  type MenuNode = { id: string; title: string; children: MenuNode[] | null }
  const formatMenu = (menus: Menus[]): MenuNode[] => {
    return menus.map(menu => ({
      id: menu.id,
      title: menu.title,
      children: menu.children ? formatMenu(menu.children) : null
    }))
  }
  return formatMenu(tableData.value)
})

const initTableData = () => {
  tableData.value = menuData.map(item => ({ ...item, children: item.children || [] }))
}

const findMenuById = (menus: Menus[], id: string): Menus | undefined => {
  for (const menu of menus) {
    if (menu.id === id) return menu
    if (menu.children) {
      const found = findMenuById(menu.children, id)
      if (found) return found
    }
  }
}

const updateMenuInTree = (menus: Menus[], updatedMenu: Menus): boolean => {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].id === updatedMenu.id) {
      menus.splice(i, 1, updatedMenu)
      return true
    }
    if (menus[i].children) {
      const found = updateMenuInTree(menus[i].children!, updatedMenu)
      if (found) return true
    }
  }
  return false
}
const openAddDialog = () => {
  isEdit.value = false
  form.value = { id: '', title: '', index: '', icon: '', permiss: '', pid: undefined }
  dialogVisible.value = true
}
const openEditDialog = (row: Menus) => {
  isEdit.value = true
  form.value = { ...row, pid: row.pid }
  dialogVisible.value = true
}

const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (isEdit.value) {
        const original = findMenuById(tableData.value, form.value.id)
        if (!original) return
        const oldPid = original.pid
        const newPid = form.value.pid
        if (oldPid !== newPid) {
          if (oldPid) {
            const oldParent = findMenuById(tableData.value, oldPid)
            oldParent?.children?.splice(
              oldParent.children!.findIndex(c => c.id === form.value.id),
              1
            )
          } else {
            tableData.value.splice(
              tableData.value.findIndex(m => m.id === form.value.id),
              1
            )
          } // 添加到新父节点
          if (newPid) {
            const newParent = findMenuById(tableData.value, newPid)
            newParent?.children?.push(form.value)
          } else {
            tableData.value.push(form.value)
          }
        } else {
          updateMenuInTree(tableData.value, form.value)
        }
      } else {
        const newMenu = { ...form.value, id: Date.now().toString(), children: [] }
        if (form.value.pid) {
          const parent = findMenuById(tableData.value, form.value.pid)
          parent?.children?.push(newMenu)
        } else {
          tableData.value.push(newMenu)
        }
      }
      ElMessage.success(isEdit.value ? '修改成功' : '新增成功')
      dialogVisible.value = false
    }
  })
}

const delMenu = () => {
  ElMessage.success('删除成功')
}
onMounted(() => {
  initTableData()
})
</script>
<template>
  <div class="operation">
    <div class="column">
      <div class="column-left">
        <el-button :icon="CirclePlus" type="primary" @click="openAddDialog">新增</el-button>
      </div>
      <div class="column-right">
        <TableActions v-model:columns="columns" show-columns-type="checkbox" />
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      row-key="id"
      :tree-props="{ children: 'children' }"
      border
      :header-cell-style="{ background: 'var(--menu-bg2)', color: '#606266' }"
    >
      <template v-for="col in columns" :key="col.prop">
        <el-table-column
          v-if="col.visible"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align"
          :header-align="col.headerAlign"
        >
          <!-- 图标列 -->
          <template v-if="col.prop === 'icon'" #default="{ row }">
            <i class="iconfont" :class="row.icon"></i>
          </template>

          <!-- 操作列 -->
          <template v-else-if="col.prop === 'actions'" #default="{ row }">
            <div class="actions">
              <el-button class="primary" size="small" @click="openEditDialog(row)">修改</el-button>
              <el-button class="danger" size="small" @click="delMenu(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-dialog :title="isEdit ? '修改菜单' : '新增菜单'" v-model="dialogVisible" width="550px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <!-- 左侧列 -->
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" />
            </el-form-item>
            <el-form-item label="父菜单">
              <el-cascader
                v-model="form.pid"
                :options="cascaderMenuOptions"
                :props="cascaderProps"
                :show-all-levels="false"
                clearable
                placeholder="请选择父菜单"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <!-- 右侧列 -->
          <el-col :span="12">
            <el-form-item label="路由地址" prop="index">
              <el-input v-model="form.index" />
            </el-form-item>
            <el-form-item label="权限标识">
              <el-input v-model="form.permiss" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.operation {
  margin: 10px;
  padding: 20px;
  background-color: var(--public-bg-color);
  .column {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    &-right {
      margin-right: 5px;
    }
  }
  .actions {
    display: flex;
    justify-content: center;
    .el-button {
      &.primary {
        background-color: var(--type-primary-color) !important;
        border-color: var(--primary-border-color) !important;
        color: var(--menu-active-text-color) !important;
        &:hover {
          border-color: var(--menu-active-text-color) !important;
          background-color: var(--menu-active-text-color) !important;
          color: #fff !important;
        }
      }
      &.danger {
        background-color: var(--type-danger-color) !important;
        border-color: var(--danger-border-color) !important;
        color: var(--danger-color) !important;
        &:hover {
          background-color: #f56c6c !important;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
