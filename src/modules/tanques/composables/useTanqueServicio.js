import { useStore } from 'vuex'

const useTanqueServicio = () => {
  const store = useStore()

  const getTanksInServicio = async (fecha) => {
    console.log(`Fecha: ${fecha}`)
    console.log('composable - getTanksInServicio')
    const resp = await store.dispatch('tanques/getTanksInServicio', fecha)
    return resp
  }

  const getUltimaAsignacion = async () => {
    console.log('composable - getUltimaAsignacion')
    const resp = await store.dispatch('tanques/getUltimaAsignacion')
    return resp
  }

  return {
    getTanksInServicio,
    getUltimaAsignacion,
  } 
  
}

export default useTanqueServicio