import { defineStore } from 'pinia'
interface ObjectList {
  [key: string]: string[]
}

export const usePermissStore = defineStore('permiss', {
  state: () => {
    const defaultList: ObjectList = {
      admin: ['0', '1', '21', '22'],
      user: ['0', '1', '11', '12', '13'],
    }
    const username = localStorage.getItem('vuems_name')
    console.log(username)
    return {
      key: (username == 'admin' ? defaultList.admin : defaultList.user) as string[],
      defaultList,
    }
  },
  actions: {
    handleSet(val: string[]) {
      this.key = val
    },
  },
})
