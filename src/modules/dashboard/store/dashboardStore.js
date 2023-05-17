import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useDashboardStore = defineStore('dashboard', {
  id: 'dash',
  state: () => ({
    antenaEntrada: {},
    antenaVerificacion: {},
    antenaSalida: {},
    barreraEntrada: null,
    barreraVerificacion: null,
    barreraSalida: null,
  }),
  getters: {},
  actions: {
    // Antenas
    async fetchAntenaEntrada() {
      try {
        const res = await scadaApi.get('/opc/antena/entrada')
        const { data } = res
        this.antenaEntrada = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchAntenaVerificacion() {
      try {
        const res = await scadaApi.get('/opc/antena/verificacion')
        const { data } = res
        this.antenaVerificacion = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchAntenaSalida() {
      try {
        const res = await scadaApi.get('/opc/antena/salida')
        const { data } = res
        this.antenaSalida= data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // Barrera de Entrada
    async fetchBarreraEntrada() {
      try {
        const res = await scadaApi.get('/barrera/entrada')
        console.log("🚀 ~ file: dashboardStore.js:54 ~ fetchBarreraEntrada ~ res:", res)
        const { data } = res
        this.barreraEntrada = data.estado
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async changeBarreraEntrada(toggle) {
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/entrada', dataForm)
        const { data } = res
        this.barreraVerificacion = data.estado
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // Barrera de Verificación
    async fetchBarreraVerificacion() {
      try {
        const res = await scadaApi.get('/barrera/verificacion')
        const { data } = res
        this.barreraVerificacion = data.estado
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async changeBarreraVerificacion(toggle) {
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/verificacion', dataForm)
        const { data } = res
        this.barreraVerificacion = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // Barrera de Salida
    async fetchBarreraSalida() {
      try {
        const res = await scadaApi.get('/barrera/salida')
        const { data } = res
        this.barreraSalida = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async changeBarreraSalida(toggle) {
      console.log("🚀 ~ file: dashboardStore.js:115 ~ changeBarreraSalida ~ toggle:", toggle)
      try {
        const dataForm = {
          estado: toggle
        }
        const res = await scadaApi.post('/barrera/salida', dataForm)
        const { data } = res
        this.barreraSalida = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para enviar la solicitud al preasignar tanque
     * 
     * @returns object 
     */
    async preAsignmentSt(tanque) {
      try {
        const obj = {
          tanque
        }
        const res = await scadaApi.post('/llenaderas/asignacion/preasignar', obj)
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },


    /**
     *  Función para enviar la solicitud al servicio  Aceptar
     * 
     * @returns object 
     */
    async acceptAssignmentSt(tanque) {
      try {
        const obj = {
          tanque
        }
        const res = await scadaApi.post('/llenaderas/asignacion/asignar', obj)
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    /**
     *  Función para enviar la solicitud al servicio  siguiente llenadera
     * 
     * @returns object 
     */
    async nextFillerSt() {
      try {
        const res = await scadaApi.post('/llenaderas/asignacion/siguiente')
        return res
      } catch (error) {
        return { ok: false, message: error }
      }
    },

    /**
     *  Función para enviar la solicitud al servicio reasignar asignación
     * 
     * @returns object 
     */
    async reassignAllocationSt() {
      try {
        const res = await scadaApi.post('/llenaderas/asignacion/reasignar')
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para cancelar la asignación
     * 
     * @returns object 
     */
    async cancelAllocationSt(){
      try {
        const res = await scadaApi.post('/llenaderas/asignacion/cancelar')
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para obtener la llenadera actual
     * 
     * @returns object 
     */
    async getCurrentFillerSt(){
      try {
        const res = await scadaApi.get('/llenaderas/disponible')
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },
    
    /**
     *  Función para liberar una llenadera
     * 
     * @returns Boolean 
    */
    async liberarLlenadera(llenadera) {
      try {
        const res = await scadaApi.post(`/llenaderas/liberar/${llenadera}`)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para desasignar una llenadera
     * 
     * @returns Boolean 
    */
    async desAsignarLlenadera(llenadera) {
      try {
        const res = await scadaApi.post(`/llenaderas/desasignar/${llenadera}`)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para cambiar el estado de una llenadera
     * 
     * @returns Boolean 
    */
    async setDespacho(estado) {
      try {
        const dataForm = {
          estado
        }
        const res = await scadaApi.post('/llenaderas/estado', dataForm)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    /**
     *  Función para verificar si ha entrado un tanque nuevo por transfonder
     * 
     * @returns EntryTank
    */

    async fetchEntryRadiofrecuency() {
      try {
        const res = await scadaApi.post('/tanques/entrada/radiofrecuencia')
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },
    
  },
})