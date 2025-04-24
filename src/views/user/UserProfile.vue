<script setup lang="ts">
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/format'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import avatar from '@/assets/images/avatar1.jpg'
import { updatePasswordAPI, updateUserInfoAPI } from '@/api/user'
import { ElMessage, ElInput, ElForm } from 'element-plus'
import { nextTick } from 'vue'

const userStore = useUserStore()
const activeTab = ref('basic')

const formRef = ref<InstanceType<typeof ElForm>>()

onMounted(async () => {
  try {
    if (userStore.user?.id) {
      userStore.getUser()
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

// 用户数据
const dynamicTags = ref(['撸猫重度患者', '拆弹专家', '₍^..^₎ 𐒡'])
const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value.trim()) {
    dynamicTags.value.push(inputValue.value.trim())
  }
  inputVisible.value = false
  inputValue.value = ''
}

// 头像上传
const fileInput = ref<HTMLInputElement>()
const triggerFileInput = () => fileInput.value?.click()
const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) {
        const updatedUser = { ...userStore.user!, avatar: e.target.result as string }
        userStore.setUser(updatedUser)
      }
    }
    reader.readAsDataURL(file)
  }
}
const form = reactive({ username: userStore.user?.name || '', email: userStore.user?.email || '' })
import type { FormItemRule } from 'element-plus'

type Arrayable<T> = T | T[]
const rules: Partial<Record<string, Arrayable<FormItemRule>>> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ]
}
const submitForm = async () => {
  try {
    // 表单验证
    await formRef.value?.validate()
    if (!userStore.user?.id) throw new Error('用户未登录') // 调用更新接口
    await updateUserInfoAPI(userStore.user.id, { name: form.username, email: form.email }) // 更新本地存储
    const updatedUser = { ...userStore.user, name: form.username, email: form.email }
    userStore.setUser(updatedUser)
    ElMessage.success('信息修改成功')
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message)
    }
  }
}

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const pwdRules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

// 修改密码
const changePassword = async () => {
  try {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      throw new Error('新密码与确认密码不一致')
    }
    if (!userStore.user?.id) throw new Error('用户未登录')
    await updatePasswordAPI(userStore.user.id, passwordForm.oldPassword, passwordForm.newPassword)
    ElMessage.success('密码修改成功')
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('发生未知错误')
    }
  }
}
</script>

<template>
  <div class="user-profile-container">
    <!-- 顶部用户卡片 -->
    <el-card class="profile-card">
      <div class="banner">
        <div class="avatar-wrapper" @click="triggerFileInput">
          <el-avatar :size="120" :src="userStore.user?.avatar || avatar" class="profile-avatar">
          </el-avatar>
          <div class="avatar-mask">
            <span class="mask-text">更换头像</span>
          </div>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept="image/*"
            @change="handleFileUpload"
          />
        </div>
      </div>
      <div class="profile-info">
        <h1 class="username">
          {{ userStore.user?.name }}
        </h1>
        <div class="tag-container">
          <el-tag v-for="(tag, index) in dynamicTags" :key="index" class="mr-2">
            {{ tag }}
          </el-tag>
        </div>
        <div class="email">
          邮箱:{{ userStore.user?.email }}
          <p class="time">注册时间：{{ formatDate(userStore.user?.createdAt || '') }}</p>
        </div>
      </div>
    </el-card>

    <!-- 标签页区域 -->
    <el-card class="tabs-card">
      <el-tabs v-model="activeTab">
        <!-- 基本信息标签页 -->
        <el-tab-pane label="基本信息" name="basic">
          <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" clearable />
            </el-form-item>

            <el-form-item label="个性标签">
              <div class="flex flex-wrap gap-2">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  class="mr-2"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput">
                  + 新标签
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" clearable />
            </el-form-item>
            <el-form-item
              ><el-button type="primary" @click="submitForm">保存</el-button>
              <el-button @click="formRef?.resetFields()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 修改密码标签页 -->
        <el-tab-pane label="修改密码" name="password">
          <el-form :model="passwordForm" label-width="100px" :rules="pwdRules">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="passwordForm.oldPassword" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="passwordForm.newPassword" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="passwordForm.confirmPassword" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.user-profile-container {
  margin: 10px 7px;
}

.profile-card {
  height: 370px;
  width: 100%;
  margin-bottom: 20px;
  background: url('@/assets/images/bg2.png') no-repeat center;
  background-size: 100% 100%;
  border-radius: 10px;
}

.avatar-wrapper {
  cursor: pointer;
  position: relative;
  margin: 37px auto 0px;
  width: 128px;
  height: 128px;
  text-align: center;
}
.profile-avatar {
  cursor: pointer;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.avatar-mask {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}
.avatar-wrapper:hover .avatar-mask {
  opacity: 1;
}

.mask-text {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.profile-info {
  text-align: center;
}

.username {
  font-size: 24px;
}

.tag-container {
  margin: 10px 0;
}
.el-tag {
  margin-right: 5px;
}
.el-tag.el-tag--primary {
  --el-tag-bg-color: var(--menu-bg2);
  --el-tag-border-color: var(--bg-color);
  --el-tag-text-color: var(--menu-active-text-color);
}

.email {
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.time {
  margin-left: 10px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.tabs-card {
  margin-top: 20px;
}
:deep(.el-tabs__content) {
  padding: 20px;
}
.el-form {
  width: 40%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
