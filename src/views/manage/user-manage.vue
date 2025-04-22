<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserListAPI, deleteUserData, deleteBatchUserData } from '@/api/user'
import type { User, UserQueryParams } from '@/types/user'
import { formatDate } from '@/utils/format'
import TableActions from '@/components/table/TableActions.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshRight, CirclePlus, Delete } from '@element-plus/icons-vue'
import UserEdit from './components/user-edit.vue'
const tableData = ref<User[]>([])
const loading = ref(false)
const dateRange = ref([])
const total = ref(0)
const userEditRef = ref()
const columns = ref([
  { label: '选择', prop: 'selection', visible: true, type: 'selection' },
  { label: '用户ID', prop: 'id', width: '120', visible: true },
  { label: '用户名', prop: 'name', visible: true },
  { label: '角色', prop: 'role', width: '120', visible: true },
  { label: '邮箱', prop: 'email', visible: true },
  {
    label: '用户状态',
    prop: 'status',
    headerAlign: 'center',
    align: 'center',
    width: '80',
    visible: true
  },
  { label: '创建时间', prop: 'createdAt', headerAlign: 'center', visible: true },
  {
    label: '操作',
    prop: 'actions',
    visible: true,
    width: '120',
    headerAlign: 'center',
    fixed: 'right'
  }
])

// 查询参数
const queryParams = ref<UserQueryParams>({
  pagenum: 1,
  pagesize: 10,
  name: '',
  email: '',
  status: undefined,
  role: '',
  createStart: '',
  createEnd: ''
})
const fetchUserList = async () => {
  loading.value = true
  const res = await getUserListAPI(queryParams.value)
  tableData.value = res.data.list
  total.value = res.data.total
  loading.value = false
}

const search = () => {
  queryParams.value.pagenum = 1
  fetchUserList()
}

const reset = () => {
  queryParams.value = {
    pagenum: 1,
    pagesize: 10,
    name: '',
    email: '',
    status: undefined,
    role: '',
    createStart: '',
    createEnd: ''
  }
  fetchUserList()
}
const AddUser = () => {
  userEditRef.value.open()
}
const EditUser = (row: User) => {
  userEditRef.value.open(row)
}
const delUser = (row: User) => {
  ElMessageBox.confirm('是否删除该用户?', '提示', { type: 'warning' })
    .then(() => {
      deleteUserData(row.id)
        .then(() => {
          ElMessage.success('删除成功')
          fetchUserList()
        })
        .catch(() => ElMessage.error('删除失败'))
    })
    .catch(() => {})
}

const batchDelete = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }
  ElMessageBox.confirm('确定删除选中用户吗？', '警告', { type: 'warning' })
    .then(() => {
      const ids = multipleSelection.value.map(u => u.id)
      deleteBatchUserData(ids)
        .then(() => {
          ElMessage.success('删除成功')
          multipleSelection.value = []
          fetchUserList()
        })
        .catch(() => ElMessage.error('删除失败'))
    })
    .catch(() => {})
}

// 分页变化
const onSizeChange = (val: number) => {
  queryParams.value.pagesize = val
  queryParams.value.pagenum = 1
  fetchUserList()
}
const onCurrentChange = (val: number) => {
  queryParams.value.pagenum = val
  fetchUserList()
}

const showBatchDelete = ref(false)
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  showBatchDelete.value = val.length > 0
}
const onSuccess = (type: 'add' | 'edit') => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / (queryParams.value.pagesize ?? 10))
    queryParams.value.pagenum = lastPage
  }
  fetchUserList()
}

onMounted(() => {
  fetchUserList()
})
</script>

<template>
  <div class="user-manage">
    <!-- 搜索区域 -->
    <div class="search-container">
      <el-form :model="queryParams" inline label-width="70px">
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入用户名"
            clearable
            style="width: 170px"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="queryParams.email"
            placeholder="请输入邮箱"
            clearable
            style="width: 220px"
          />
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择" style="width: 120px">
            <el-option label="启用" :value="true" />
            <el-option label="禁用" :value="false" />
          </el-select>
        </el-form-item>

        <el-form-item label="角色">
          <el-input
            v-model="queryParams.role"
            placeholder="请输入角色"
            clearable
            style="width: 170px"
          />
        </el-form-item>

        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="-"
            value-format="yyyy-MM-dd"
            clearable
            style="width: 200px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" type="primary" @click="search">查询</el-button>
          <el-button :icon="RefreshRight" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作栏 -->
    <div class="operation">
      <div class="column">
        <div class="column-left">
          <el-button :icon="CirclePlus" type="primary" v-has="'user:add'" @click="AddUser"
            >新增</el-button
          >
          <el-button v-if="showBatchDelete" :icon="Delete" class="danger" @click="batchDelete">
            批量删除
          </el-button>
        </div>
        <div class="column-right">
          <TableActions
            v-model:columns="columns"
            show-columns-type="checkbox"
            @refresh="fetchUserList"
          />
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        v-loading="loading"
        :row-key="(row: User) => row.id"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: 'var(--menu-bg2)', color: '#606266' }"
        style="height: 285px"
      >
        <template v-for="col in columns" :key="col.prop">
          <el-table-column
            v-if="col.visible"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :type="col.type"
            :fixed="col.fixed"
            :header-align="col.headerAlign"
            :align="col.align"
            :show-overflow-tooltip="
              col.prop === 'email' ||
              col.prop === 'id' ||
              col.prop === 'name' ||
              col.prop === 'role'
            "
            :default-sort="{ prop: 'createdAt', order: 'descending' }"
          >
            <!-- 状态列 -->
            <template v-if="col.prop === 'status'" #default="{ row }">
              <el-tag :type="row.status ? 'success' : 'warning'">
                {{ row.status ? '启用' : '禁用' }}
              </el-tag>
            </template>

            <!-- 创建时间格式化 -->
            <template v-else-if="col.prop === 'createdAt'" #default="{ row }">
              {{ formatDate(row.createdAt) }}
            </template>

            <!-- 操作列 -->
            <template v-else-if="col.prop === 'actions'" #default="{ row }">
              <div class="actions">
                <el-button class="primary" size="small" v-has="'user:edit'" @click="EditUser(row)"
                  >编辑</el-button
                >
                <el-button class="danger" size="small" v-has="'user:delete'" @click="delUser(row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="queryParams.pagenum"
      v-model:page-size="queryParams.pagesize"
      :page-sizes="[6, 10, 20, 30]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 10px; margin-right: 5px; justify-content: flex-end"
    />
    <UserEdit ref="userEditRef" @success="onSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.user-manage {
  margin: 10px;
  background-color: var(--message-panel-bg, #ffffff);
  padding-bottom: 10px;

  .search-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .el-form {
      padding-top: 20px;
      margin-left: 100px;
      .el-form-item:last-child {
        margin-left: 28px;
      }
    }
  }

  .operation {
    padding: 0 20px;
    .column {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
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
