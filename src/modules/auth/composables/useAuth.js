import { useLoginStore } from '../store/login'

const useAuth = () => {

  const store = useLoginStore()
  
  const login = async( formUser ) => {
    const resp = await store.login(formUser)
    return resp
  }

  const logout = () => {
    const resp = store.logout()
    return resp
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

  return {
    login,
    logout,
    getToken,
    getUserName,
    setlocked
  }
}

export default useAuth