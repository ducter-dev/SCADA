import { useStore } from 'vuex'

const useUser = () => {
  
  const store = useStore()

  const agregarUsers = async () => {
    console.log('composable => agregarUsers')
    const resp = await store.dispatch('user/getUsers')
    return resp
  }

  const editarUser = async ( user ) => {
    console.log('composbale => editarUser')
    const resp = await store.dispatch('user/editUser', user)
    return resp
  }
  return {
    editarUser,
    agregarUsers,
  }
}

export default useUser