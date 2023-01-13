import { defineStore, storeToRefs } from 'pinia'
import scada from '@/'

export const useUsuarioStore = defineStore('usuario', {
  id: 'usuario',
  state: () => ({
    usuarios: [],
    usuarioSelected: {},
  }),
  getters: {},
  actions: {
    async get () {
      try {
        const res = await scada.get('/users')
        const { data } = res
        this.usuarios = data
        const obj = {
          ok: true, data: this.usuarios
        }
        return obj
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
      const obj = {
        ok: true, data: user
      }
      return obj
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

        usuario.username = userUpdate.username
        usuario.categoria = userUpdate.categoria
        usuario.departamento = userUpdate.departamento
        this.usuarioSelected = {}
        const obj = {
          ok: true, data: res
        }
        return obj
        
      } catch (error) {
        return { ok: false, message: error.message}
      }
    },

    async delete(usuario) {
      const { data } = await scada.delete(`/users/${usuario.id}`)
      this.usuarios = this.usuarios.filter(user => user.id != usuario.id)
      const obj = {
        ok: true, data: data.data
      }
      return obj
    },

    select(usuario) {
      this.usuarioSelected = usuario
    }
  }
})