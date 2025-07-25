<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserData, editUserData } from '@/api/user'
import { getRoleListAPI } from '@/api/role'
import type { User } from '@/types/user'
import type { Role } from '@/types/role'
import { useUserStore } from '@/stores/modules/user'
const visible = ref(false)
const roleList = ref<Role[]>([])
const formModel = ref<Partial<User>>({
  name: '',
  password: '',
  role: '',
  status: true,
  email: ''
})
const fetchRoles = async () => {
  try {
    const res = await getRoleListAPI({
      pagenum: 1,
      pagesize: 100,
      status: true
    })
    roleList.value = res.data.list
  } catch {
    ElMessage.error('获取角色列表失败')
  }
}
onMounted(() => {
  fetchRoles()
})

const emit = defineEmits(['success'])

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 11, message: '用户名长度在1-11个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: !formModel.value.id, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须为6-15位非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ]
}

// 提交逻辑
const onSubmit = async () => {
  try {
    const submitData = { ...formModel.value }
    if (!submitData.id && !submitData.password) {
      ElMessage.error('新增用户必须设置密码')
      return
    }
    if (submitData.id) delete submitData.password

    if (formModel.value.id) {
      await editUserData(formModel.value.id, submitData)
      ElMessage.success('修改成功')
    } else {
      await addUserData(submitData as Required<typeof submitData>)
      ElMessage.success('新增成功')
    }

    visible.value = false
    emit('success')
    // 如果修改的是当前登录用户
    const userStore = useUserStore()
    if (userStore.user?.id === formModel.value.id) {
      await userStore.getUser()
      window.location.reload() // 强制刷新页面以更新权限相关状态
    }
  } catch {
    ElMessage.error('操作失败')
  }
}

// 打开弹窗时重置表单
const open = (row?: User) => {
  visible.value = true
  formModel.value = row
    ? { ...row, password: '' }
    : {
        name: '',
        password: '',
        role: '爱喵用户',
        status: true,
        email: ''
      }
}

defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="formModel.id ? '编辑用户' : '新增用户'"
    width="400px"
    :close-on-click-modal="false"
    destroy-on-close
    draggable
  >
    <el-form :model="formModel" label-width="80px" :rules="rules" style="padding: 0 20px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password" v-if="!formModel.id">
        <el-input
          v-model="formModel.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="formModel.role" style="width: 100%">
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :label="role.name"
            :value="role.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="formModel.status" active-text="启用" inactive-text="禁用" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" placeholder="请输入邮箱" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
