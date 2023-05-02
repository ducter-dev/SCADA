import { useUsuarioStore } from '../store/usuarioStore'

const useUsuario = () => {
  const store = useUsuarioStore()
  
  const fetchUsuarios = async() => {
    const resp = await store.fetch()
    return resp
  }

  const insertUsuario = async(usuario) => {
    const resp = await store.insert(usuario)
    console.log("🚀 ~ file: useUser.js:13 ~ insertUsuario ~ resp:", resp)
    return resp
  }

  const updateUsuario = async(usuario) => {
    console.log("🚀 ~ file: useUser.js:18 ~ updateUsuario ~ usuario:", usuario)
    const resp = await store.update(usuario)
    console.log("🚀 ~ file: useUser.js:20 ~ updateUsuario ~ resp:", resp)
    return resp
  }

  const deleteUsuario = async(usuario) => {
    const resp = await store.delete(usuario)
    return resp
  }

  const getUsuarios = () => {
    return store.usuarios
  }

  const selectUsuario = (usuario) => {
    store.select(usuario)
  }

  const getSelectedUsuario = () => {
    return store.usuarioSelected
  }

  return {
    fetchUsuarios,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectUsuario,
    getSelectedUsuario,
    getUsuarios,
  }
}

export default useUsuario