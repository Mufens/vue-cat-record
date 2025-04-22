import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoAPI } from '@/api/user'
import { getRolePermissionsAPI } from '@/api/role'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref(localStorage.getItem('token') || '') // 初始化时读取本地存储
    const setToken = (newToken: string) => {
      token.value = newToken
      localStorage.setItem('token', newToken)
    }
    const removeToken = () => {
      token.value = ''
      localStorage.removeItem('token')
    }

    const user = ref<User | null>(null)
    const permissions = ref<string[]>([]) // 新增权限列表
    const getUser = async () => {
      if (!token.value) throw new Error('未登录')
      const userId = parseInt(token.value.split(' ')[1])
      const res = await getUserInfoAPI(userId)
      user.value = res
      if (user.value?.role) {
        const { data } = await getRolePermissionsAPI(user.value.role)
        permissions.value = data || []
      } else {
        permissions.value = []
      }
    }
    const setUser = async (obj: User) => {
      user.value = { ...user.value, ...obj }
      if (obj.role) {
        const { data } = await getRolePermissionsAPI(obj.role)
        permissions.value = data || []
        localStorage.removeItem('cached-permissions')
      }
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      permissions,
      getUser,
      setUser,
    }
  },
  {
    persist: true,
  },
)
