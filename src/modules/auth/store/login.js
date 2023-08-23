import { defineStore } from 'pinia'
import scadaApi from '@/api'
import { format } from 'date-fns'

export const useLoginStore = defineStore('login', {
  id: 'login',
  state: () => ({
    status: null,
    user: JSON.parse(localStorage.getItem('user')),
    token: null,
    id_caducado: 0,
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
        const { bloqueado } = await this.islocked({usuario})
        delete user.password
        this.user = data.user
        this.token = token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(this.user))
        if(!bloqueado){
          this.status = status == 200 ? 'authenticated' : null
          localStorage.setItem('token', token)
        }
        const obj = {
          ok: true, data: data.user, message: 'Login correcto.', status
        }
        return obj
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            this.id_caducado = error.response.data.data
          }
          const obj = {
            ok: false, message: error.response.data.message, status: error.response.status 
          }
          return obj
          
        } else if (error.request) {
          const obj = {
            ok: false, message: "Conexión rechazada con nuestros servidores. <br> Código de error: <strong>0</strong>", status: error.request.status 
          }
          return obj
        } else {
          const obj = {
            ok: false, message:"Ha ocurrido un error inesperado, por favor vuelve a intentarlo.", status: "00" 
          }
          return obj
        }
      }
    },

    async logout () {
      localStorage.setItem('token', '')
      localStorage.setItem('user', '')
      this.token = null
      this.user = null
      this.status = 'No authenticated'
    },

    async islocked (user){
      const { usuario} = user
        const dataForm = {
          usuario,
        }
      try{
        const { data, status } = await scadaApi.post('/auth/bloqueados/user', dataForm )
        return data
      }catch(error){
        return {bloqueado:true}
      }
    },

    async locked(usuario) {
      const dataForm = {
        user:usuario
      }
      try {
        const { data } = await scadaApi.post('/auth/bloqueados', dataForm )
        return { detail: data.fechaDesbloqueo}
      } catch (error) {
        const obj = {
          detail:error.response.data.message
        }
        return obj
      }
    },
    
    async recoveryPassword(email) {
      const form = {
        email
      }
      try {
        const { data, status } = await scadaApi.post('/auth/recuperar-password', form )
        const obj = {
          ok: true, data: data, status
        }
        
        return obj
      } catch (error) {

        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          if (error.response.status == 419) {
            // Si existe validación del lado del servidor aplicar llenado de errores aquí
            const obj = {
              ok: false, data:error.response.data.message, status: error.response.status 
            }
            return obj
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

    async updatePassword(form) {
      console.log("🚀 ~ file: login.js:146 ~ updatePassword ~ form:", form)
      try {
        const { data, status } = await scadaApi.post('/auth/update-password', form )
        console.log("🚀 ~ file: login.js:149 ~ updatePassword ~ data:", data)
        const obj = {
          ok: true, data: data, status
        }
        
        return obj
      } catch (error) {

        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          if (error.response) {
            // Si existe validación del lado del servidor aplicar llenado de errores aquí
            const obj = {
              ok: false, data:error.response.data.message, status: error.response.status 
            }
            return obj
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
  }
})