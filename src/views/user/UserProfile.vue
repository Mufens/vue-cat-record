<script setup lang="ts">
import { ref, reactive } from 'vue'
import { formatDate } from '@/utils/format'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import avatar from '@/assets/images/avatar1.jpg'

const userStore = useUserStore()
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

const tags = ref(['撸猫重度患者', '拆弹专家', '₍^..^₎ 𐒡'])

// 头像上传
const fileInput = ref<HTMLInputElement>()
const triggerFileInput = () => fileInput.value?.click()
const handleAvatarChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    // 处理头像上传逻辑
    const reader = new FileReader()

    reader.readAsDataURL(file)
  }
}

// 标签页状态
const activeTab = ref('basic')

// 表单数据
const userForm = reactive({
  tags: [...tags.value]
})

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
  // 实现密码修改逻辑
}
</script>

<template>
  <div class="user-profile-container">
    <!-- 顶部用户卡片 -->
    <el-card class="profile-card">
      <div class="banner">
        <div class="bg"></div>
        <div class="avatar-wrapper" @click="triggerFileInput">
          <el-avatar :size="120" :src="userStore.user?.avatar || avatar" class="profile-avatar">
          </el-avatar>
          <input ref="fileInput" type="file" hidden accept="image/*" @change="handleAvatarChange" />
        </div>
      </div>

      <div class="profile-info">
        <h1 class="username">
          {{ userStore.user?.name }}
        </h1>
        <div class="tag-container">
          <el-tag v-for="(tag, index) in tags" :key="index" class="mr-2">
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
          <el-form :model="userForm" label-width="80px">
            <el-form-item label="用户名"> </el-form-item>
            <el-form-item label="个性标签">
              <el-tag v-for="(tag, index) in tags" :key="index" class="mr-2" closable>
                {{ tag }}
              </el-tag>

              <el-button> 添加</el-button>
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
            <el-button type="primary" @click="changePassword">提交修改</el-button>
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
  margin-bottom: 20px;
}

.banner {
  position: relative;
}
.bg {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  background: url('@/assets/images/bg2.png') no-repeat center/cover;
}
.avatar-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 135px;
  cursor: pointer;
  transition: all 0.3s;
}
.profile-avatar {
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.avatar-wrapper:hover {
  transform: translateX(-50%) scale(1.1);
}

.profile-info {
  padding-top: 50px;
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
</style>
