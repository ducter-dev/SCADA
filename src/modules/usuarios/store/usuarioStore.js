import { defineStore, storeToRefs } from 'pinia'
import scadaApi from '@/api'

export const useUsuarioStore = defineStore('usuario', {
  id: 'usuario',
  state: () => ({
    usuarios: [],
    usuarioSelected: {},
  }),
  getters: {},
  actions: {
    async fetch () {
      try {
        const res = await scadaApi.get('/users')
        const { data } = res
        this.usuarios = data
        return res
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    async insert(usuario) {
      console.log("🚀 ~ file: usuarioStore.js:24 ~ insert ~ usuario:", usuario)
      const res = await scadaApi.post('/auth/register', usuario)
      const { data } = res
      this.usuarios.push(data)
      console.log("🚀 ~ file: usuarioStore.js:25 ~ insert ~ res:", res)
      return res
    },

    async update(user) {
      try {
        console.log("🚀 ~ file: usuarioStore.js:32 ~ update ~ user:", user)
        const res = await scadaApi.put(`/users/${user.id}`, user )
        console.log("🚀 ~ file: usuarioStore.js:36 ~ update ~ res:", res)
        const { data } = res
        const userUpdate = data
        console.log("🚀 ~ file: usuarioStore.js:38 ~ update ~ userUpdate:", userUpdate)
        console.log("🚀 ~ file: usuarioStore.js:39 ~ update ~ this.usuarios:", this.usuarios)
        const usuarioStore = this.usuarios.find( u => u.id == userUpdate.id)
        console.log("🚀 ~ file: usuarioStore.js:41 ~ update ~ usuarioStore:", usuarioStore)
        usuarioStore.username = userUpdate.username
        usuarioStore.categoria = userUpdate.categoria
        usuarioStore.departamento = userUpdate.departamento
        this.usuarioSelected = {}
        return res
        
      } catch (error) {
        return { ok: false, message: error.message}
      }
    },

    async delete(usuario) {
      try {
        const { data, status } = await scadaApi.delete(`/users/${usuario.id}`)
        this.usuarios = this.usuarios.filter(user => user.id != usuario.id)
        const user = data
        const obj = {
          ok: true, data: user, status
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

    select(usuario) {
      this.usuarioSelected = usuario
    }
  }
})