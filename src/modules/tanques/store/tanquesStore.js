import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useTanqueStore = defineStore('tanques', {
  id: 'tanques',
  state: () => ({
    tanques: [],
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
  },
  actions: {
    // ------ Tanques ------
    async fetchTanks() {
      try {
        const res = await scadaApi.get('/tanques')
        const { data } = res
        this.tanques = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async editTank(tank) {
      try {
        const res = await scadaApi.put(`/tanques/${tank.id}`, tank)
        const { data } = res
        const { atId, atTipo, atName, conector, capacidad90, transportadora } = data
        const tanque = this.tanques.find(t => t.id == data.id)
        tanque.atId = atId
        tanque.atTipo = atTipo
        tanque.atName = atName
        tanque.conector = conector
        tanque.capacidad90 = capacidad90
        tanque.transportadora = transportadora
        this.tanqueSelect = {}
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async registerTank(tank) {
      try {
        const res = await scadaApi.post('tanques', tank)
        const { data } = res
        this.tanques.push(data)
        return res
      } catch (error) {
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
      }
    },

    // ------ Tanques Espera mover elemento de la lista de espera ------
    async updateTankPosition(item) {
      try {
        const res = await scadaApi.post('tanques/espera/mover-inicio',item)
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async agregarTanqueEspera(tank) {
      try {
        const res = await scadaApi.post('tanques/espera', tank)
        const { data } = res
        this.tanquesInEspera.push(data)
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async borrarTanqueEspera(tank) {
      try {
        const res = await scadaApi.delete(`tanques/espera/${tank.id}`)
        const { data } = res
        const tanques = this.tanquesInEspera.filter(t => t.id !== data.id)
        this.tanquesInEspera = []
        this.tanquesInEspera = tanques
        return res
      } catch (error) {
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
      }
    },

    async fetchUltimaAsignacion() {
      try {
        const res = await scadaApi.get('tanques/servicio/ultimo')
        const { data } = res
        this.lastTankAsign = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    // ------ Tanques de Salidas ------
    async fetchTanksSalidas() {
      try {
        const res = await scadaApi.get('/tanques/salida')
        console.log("🚀 ~ file: tanquesStore.js:152 ~ fetchTanksSalidas ~ res", res)
        const { data } = res
        this.tanquesInSalida = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async fetchUltimaSalida() {
      try {
        const res = await scadaApi.get('tanques/salida/ultima')
        const { data } = res
        this.lastTankExit = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
      }
    },

    async fetchEstadoLlenadera() {
      try {
        const res = await scadaApi.get('llenaderas/estado')
        const { data } = res
        this.llenaderasEstado = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async fetchLlenaderasLibres() {
      try {
        const res = await scadaApi.get('llenaderas/libres')
        const { data } = res
        this.llenaderasLibres = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
      }
    },

    async desasignLlenadera(llenadera) {
      try {
        const res = await scadaApi.post(`llenaderas/desasignar/${llenadera}`)
        const { data } = res
        this.llenaderasLibres = data
        return res
      } catch (error) {
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
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
        return { ok: false, message: error.message }
      }
    },
  },

})