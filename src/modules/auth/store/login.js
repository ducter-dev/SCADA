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
        console.log("🚀 ~ file: login.js:18 ~ login ~ user", user)
        const dataForm = {
          username: usuario,
          password
        }
        const { data, status } = await scadaApi.post('/auth/login', dataForm )
        console.log("🚀 ~ file: login.js:24 ~ login ~ data", data)
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
        console.log("🚀 ~ file: login.js:36 ~ login ~ error", error)
        const obj = {
          ok: false, detail: error.response.data, status: error.response.status 
        }
        return obj
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