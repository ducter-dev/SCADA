import { useLoginStore } from '../store/login'

const useAuth = () => {

  const store = useLoginStore()
  
  const login = async( formUser ) => {
    console.log("🚀 ~ file: useAuth.js:8 ~ login ~ formUser", formUser)
    const resp = await store.login(formUser)
    return resp
  }

  const logout = async () => {
    const resp = await store.logout()
    return resp
  }

  const getToken = () => {
    const token = store.token
    return token
  }

  const getUserName = () => {
    const userName = store.user ? store.user : '' 
    return userName
  }


  return {
    login,
    logout,
    getToken,
    getUserName,
  }

  
}

export default useAuth