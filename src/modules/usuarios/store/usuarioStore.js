import { defineStore, storeToRefs } from 'pinia'
import scada from '@/api'

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
        const res = await scada.get('/users')
        const { data } = res
        this.usuarios = data
        return res
      } catch (error) {
        return { ok: false, data: error.message}
      }
    },

    async insert(usuario) {
      const res = await scada.post('/auth/register', usuario)
      const { data } = res
      this.usuarios.push(data)
      console.log("🚀 ~ file: usuarioStore.js:25 ~ insert ~ res:", res)
      return res
    },

    async update(user) {
      try {
        console.log("🚀 ~ file: usuarioStore.js:32 ~ update ~ user:", user)
        const res = await scada.put(`/users/${user.id}`, user )
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
      const { data } = await scada.delete(`/users/${usuario.id}`)
      this.usuarios = this.usuarios.filter(user => user.id != usuario.id)
      return res
    },

    select(usuario) {
      this.usuarioSelected = usuario
    }
  }
})