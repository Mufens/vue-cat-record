<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addCatData, editCatData } from '@/api/cat'
import type { CatItem } from '@/types/cat'
import { Plus } from '@element-plus/icons-vue'

const visibleDrawer = ref(false)
const formModel = ref<Partial<CatItem>>({
  name: '',
  breed: '',
  age: '',
  gender: '公',
  healthStatus: '健康',
  adoptionStatus: '未领养',
  area: '',
  friendliness: 5,
  catImg: ''
})
// 图片上传相关逻辑
const imgUrl = ref('')
const onSelectFile = async (uploadFile: { raw: File }) => {
  if (!['image/jpeg', 'image/png'].includes(uploadFile.raw.type)) {
    ElMessage.error('仅支持 JPEG/PNG 格式')
    return
  }
  try {
    // 生成预览
    imgUrl.value = URL.createObjectURL(uploadFile.raw) // 转换为 Base64 字符串后存储
    const reader = new FileReader()
    reader.onload = () => {
      formModel.value.catImg = reader.result as string
    }
    reader.readAsDataURL(uploadFile.raw)
  } catch {
    ElMessage.error('图片处理失败')
  }
}

const emit = defineEmits(['success'])

// 提交逻辑
const onSubmit = async () => {
  try {
    // 构造符合 CatItem 类型的请求数据
    const requestData: Partial<CatItem> = {
      ...formModel.value,
      friendliness: Number(formModel.value.friendliness), // 确保数值类型
      // 如果 id 存在，需要在编辑时传递
      ...(formModel.value.id && { id: formModel.value.id })
    }

    if (formModel.value.id) {
      await editCatData(formModel.value.id, requestData)
      ElMessage.success('修改成功')
    } else {
      await addCatData(requestData)
      ElMessage.success('添加成功')
    }

    visibleDrawer.value = false
    emit('success', formModel.value.id ? 'edit' : 'add')
  } catch {
    ElMessage.error('操作失败')
  }
}
// 打开抽屉
const open = (row?: CatItem) => {
  visibleDrawer.value = true
  if (row?.id) {
    formModel.value = {
      ...row
    }
    imgUrl.value = row.catImg || ''
  } else {
    formModel.value = {
      name: '',
      breed: '',
      age: '',
      gender: '公',
      healthStatus: '健康',
      adoptionStatus: '未领养',
      area: '',
      friendliness: 5,
      catImg: ''
    }
    imgUrl.value = ''
  }
}

defineExpose({ open })
</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑猫咪' : '添加猫咪'" size="40%">
    <el-form :model="formModel" label-width="80px" style="padding: 20px">
      <el-form-item label="照片" prop="catImg">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onSelectFile"
          ><img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入猫咪姓名" />
      </el-form-item>

      <el-form-item label="品种" prop="breed">
        <el-input v-model="formModel.breed" placeholder="请输入品种" />
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="formModel.age" placeholder="请输入年龄" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="formModel.gender">
          <el-option label="公" value="公" />
          <el-option label="母" value="母" />
        </el-select>
      </el-form-item>

      <el-form-item label="健康状况" prop="healthStatus">
        <el-select v-model="formModel.healthStatus">
          <el-option label="健康" value="健康" />
          <el-option label="生病" value="生病" />
          <el-option label="喵星" value="喵星" />
        </el-select>
      </el-form-item>

      <el-form-item label="亲和度" prop="friendliness">
        <el-input-number
          v-model="formModel.friendliness"
          :min="1"
          :max="5"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="区域" prop="area">
        <el-input v-model="formModel.area" placeholder="请输入活动区域" />
      </el-form-item>

      <el-form-item>
        <el-button
          style="background-color: var(--menu-active-text-color); color: #fff"
          @click="onSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d !important;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
