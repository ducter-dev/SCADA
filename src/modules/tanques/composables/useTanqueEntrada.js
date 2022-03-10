import { useStore } from 'vuex'

const useTanqueEntrada = () => {
  const store = useStore()
  
  const getUltimaEntrada = async () => {
    console.log('composable - getUltimaEntrada')
    const resp = await store.dispatch('tanques/getUltimaEntrada')
    return resp
  }

  return {
    getUltimaEntrada,
  }

}

export default useTanqueEntrada