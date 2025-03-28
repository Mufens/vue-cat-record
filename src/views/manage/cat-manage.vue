<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search, Refresh, ZoomIn, Edit, Delete } from '@element-plus/icons-vue'
import { fetchCatData } from '@/api/cat'
import type { CatItem, CatQueryParams } from '@/types/cat'

const catList = ref<CatItem[]>([])
const total = ref(0)

const fetchCatList = async () => {
  try {
    const response = await fetchCatData(queryParams.value)
    if (response?.data) {
      catList.value = response.data.data
      total.value = response.data.total
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

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const getStarColor = (index: number, friendliness: number): string => {
  return index <= friendliness ? 'var(--rate-color)' : '#C0C0C0'
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
          <el-select
            :popper-append-to-body="false"
            v-model="queryParams.adoptionStatus"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="已领养" value="已领养"></el-option>
            <el-option label="未领养" value="未领养"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 操作工具栏 -->
      <div class="toolbar">
        <el-button :icon="Search" @click="search"> 查询 </el-button>
        <el-button :icon="Refresh" @click="reset"> 重置 </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="catList"
      :cell-style="{ background: 'var(--message-panel-bg, #ffffff)' }"
      :header-cell-style="{ background: 'var(--bg-color1,#f2f3f5)' }"
    >
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="breed" label="品种" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="healthStatus" label="健康状况" />
      <el-table-column label="领养状态">
        <template #default="{ row }">
          <el-tag :type="row.adoptionStatus === '已领养' ? 'success' : 'info'">
            {{ row.adoptionStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="活动区域" width="120"> </el-table-column>
      <el-table-column prop="friendliness" label="亲和度等级" width="125">
        <template #default="{ row }">
          <div class="rate">
            <span v-for="i in 5" :key="i" :style="{ color: getStarColor(i, row.friendliness) }">
              {{ i <= row.friendliness ? '★' : '☆' }}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="登记时间" width="120">
        <template #default="{ row }">{{ formatDate(row.createTime) }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default>
          <el-button :icon="ZoomIn" circle plain type="primary"></el-button>

          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>

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
  .el-table {
    padding: 0 10px;
  }
  .rate {
    display: flex;
    gap: 2px;
  }
}
</style>
