import { useStore } from 'vuex'

const useTanqueServicio = () => {
  const store = useStore()

  const getUltimaAsignacion = async () => {
    console.log('composable - getUltimaAsignacion')
    const resp = await store.dispatch('tanques/getUltimaAsignacion')
    return resp
  }

  return {
    getUltimaAsignacion,
  } 
  
}

export default useTanqueServicio