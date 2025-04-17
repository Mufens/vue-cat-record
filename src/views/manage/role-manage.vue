<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRoleListAPI, deleteRoleAPI } from '@/api/role'
import type { Role, RoleQueryParams } from '@/types/role'
import { formatDate } from '@/utils/format'
import TableActions from '@/components/table/TableActions.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshRight, CirclePlus } from '@element-plus/icons-vue'
import RoleEdit from './components/role-edit.vue'

const tableData = ref<Role[]>([])
const total = ref(0)
const roleEditRef = ref()

const columns = ref([
  {
    label: '角色ID',
    prop: 'id',
    headerAlign: 'center',
    align: 'center',
    visible: true,
    showOverflowTooltip: true
  },
  { label: '角色名称', prop: 'name', headerAlign: 'center', align: 'center', visible: true },
  {
    label: '备注',
    prop: 'remark',
    headerAlign: 'center',
    align: 'center',
    visible: true,
    showOverflowTooltip: true
  },
  {
    label: '角色状态',
    prop: 'status',
    headerAlign: 'center',
    align: 'center',
    width: '80',
    visible: true
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    headerAlign: 'center',
    align: 'center',
    visible: true
  },
  { label: '操作', prop: 'actions', headerAlign: 'center', fixed: 'right', visible: true }
])

const queryParams = ref<RoleQueryParams>({
  pagenum: 1,
  pagesize: 10,
  name: '',
  status: undefined
})

const fetchRoleList = async () => {
  try {
    const res = await getRoleListAPI(queryParams.value)
    console.log('API响应:', res)
    if (res.data) {
      tableData.value = res.data.list || []
      total.value = res.data.total || 0
    } else {
      console.error('API返回的数据结构不正确:', res)
      tableData.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取角色列表失败:', error)
  }
}

const search = () => {
  queryParams.value.pagenum = 1
  fetchRoleList()
}

const reset = () => {
  queryParams.value = {
    pagenum: 1,
    pagesize: 10,
    name: '',
    status: undefined
  }
  fetchRoleList()
}

const AddRole = () => {
  roleEditRef.value.open()
}
const EditRole = (row: Role) => {
  roleEditRef.value.open(row)
}
const DelRole = async (row: Role) => {
  try {
    await ElMessageBox.confirm(`确认删除角色【${row.name}】吗？`, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const { code } = (await deleteRoleAPI(row.id)).data
    if (code === 200) {
      ElMessage.success('删除成功')
      fetchRoleList()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const onSizeChange = (val: number) => {
  queryParams.value.pagesize = val
  queryParams.value.pagenum = 1

  fetchRoleList()
}

const onCurrentChange = (val: number) => {
  queryParams.value.pagenum = val
  fetchRoleList()
}
const onSuccess = (type: 'add' | 'edit') => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / (queryParams.value.pagesize ?? 10))
    queryParams.value.pagenum = lastPage
  }
  fetchRoleList()
}

onMounted(() => fetchRoleList())
</script>

<template>
  <div class="role-manage">
    <div class="search-container">
      <el-form inline label-width="70px">
        <el-form-item label="角色名称">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入角色名称"
            clearable
            style="width: 170px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择" style="width: 120px">
            <el-option label="启用" :value="true" />
            <el-option label="禁用" :value="false" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button :icon="Search" type="primary" @click="search">查询</el-button>
          <el-button :icon="RefreshRight" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation">
      <div class="column">
        <div class="column-left">
          <el-button :icon="CirclePlus" type="primary" v-has="'role:add'" @click="AddRole"
            >新增</el-button
          >
        </div>
        <div class="column-right">
          <TableActions
            v-model:columns="columns"
            show-columns-type="checkbox"
            @refresh="fetchRoleList"
          />
        </div>
      </div>

      <el-table
        :data="tableData"
        :row-key="(row: Role) => row.id"
        :header-cell-style="{ background: 'var(--menu-bg2)', color: '#606266' }"
        style="height: 340px"
      >
        <template v-for="col in columns" :key="col.prop">
          <el-table-column
            v-if="col.visible"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :fixed="col.fixed"
            :header-align="col.headerAlign"
            :align="col.align"
            :show-overflow-tooltip="col.prop === 'remark' || col.prop === 'id'"
          >
            <template v-if="col.prop === 'status'" #default="{ row }">
              <el-tag :type="row.status ? 'success' : 'warning'">{{
                row.status ? '启用' : '禁用'
              }}</el-tag>
            </template>
            <template v-else-if="col.prop === 'createdAt'" #default="{ row }">{{
              formatDate(row.createdAt)
            }}</template>
            <template v-else-if="col.prop === 'actions'" #default="{ row }">
              <div class="actions">
                <el-button class="primary" size="small" v-has="'role:edit'" @click="EditRole(row)"
                  >编辑</el-button
                >
                <el-button class="danger" size="small" v-has="'role:delete'" @click="DelRole(row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <el-pagination
      :page-sizes="[6, 10, 15, 20]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      :current-page="queryParams.pagenum"
      :page-size="queryParams.pagesize"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 10px; justify-content: flex-end"
    />

    <RoleEdit ref="roleEditRef" @success="onSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.role-manage {
  margin: 10px;
  background-color: var(--message-panel-bg, #ffffff);
  padding: 20px;
  .search-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    .el-form {
      margin-left: 20px;
      .el-form-item:last-child {
        margin-left: 30px;
      }
    }
  }

  .operation {
    .column {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      &-left {
        margin-top: 10px;
      }
      &-right {
        margin-top: 12px;
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
}
</style>
