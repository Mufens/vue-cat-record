<script setup lang="ts">
import { User, Lock, Message } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { registerAPI, loginAPI } from '@/api/user'
import { useUserStore } from '@/stores'
const isRegister = ref(false)
const form = ref()
const formModel = ref({ username: 'admin', password: '123456', email: '', repassword: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' },
    {
      validator: (rule: string, value: string, callback: (error?: Error) => void) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const router = useRouter()

const register = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await form.value.validate()
  await registerAPI({
    name: formModel.value.username,
    password: formModel.value.password,
    email: formModel.value.email,
    role: '爱喵用户',
    avatar: ''
  })

  ElMessage.success('注册成功')
  isRegister.value = false
}

const login = () => {
  form.value.validate(async (valid: boolean) => {
    if (valid) {
      // 登录逻辑
      const user = await loginAPI({
        name: formModel.value.username,
        password: formModel.value.password
      })
      const userStore = useUserStore()
      userStore.setToken('mock-token') // 根据实际接口返回修改
      userStore.setUser(user)
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error('登录失败')
      return false
    }
  })
}
watch(isRegister, () => {
  formModel.value = { username: '', password: '', email: '', repassword: '' }
})
</script>
<template>
  <div class="login-page">
    <svg
      class="background-svg"
      viewBox="0 0 100% 100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="var(--bg-color)" />
      <!-- 原有圆形坐标需要调整为相对值 -->
      <g fill="var(--menu-active-text-color)">
        <circle r="14.7%" cx="82%" cy="83%" />
        <circle r="6.5%" cx="39%" cy="32%" />
        <circle r="8.5%" cx="79%" cy="16%" />
        <circle r="9.7%" cx="22%" cy="79.5%" />
        <circle r="9.9%" cx="2.9%" cy="7.8%" />
      </g>
    </svg>

    <div class="login-container">
      <div class="login-header">
        <div class="logo"></div>
        <div class="login-title">猫咪记录管理系统</div>
      </div>
      <!-- 注册相关表单 -->
      <el-form :model="formModel" ref="form" :rules="rules" v-if="isRegister">
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input :prefix-icon="Message" placeholder="邮箱" v-model="formModel.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            show-password
            placeholder="密码"
            v-model="formModel.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="确认密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <p class="login-text">
          已有账号？<el-link
            type="primary"
            :underline="false"
            style="color: var(--menu-active-text-color)"
            @click="isRegister = false"
            >立即登录</el-link
          >
        </p>
      </el-form>
      <!-- 登录相关表单 -->
      <el-form :model="formModel" ref="form" :rules="rules" v-else>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住密码</el-checkbox>
            <el-link type="primary" :underline="false" style="color: var(--menu-active-text-color)"
              >忘记密码？</el-link
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <p class="login-text">
          没有账号？<el-link
            type="primary"
            :underline="false"
            style="color: var(--menu-active-text-color)"
            @click="isRegister = true"
            >立即注册</el-link
          >
        </p>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .background-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .login-container {
    z-index: 1;

    width: 400px;
    border-radius: 5px;
    background-color: var(--bg-color1, #fff);
    padding: 40px 50px 50px;

    box-sizing: border-box;

    .login-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      .logo {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        background: url('@/assets/images/login.png') no-repeat center / cover;
      }
      .login-title {
        font-size: 22px;
        color: var(--menu-active-text-color);
        font-weight: bold;
      }
    }
    .el-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #787878;
      }
      .el-button {
        border-radius: 15px;
        width: 100%;
      }
      .login-text {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #787878;
      }
      .el-input__icon {
        cursor: pointer;
        color: #606266;
        &:hover {
          color: var(--menu-active-text-color);
        }
      }
    }
  }
}
.el-button--primary {
  background-color: var(--menu-active-text-color) !important;
  border-color: var(--button-color) !important;
  color: #fff !important;
  &:hover {
    border-color: var(--menu-active-text-color) !important;
  }
}
:deep(.el-icon) {
  color: #606266 !important;
}
</style>
