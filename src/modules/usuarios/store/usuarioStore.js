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
    async fetch (params) {
      console.log('4')
      try {
        const { page, size } = params
        const { data, status } = await scadaApi.get(`/users?page=${page}&size=${size}`)
        console.log("🚀 ~ file: usuariosStore.js:41 ~ fetchTanks ~ data:", data)
        this.usuarios = data.items
        const pagination = {
          links: data.links,
          page: data.page,
          pages: data.pages,
          size: data.size,
          total: data.total
        }
        console.log("🚀 ~ file: usuarioStore.js:49 ~ fetch ~ pagination:", pagination)
        const obj = {
          ok: true, data: this.usuarios, status, paginacion: pagination
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

    async fetchUsersFilter(query) {
      try {
        const { data, status } = await scadaApi.get(`/users/search?name=${query}`)
        this.usuarios = data.items
        const pagination = {
          links: data.links,
          page: data.page,
          pages: data.pages,
          size: data.size,
          total: data.total
        }
        const obj = {
          ok: true, data: this.usuarios, status, paginacion: pagination
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
        const res = await scadaApi.put(`/users/${user.id}`, user )
        const { data } = res
        const userUpdate = data
        const usuarioStore = this.usuarios.find( u => u.id == userUpdate.id)
        usuarioStore.nombre = userUpdate.nombre
        usuarioStore.username = userUpdate.username
        usuarioStore.categoria = userUpdate.categoria
        usuarioStore.departamento = userUpdate.departamento
        usuarioStore.email = userUpdate.email
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

    selectUser(usuario) {
      this.usuarioSelected = usuario
    }
  }
})