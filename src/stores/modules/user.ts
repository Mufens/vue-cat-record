import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoAPI } from '@/api/user'
import type { User } from '@/types/user'

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
      user.value = obj
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
