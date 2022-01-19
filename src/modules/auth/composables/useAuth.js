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

  return {
    createUser,
    signIn,
  }

  
}

export default useAuth