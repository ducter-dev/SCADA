import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useBitacoraStore = defineStore('bitacora', {
  id: 'bitacora',
  state: () => ({
    records: [],
  }),
  getters: {},
  actions: {
    async fetchBitacoras(fecha) {
      try {
        const res = await scadaApi.get(`/bitacora/${fecha}`)
        const { data } = res
        this.records = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },
    async insertBitacora(bitacora) {
      try {
        const res = await scadaApi.post('/bitacora', bitacora)
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    }
  }
})