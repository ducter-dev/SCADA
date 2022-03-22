import { useStore } from 'vuex'

const useTanqueEspera = () => {
  const store = useStore()

  const getTanksEspera = async () => {
    console.log('composable - getTanksEspera')
    const resp = await store.dispatch('tanques/getTanksEspera')
    return resp
  }

  // editar tanque en espera
  return {
    getTanksEspera,
  }
}

export default useTanqueEspera