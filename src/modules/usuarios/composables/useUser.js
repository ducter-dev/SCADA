import { useStore } from 'vuex'

const useUser = () => {
  const store = useStore()

  const editarUser = async ( user ) => {
    const resp = await store.dispatch('editUser', user)
    return resp
  }
  return {
    editarUser
  }
}

export default useUser