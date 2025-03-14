import { defineStore, getActivePinia } from 'pinia'

export const useSidebarStore = defineStore('aside', {
  state: () => {
    return {
      collapse: false,
      bgColor: localStorage.getItem('aside-bg-color') || '#324157',
      textColor: localStorage.getItem('aside-text-color') || '#bfcbd9',
    }
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse
    },
    setBgColor(color: string) {
      this.bgColor = color
      localStorage.setItem('sidebar-bg-color', color)
    },
    setTextColor(color: string) {
      this.textColor = color
      localStorage.setItem('sidebar-text-color', color)
    },
  },
})
