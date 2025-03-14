import { defineStore, getActivePinia } from 'pinia'

export const useSidebarStore = defineStore('aside', {
  state: () => {
    return {
      collapse: false,
      bgColor: localStorage.getItem('aside-bg-color') || '#FCF2F0',
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
      localStorage.setItem('aside-bg-color', color)
    },
    setTextColor(color: string) {
      this.textColor = color
      localStorage.setItem('aside-text-color', color)
    },
  },
})
