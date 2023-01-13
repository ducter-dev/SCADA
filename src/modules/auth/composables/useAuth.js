import { useStore } from 'vuex'

const useAuth = () => {

  const store = useStore()
  
  const signIn = async( user ) => {
    const resp = await store.dispatch('auth/loginUser', user)
    return resp
  }

  const createUser = async( user ) => {
    const resp = await store.dispatch('user/createUser', user)
    return resp
  }

  const getToken = () => {
    const token = store.state.auth.token
    return token
  }

  const getUserName = () => {
    const userName = store.state.auth.user ? store.state.auth.user.usuario : '' 
    return userName
  }

  const logout = async () => {
    const resp = await store.dispatch('auth/logoutUser')
    return resp
  }



  return {
    createUser,
    signIn,
    logout,
    getToken,
    getUserName,
  }

  
}

export default useAuth