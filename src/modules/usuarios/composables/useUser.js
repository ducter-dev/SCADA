import { useUsuarioStore } from '../store/usuarioStore'

const useUsuario = () => {
  const store = useUsuarioStore()
  
  const fetchUsuarios = async(params) => {
    const resp = await store.fetch(params)
    return resp
  }

  const fetchUsersFilter = async (query) => {
    const resp = await store.fetchUsersFilter(query)
    return resp
  }

  const insertUsuario = async(usuario) => {
    const resp = await store.insert(usuario)
    return resp
  }

  const updateUsuario = async(usuario) => {
    const resp = await store.update(usuario)
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
    store.selectUser(usuario)
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