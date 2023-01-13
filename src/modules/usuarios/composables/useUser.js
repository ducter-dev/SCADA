import { useUsuarioStore } from '../store/usuarioStore'

const useUsuario = () => {
  const store = useUsuarioStore()
  
  const fetchUsuarios = async() => {
    const resp = await store.get()
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
  }
}

export default useUsuario