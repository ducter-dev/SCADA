import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useDashboardStore = defineStore('dashboard', {
  id: 'dash',
  state: () => ({
    antenaEntrada: {},
    antenaVerificacion: {},
    antenaSalida: {},
    barreraEntrada: { estado: true },
    barreraVerificacion: { estado: true },
    barreraSalida: { estado: true },
  }),
  getters: {},
  actions: {
    // Antenas
    async fetchAntenaEntrada() {
      try {
        const res = await scadaApi.get('/opc/antena/entrada')
        console.log("🚀 ~ file: dashboardStore.js:20 ~ fetchAntenaEntrada ~ res", res)
        const { data } = res
        this.antenaEntrada = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    async fetchAntenaVerificacion() {
      try {
        const res = await scadaApi.get('/opc/antena/verificacion')
        console.log("🚀 ~ file: dashboardStore.js:32 ~ fetchAntenaVerificacion ~ res", res)
        const { data } = res
        this.antenaVerificacion = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    async fetchAntenaSalida() {
      try {
        const res = await scadaApi.get('/opc/antena/salida')
        console.log("🚀 ~ file: dashboardStore.js:44 ~ fetchAntenaSalida ~ res", res)
        const { data } = res
        this.antenaSalida= data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    // Barrera de Entrada
    async fetchBarreraEntrada() {
      try {
        const res = await scadaApi.get('/barrera/entrada')
        console.log("🚀 ~ file: dashboardStore.js:57 ~ fetchBarreraEntrada ~ res", res)
        const { data } = res
        this.barreraEntrada = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    async changeBarreraEntrada(toggle) {
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/entrada', dataForm)
        console.log("🚀 ~ file: dashboardStore.js:72 ~ changeBarreraEntrada ~ res", res)
        const { data } = res
        this.barreraVerificacion = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    // Barrera de Verificación
    async fetchBarreraVerificacion() {
      try {
        const res = await scadaApi.get('/barrera/verificacion')
        console.log("🚀 ~ file: dashboardStore.js:85 ~ fetchBarreraVerificacion ~ res", res)
        const { data } = res
        this.barreraVerificacion = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    async changeBarreraVerificacion(toggle) {
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/verificacion', dataForm)
        console.log("🚀 ~ file: dashboardStore.js:100 ~ changeBarreraVerificacion ~ res", res)
        const { data } = res
        this.barreraVerificacion = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    // Barrera de Salida
    async fetchBarreraSalida() {
      try {
        const res = await scadaApi.get('/barrera/salida')
        console.log("🚀 ~ file: dashboardStore.js:113 ~ fetchBarreraSalida ~ res", res)
        const { data } = res
        this.barreraSalida = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    async changeBarreraSalida() {
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/salida', dataForm)
        console.log("🚀 ~ file: dashboardStore.js:128 ~ changeBarreraSalida ~ res", res)
        const { data } = res
        this.barreraSalida = data
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },
  },
})