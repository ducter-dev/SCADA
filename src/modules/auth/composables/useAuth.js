import { useStore } from 'vuex'

const useAuth = () => {

  const store = useStore()
  
  const createUser = async( user ) => {
    console.log(user)
    const resp = await store.dispatch('action', user)
    return resp
  }
  return {
    createUser
  }
}

export default useAuth