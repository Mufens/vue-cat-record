import pina from '@/stores/index'
import { useUserStore } from '@/stores/modules/user'
import type { App } from 'vue'
const UserStore = useUserStore(pina)

export const isHasButton = (app: App<Element>) => {
  app.directive('has', {
    mounted(el, binding) {
      const { value } = binding
      const userPerms = (UserStore.user as { permissions?: string[] })?.permissions || []

      if (!value) return
      const requiredPerms = Array.isArray(value) ? value : [value]

      const hasPermission = requiredPerms.some((p) => userPerms.includes(p))
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
