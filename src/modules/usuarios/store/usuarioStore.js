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
      const userForm = {
        ...usuario,
        estado: 1
      }
      const { data } = await scada.post('/auth/register', userForm)
      const user = data
      this.usuarios.push(user)
      return res
    },

    async update(user) {
      try {
        const { usuario, categoria, departamento } = user
        const dataForm = {
          username: usuario,
          categoria,
          departamento
        }
        const res = await scadaApi.put(`/users/${user.id}`, dataForm )
        console.log(res)
        const { data } = res
        const userUpdate = data
        console.log(userUpdate)
        const usuarioStore = state.users.find( u => u.id == userUpdate.id)

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