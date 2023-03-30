import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useBitacoraStore = defineStore('bitacora', {
  id: 'bitacora',
  state: () => ({
    records: [],
  }),
  getters: {},
  actions: {
    async fetchBitacoras() {
      try {
        const res = await scadaApi.get('/bitacora')
        const { data } = res
        this.records = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },
  }
})