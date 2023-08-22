import { useUsuarioStore } from '../store/usuarioStore'

const useUsuario = () => {
  const store = useUsuarioStore()
  
  const fetchUsuarios = async(params) => {
    console.log('3')
    const resp = await store.fetch(params)
    return resp
  }

  const fetchUsersFilter = async (query) => {
    const resp = await store.fetchUsersFilter(query)
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

  const setSelectedUsuario = (usuario) => {
    store.select(usuario)
  }

  const getSelectedUsuario = () => {
    return store.usuarioSelected
  }

  return {
    fetchUsuarios,
    fetchUsersFilter,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    setSelectedUsuario,
    getSelectedUsuario,
    getUsuarios,
  }
}

export default useUsuario