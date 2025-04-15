<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getUserListAPI } from '@/api/user'
import type { User, UserQueryParams } from '@/types/user'
import { formatDate } from '@/utils/format'
import TableActions from '@/components/TableActions.vue'
import { Search, RefreshRight, CirclePlus, Delete } from '@element-plus/icons-vue'
const tableData = ref<User[]>([])
const loading = ref(false)
const dateRange = ref<string[]>([])
const total = ref(0)
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
  page: 1,
  pageSize: 10,
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
  tableData.value = res.list
  total.value = res.total
  loading.value = false
}
const search = () => {
  queryParams.value.createStart = dateRange.value[0]
  queryParams.value.createEnd = dateRange.value[1]
  queryParams.value.page = 1
  fetchUserList()
}
const reset = () => {
  queryParams.value = {
    page: 1,
    pageSize: 10,
    name: '',
    email: '',
    status: undefined,
    role: '',
    createStart: '',
    createEnd: ''
  }
  fetchUserList()
}
// 分页变化
const onSizeChange = (val: number) => {
  queryParams.value.pageSize = val
  fetchUserList()
}
const onCurrentChange = (val: number) => {
  queryParams.value.page = val
  fetchUserList()
}

const page = ref(1)
const pageSize = ref(10)

const paginatedData = computed(() => {
  return tableData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})

const showBatchDelete = ref(false)
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  showBatchDelete.value = val.length > 0
}

onMounted(() => {
  fetchUserList()
})
</script>

<template>
  <div class="user-manage">
    <!-- 搜索区域 -->
    <div class="search-container">
      <el-form inline label-width="70px">
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
          <el-button :icon="CirclePlus" type="primary" v-has="'user:add'">新增</el-button>
          <el-button v-if="showBatchDelete" :icon="Delete" class="danger"> 批量删除 </el-button>
        </div>
        <div class="column-right">
          <TableActions v-model:columns="columns" :show-columns-type="'checkbox'" />
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table
        :data="paginatedData"
        v-loading="loading"
        :row-key="(row: User) => row.id"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: 'var(--menu-bg2)', color: '#606266' }"
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
                <el-button class="primary" size="small" v-has="'user:edit'">编辑</el-button>
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
      v-model:current-page="queryParams.page"
      v-model:page-size="queryParams.pageSize"
      :page-sizes="[3, 6, 8, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-manage {
  margin: 10px;
  background-color: var(--message-panel-bg, #ffffff);
  padding: 20px;

  .search-container {
    display: flex;
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
        .el-button {
          &.danger {
            background-color: var(--type-danger-color) !important;
            border-color: var(--danger-border-color) !important;
            color: var(--danger-color) !important;
            :deep(.el-icon) {
              color: var(--danger-color) !important;
            }
            &:hover {
              background-color: #f56c6c !important;
              color: #fff !important;
              :deep(.el-icon) {
                color: #fff !important;
              }
            }
          }
        }
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

  .el-pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>
