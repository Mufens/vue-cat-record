<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/format'
import TableActions from '@/components/TableActions.vue'
import { Search, ZoomIn, Edit, Delete, RefreshRight, CirclePlus } from '@element-plus/icons-vue'
import { fetchCatData } from '@/api/cat'
import type { CatItem, CatQueryParams } from '@/types/cat'
import CatDetail from './components/cat-detail.vue'
import CatEdit from './components/cat-edit.vue'
import { deleteCatData } from '@/api/cat'
const catEditRef = ref()
const AddCat = () => {
  catEditRef.value.open()
}
const EditCat = (row: CatItem) => {
  catEditRef.value.open(row)
}
const DelCat = async (row: CatItem) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await deleteCatData(row.id)
    ElMessage.success('删除成功')
    fetchCatList()
  } catch {
    ElMessage.error('删除失败')
  }
}
const onSuccess = (type: 'add' | 'edit') => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / queryParams.value.pagesize)
    queryParams.value.pagenum = lastPage
  }
  fetchCatList()
}

const catList = ref<CatItem[]>([])
const loading = ref(false)
const total = ref(0)

const columns = ref([
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

// 查询参数
const queryParams = ref<CatQueryParams>({
  pagenum: 1,
  pagesize: 6,
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
onMounted(() => {
  fetchCatList()
})
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
        <el-button :icon="Search" @click="search" style="background-color: var(--menu-bg2)">
          查询
        </el-button>
        <el-button :icon="RefreshRight" @click="reset"> 重置 </el-button>
      </div>
    </div>
    <div class="operation">
      <!-- 操作项 -->
      <div class="column">
        <div class="column-left">
          <el-button :icon="CirclePlus" style="background-color: var(--menu-bg2)" @click="AddCat"
            >新增
          </el-button>
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
        :cell-style="{ background: 'var(--message-panel-bg, #ffffff)' }"
        :header-cell-style="{
          background: 'var(--menu-bg2)',
          color: '#606266'
        }"
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
            show-overflow-tooltip
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
              <el-button
                :icon="ZoomIn"
                circle
                plain
                type="primary"
                @click="ViewCat(row)"
              ></el-button>
              <el-button :icon="Edit" circle plain type="primary" @click="EditCat(row)"></el-button>
              <el-button :icon="Delete" circle plain type="danger" @click="DelCat(row)"></el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      :page-sizes="[3, 6, 8, 10]"
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

<style lang="scss">
.cat-manage {
  margin: 10px 10px;
  background-color: var(--message-panel-bg, #ffffff);
  padding-bottom: 10px;

  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      margin-top: 20px;
    }

    .toolBar {
      margin-left: auto;
    }
  }
  .operation {
    padding: 0 20px;
    .column {
      display: flex;
      justify-content: space-between;
      &-left {
        margin-top: 5px;
      }
      &-right {
        .el-icon {
          margin-left: 8px;
        }
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
      .el-button:hover {
        background: transparent !important;
      }
    }
  }
}
</style>
