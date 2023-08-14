import { useLoginStore } from '../store/login'
import useBitacora  from '../../bitacora/composables'


const useAuth = () => {

  const store = useLoginStore()
  const { insertBitacora } = useBitacora()
  
  
  const login = async( formUser ) => {
    const resp = await store.login(formUser)
    return resp
  }

  const logout = async (bitacora) => {
    await insertBitacora(bitacora)
    store.logout()
    return true
  }

  const getToken = () => {
    const token = store.token
    return token
  }

  const getUserName = () => {
    const userName = store.user ? store.user.username : '' 
    return userName
  }
  const setlocked = async(usuario) =>{
    const resp = await store.locked(usuario)
    return resp
  }

  const getCurrentUser = () => {
    return store.user
  }

  const getLocalUser = () => {
    store.user = JSON.parse(localStorage.user)
    return store.user
  }

  const recoveryPassword = async (email) => {
    const res = await store.recoveryPassword(email)
    return res
  }

  const updatePassword = async (form) => {
    const res = await store.updatePassword(form)
    return res
  }

  const getIdCaducado = () => {
    return store.id_caducado
  }

  return {
    login,
    logout,
    getToken,
    getUserName,
    setlocked,
    getCurrentUser,
    getLocalUser,
    recoveryPassword,
    updatePassword,
    getIdCaducado,
  }
}

export default useAuth