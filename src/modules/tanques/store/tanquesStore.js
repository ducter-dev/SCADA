import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useTanqueStore = defineStore('tanques', {
  id: 'tanques',
  state: () => ({
    tanques: [],
    tanquesPaginate: [],
    tanqueSelect: {},
    tanquesInEntrada: [],
    tanquesInEntradaSel: [],
    lastTankEntry: {},
    tanquesInEspera: [],
    tanqueInEspereaSel: {},
    tanquesInServicio: [],
    tanksEntries: [],
    tanqueInServicioSel: {},
    lastTankAsign: {},
    tanquesInSalida: [],
    lastTankExit: {},
    llenaderas: [],
    llenaderasLibres: [],
    llenaderasEstado: { estado: 1 },
    llenaderaAceptaAsignacion: 0,
  }),
  getters: {
    currentTanqueInEspera(state) { return state.tanqueInEspereaSel },
    currentTanqueSel(state) { return state.tanqueSelect },
    countTanquesEspera(state) { return state.tanquesInEspera.length + 1 },
    llenaderasFiltradas(state) {
      return state.llenaderas.length > 1 ? state.llenaderas.filter(llen => llen.estado == 1) : []
    },
    firstTanqueInWaitingList(state) { return state.tanquesInEspera[0] },
  },
  actions: {
    // ------ Tanques ------
    async fetchTanks(params) {
      try {
        const { page, size } = params
        const { data, status } = await scadaApi.get(`/tanques?page=${page}&size=${size}`)
        console.log("🚀 ~ file: tanquesStore.js:41 ~ fetchTanks ~ data:", data)
        this.tanquesPaginate = data.items
        const pagination = {
          links: data.links,
          page: data.page,
          pages: data.pages,
          size: data.size,
          total: data.total
        }
        console.log("🚀 ~ file: tanquesStore.js:49 ~ fetchTanks ~ pagination:", pagination)
        const obj = {
          ok: true, data: this.tanquesPaginate, status, paginacion: pagination
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchTanksAll() {
      try {
        const { data, status } = await scadaApi.get(`/tanques/all`)
        this.tanques = data
        const obj = {
          ok: true, data: this.tanques, status
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchTanksFilter(query) {
      try {
        const { data, status } = await scadaApi.get(`/tanques/search?atName=${query}`)
        this.tanquesPaginate = data.items
        const pagination = {
          links: data.links,
          page: data.page,
          pages: data.pages,
          size: data.size,
          total: data.total
        }
        const obj = {
          ok: true, data: this.tanquesPaginate, status, paginacion: pagination
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async editTank(tank) {
      try {
        const res = await scadaApi.put(`/tanques/${tank.id}`, tank)
        const { data, status } = res
        console.log("🚀 ~ file: tanquesStore.js:84 ~ editTank ~ data:", data)
        const { atId, atTipo, atName, conector, capacidad90, transportadora } = data
        const tanque = this.tanques.find(t => t.id == data.id)
        tanque.atId = atId
        tanque.atTipo = atTipo
        tanque.atName = atName
        tanque.conector = conector
        tanque.capacidad90 = capacidad90
        tanque.transportadora = transportadora
        this.tanqueSelect = {}
        const obj = {
          ok: true, data, status
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async registerTank(tank) {
      try {
        const res = await scadaApi.post('tanques', tank)
        const { data, status } = res
        this.tanques.push(data)
        const obj = {
          ok: true, data, status
        }
        return obj
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async eliminarTank(tank) {
      try {
        const res = await scadaApi.delete(`/tanques/${tank.id}`, tank.id)
        const { data } = res
        const tanques = this.tanques.filter(t => t.id != data.id)
        this.tanques = []
        this.tanques = tanques
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    selectTank(tank) {
      this.tanqueSelect = tank
    },

    // ------ Tanques Entradas ------
    async fetchUltimaEntrada() {
      try {
        const res = await scadaApi.get('/tanques/entrada/ultima')
        const { data } = res
        this.lastTankEntry = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Tanques Espera ------
    async fetchTanksEspera() {
      try {
        const res = await scadaApi.get('tanques/espera')
        const { data } = res
        this.tanquesInEspera = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Tanques Espera mover elemento de la lista de espera ------
    async updateTankPosition(item) {
      try {
        const res = await scadaApi.post('tanques/espera/mover-inicio',item)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async agregarTanqueEspera(tank) {
      try {
        const res = await scadaApi.post('tanques/espera', tank)
        const { data } = res
        this.tanquesInEspera.push(data)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async addEntryTankSt(tank) {
      try {
        const res = await scadaApi.post('tanques/entrada', tank)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async updateTanqueEspera(tank) {
      try {
        console.log("🚀 ~ file: tanquesStore.js:150 ~ updateTanqueEspera ~ tank:", tank)
        const res = await scadaApi.put(`tanques/espera/${tank.id}`, tank)
        console.log("🚀 ~ file: tanquesStore.js:152 ~ updateTanqueEspera ~ res:", res)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async borrarTanqueEspera(tank) {
      try {
        const res = await scadaApi.delete(`tanques/espera/${tank.id}`)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    resetListaTanquesEspera() {
      this.tanquesInEspera = []
    },

    async calTankSt(tanque) {
      try {
        const res = await scadaApi.post('/tanques/espera/llamar', tanque)
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async alarmTanksSt() {
      try {
        const res = await scadaApi.post('/tanques/alarmar')
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Tanques de Entradas ------
    async fetchEntriesTanksSt(date) {
      try {
        const res = await scadaApi.get(`tanques/entrada/fecha/${date}`)
        const { data } = res
        this.tanksEntries = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Tanques de Servicio ------
    async fetchTanksInServicio(fecha) {
      try {
        const res = await scadaApi.get(`tanques/servicio/fecha/${fecha}`)
        const { data } = res
        this.tanquesInServicio = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchLastAssignmentSt() {
      try {
        const res = await scadaApi.get('tanques/servicio/ultimo')
        const { data } = res
        this.lastTankAsign = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Tanques de Salidas ------
    async fetchTanksSalidas(fecha, limit) {
      try {
        const res = await scadaApi.get(`/tanques/salida/fecha/${fecha}/limit/${limit}`)
        const { data } = res
        this.tanquesInSalida = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchUltimaSalida() {
      try {
        const res = await scadaApi.get('tanques/salida/ultima')
        const { data } = res
        this.lastTankExit = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // ------ Llenaderas ------
    async fetchLlenaderas() {
      try {
        const res = await scadaApi.get('llenaderas')
        const { data } = res
        this.llenaderas = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchEstadoLlenadera() {
      try {
        const res = await scadaApi.get('llenaderas/estado')
        const { data } = res
        this.llenaderasEstado = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async fetchLlenaderasLibres() {
      try {
        const res = await scadaApi.get('llenaderas/libres')
        const { data } = res
        this.llenaderasLibres = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async desasignLlenadera(llenadera) {
      try {
        const res = await scadaApi.post(`llenaderas/desasignar/${llenadera}`)
        const { data } = res
        this.llenaderasLibres = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async asignarLlenadera(form) {
      try {
        const res = await scadaApi.post('llenaderas/asignacion/aceptar', form)
        const { data } = res
        this.llenaderas.map(llen => {
          if (llen.numero == data.numero) {
            llen.estado = 0
            console.log(`Llenadera: ${llen.numero}, estado: ${llen.estado == 1 ? 'Libre' : 'Ocupada'}`)
          }
        })
        this.llenaderaAceptaAsignacion = 0
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    // Despacho Llenaderas
    async fetchDespacho(estado) {
      try {
        const res = await scadaApi.get('/llenaderas/estado', estado)
        const { data } = res
        this.llenaderasEstado = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async changeEstadoLlenadera(estado) {
      try {
        const dataForm = {
          estado
        }
        const res = await scadaApi.post('/llenaderas/estado', dataForm)
        console.log(res)
        const { data } = res
        this.llenaderasEstado = data
        return res
      } catch (error) {
        if(error.response){
          return { ok: false, message: error.response.data.message }
        }else{
          return { ok: false, message: error }
        }
      }
    },

    async changeTankPositionSt(formPosition) {
      try {
        console.log("🚀 ~ file: tanquesStore.js:354 ~ changeTankPositionSt ~ formPosition:", formPosition)
        const res = await scadaApi.post('/tanques/espera/mover-posicion', formPosition)
        console.log(res)
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