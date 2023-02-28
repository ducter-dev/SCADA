import { defineStore } from 'pinia'
import scadaApi from '@/api'

export const useLoginStore = defineStore('login', {
  id: 'login',
  state: () => ({
    status: null,
    user: null,
    token: null,
  }),
  getters: {
    isAuth: (state) => state.user !== null
  },
  actions: {
    async login(user) {
      try {
        const { usuario, password } = user
        const dataForm = {
          username: usuario,
          password
        }
        const { data, status } = await scadaApi.post('/auth/login', dataForm )
        const { token } = data
        delete user.password
        this.user = data.user
        this.token = token
        this.status = 'authenticated'
        localStorage.setItem('token', token)
        const obj = {
          ok: true, detail: data.user, status: 'authenticated'
        }
        return obj
      } catch (error) {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          if (error.response.status == 422) {
            // Si existe validación del lado del servidor aplicar llenado de errores aquí
          } else {
            // Si existe error manda un toast
            const obj = {
              ok: false, detail:`Vaya, algo salió mal en nuestros servidores. <br> Código de error: <strong>${error.response.status}</strong>`, status: error.response.status 
            }
            return obj
          }
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          const obj = {
            ok: false, detail: "Conexión rechazada con nuestros servidores. <br> Código de error: <strong>0</strong>", status: error.request.status 
          }
          return obj
        } else {
          const obj = {
            ok: false, detail:"Ha ocurrido un error inesperado, por favor vuelve a intentarlo.", status: "00" 
          }
          return obj
        }
      }
    },

    async logout () {
      localStorage.setItem('token', '')
      this.token = null
      this.user = null
      this.status = 'No authenticated'
    }
  },

})