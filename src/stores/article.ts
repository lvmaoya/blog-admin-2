import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    currentEditId: null as string | null
  }),
  actions: {
    setCurrentEditId(id: string | null) {
      this.currentEditId = id
    }
  }
})