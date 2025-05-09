<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/format'
import TableActions from '@/components/table/TableActions.vue'
import { Search, ZoomIn, Edit, Delete, RefreshRight, CirclePlus } from '@element-plus/icons-vue'
import { fetchCatData } from '@/api/cat'
import type { CatItem, CatQueryParams } from '@/types/cat'
import CatDetail from './components/cat-detail.vue'
import CatEdit from './components/cat-edit.vue'
import { deleteCatData, deleteBatchCatData } from '@/api/cat'

const catList = ref<CatItem[]>([])
const loading = ref(false)
const total = ref(0)
const catEditRef = ref()

const columns = ref([
  { label: '选择', prop: 'selection', visible: true, type: 'selection' },
  { label: '#', prop: 'index', visible: true, type: 'index' },
  { label: '编号', prop: 'id', visible: true },
  { label: '姓名', prop: 'name', visible: true },
  { label: '品种', prop: 'breed', visible: true },
  { label: '年龄', prop: 'age', visible: true },
  { label: '性别', prop: 'gender', visible: true },
  { label: '健康状况', prop: 'healthStatus', visible: true },
  { label: '活动区域', prop: 'area', visible: true, width: '120' },
  { label: '亲和度等级', prop: 'friendliness', visible: true, width: '100' },
  { label: '领养状态', prop: 'adoptionStatus', visible: true },
  {
    label: '登记时间',
    prop: 'createTime',
    visible: true,
    width: '120'
  },
  {
    label: '操作',
    prop: 'actions',
    visible: true,
    width: '150',
    fixed: 'right',
    headerAlign: 'center'
  }
])

const fetchCatList = async () => {
  try {
    loading.value = true
    const response = await fetchCatData(queryParams.value)
    if (response?.data) {
      catList.value = response.data.data

      total.value = response.data.total
      loading.value = false
    }
  } catch (err) {
    console.error('数据加载失败', err)
  }
}
onMounted(() => {
  fetchCatList()
})

// 查询参数
const queryParams = ref<CatQueryParams>({
  pagenum: 1,
  pagesize: 10,
  breed: '',
  adoptionStatus: undefined
})

//搜索数据，从第一页开始
const search = () => {
  queryParams.value.pagenum = 1
  fetchCatList()
}
const reset = () => {
  queryParams.value = { pagenum: 1, pagesize: 6, breed: '', adoptionStatus: undefined }
  fetchCatList()
}

const showBatchDelete = ref(false)
const multipleSelection = ref<CatItem[]>([])
const handleSelectionChange = (val: CatItem[]) => {
  multipleSelection.value = val
  showBatchDelete.value = val.length > 0
}
//页数改变
const onSizeChange = (val: number) => {
  queryParams.value.pagesize = val
  fetchCatList()
}
const onCurrentChange = (val: number) => {
  queryParams.value.pagenum = val
  fetchCatList()
}

const getStarColor = (index: number, friendliness: number): string => {
  return index <= friendliness ? 'var(--rate-color)' : '#C0C0C0'
}
const detailVisible = ref(false)
const currentCat = ref<CatItem | null>(null)

// 查看猫咪详情方法
const ViewCat = (row: CatItem) => {
  currentCat.value = row
  detailVisible.value = true
}
const AddCat = () => {
  catEditRef.value.open()
}
const EditCat = (row: CatItem) => {
  catEditRef.value.open(row)
}
const DelCat = async (row?: CatItem) => {
  try {
    const ids = row ? [row.id] : multipleSelection.value.map(cat => cat.id)
    console.log('要删除的IDs:', ids)

    await ElMessageBox.confirm(
      `此操作将永久删除${row ? '该猫咪' : `选中的${ids.length}只猫咪`}, 是否继续?`,
      '提示',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true }
    )
    if (row) {
      await deleteCatData(row.id)
    } else {
      await deleteBatchCatData(ids)
      ElMessage.success('删除成功')
    }
    fetchCatList()
    multipleSelection.value = []
  } catch {
    console.log('取消删除')
  }
}

const onSuccess = (type: 'add' | 'edit') => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / queryParams.value.pagesize)
    queryParams.value.pagenum = lastPage
  }
  fetchCatList()
}
</script>

