import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoAPI } from '@/api/user'
import type { User } from '@/types/user'
import { users } from '@/mock/user'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken: string) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref<User | null>(null)
    const getUser = async () => {
      if (!token.value) throw new Error('未登录')
      const res = await getUserInfoAPI(user.value?.id || 0)
      user.value = res
    }
    const setUser = (obj: User) => {
      user.value = { ...user.value, ...obj }
      // 同步更新本地模拟数据（临时方案）
      const index = users.findIndex((u) => u.id === obj.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...obj }
      }
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
    }
  },
  {
    persist: true,
  },
)
