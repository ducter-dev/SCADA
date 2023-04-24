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
    console.log("🚀 ~ file: useAuth.js:17 ~ logout ~ bitacora:", bitacora)
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
  const setlocked = async(formUser) =>{
    const resp = await store.locked(formUser)
    return resp
  }

  const getCurrentUser = () => {
    return store.user
  }

  return {
    login,
    logout,
    getToken,
    getUserName,
    setlocked,
    getCurrentUser,
  }
}

export default useAuth