<template>
  <div class="cat-manage">
    <!-- 查询区域 -->
    <div class="search-container">
      <el-form :model="queryParams" inline>
        <el-form-item label="品种">
          <el-input
            v-model="queryParams.breed"
            placeholder="请输入品种"
            style="width: 150px"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="领养状态">
          <el-select v-model="queryParams.adoptionStatus" placeholder="请选择" style="width: 100px">
            <el-option label="已领养" value="已领养"></el-option>
            <el-option label="未领养" value="未领养"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 操作工具栏 -->
      <div class="toolbar">
        <el-button :icon="Search" @click="search" type="primary"> 查询 </el-button>
        <el-button :icon="RefreshRight" @click="reset"> 重置 </el-button>
      </div>
    </div>
    <div class="operation">
      <!-- 操作项 -->
      <div class="column">
        <div class="column-left">
          <el-button :icon="CirclePlus" type="primary" v-has="'cat:add'" @click="AddCat"
            >新增
          </el-button>
          <el-button :icon="Delete" class="danger" v-if="showBatchDelete" @click="DelCat()"
            >批量删除</el-button
          >
        </div>
        <div class="column-right">
          <TableActions
            v-model:columns="columns"
            :show-columns-type="'checkbox'"
            @refresh="fetchCatList"
          />
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table
        :data="catList"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :cell-style="{ background: 'var(--public-bg-color)' }"
        :header-cell-style="{
          background: 'var(--menu-bg2)',
          color: '#606266'
        }"
        style="height: 340px"
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
            :show-overflow-tooltip="
              col.prop === 'area' || col.prop === 'id' || col.prop === 'createTime'
            "
          >
            <!-- 序号列 -->
            <template v-if="col.type === 'index'" #default="{ $index }">
              {{ $index + 1 }}
            </template>

            <!-- 健康状况 -->
            <template v-else-if="col.prop === 'healthStatus'" #default="{ row }">
              <el-tag
                :type="
                  row.healthStatus === '健康'
                    ? 'success'
                    : row.healthStatus === '生病'
                    ? 'warning'
                    : 'info'
                "
              >
                {{ row.healthStatus }}
              </el-tag>
            </template>

            <!-- 亲和度等级 -->
            <template v-else-if="col.prop === 'friendliness'" #default="{ row }">
              <div class="rate">
                <span v-for="i in 5" :key="i" :style="{ color: getStarColor(i, row.friendliness) }">
                  {{ i <= row.friendliness ? '★' : '☆' }}
                </span>
              </div>
            </template>
            <!-- 领养状态 -->
            <template v-else-if="col.prop === 'adoptionStatus'" #default="{ row }">
              <el-tag :type="row.adoptionStatus === '已领养' ? 'success' : 'info'">
                {{ row.adoptionStatus }}
              </el-tag>
            </template>

            <!-- 登记时间 -->
            <template v-else-if="col.prop === 'createTime'" #default="{ row }">
              {{ formatDate(row.createTime) }}
            </template>

            <!-- 操作列模板 -->
            <template v-else-if="col.prop === 'actions'" #default="{ row }">
              <el-button class="primary" :icon="ZoomIn" circle @click="ViewCat(row)"></el-button>
              <el-button
                class="primary"
                :icon="Edit"
                circle
                v-has="'cat:edit'"
                @click="EditCat(row)"
              ></el-button>
              <el-button
                class="danger"
                :icon="Delete"
                circle
                v-has="'cat:delete'"
                @click="DelCat(row)"
              ></el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      :page-sizes="[6, 10, 15, 20]"
      :page-size="queryParams.pagesize"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @update:page-size="onSizeChange"
      @update:current-page="onCurrentChange"
      style="margin-top: 10px; margin-right: 5px; justify-content: flex-end"
    />
    <cat-detail v-if="currentCat" :cat-data="currentCat" v-model:visible="detailVisible" />
    <cat-edit ref="catEditRef" @success="onSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.cat-manage {
  margin: 10px 10px;
  background-color: var(--public-bg-color);

  padding: 20px;

  .search-container {
    display: flex;
    margin-top: 10px;
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
    padding: 0 20px;
    .column {
      display: flex;
      justify-content: space-between;
      &-left {
        margin-top: 5px;
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
        margin-top: 10px;
        margin-right: 5px;
      }
    }

    .el-table {
      padding-top: 5px;
      .rate {
        display: flex;
        gap: 2px;
      }
      .el-button {
        &.primary {
          background-color: var(--type-primary-color) !important;
          border-color: var(--primary-border-color) !important;
          :deep(.el-icon) {
            color: var(--menu-active-text-color) !important;
          }

          &:hover {
            border-color: var(--menu-active-text-color) !important;
            background-color: var(--menu-active-text-color) !important;
            :deep(.el-icon) {
              color: #fff !important;
            }
          }
        }
        &.danger {
          background-color: var(--type-danger-color) !important;
          border-color: var(--danger-border-color) !important;
          :deep(.el-icon) {
            color: var(--danger-color) !important;
          }

          &:hover {
            background-color: #f56c6c !important;
            :deep(.el-icon) {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
}
</style>
