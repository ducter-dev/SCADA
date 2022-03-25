import { useStore } from 'vuex'

const useTanqueEspera = () => {
  const store = useStore()

  const getTanksEspera = async () => {
    console.log('composable - getTanksEspera')
    const resp = await store.dispatch('tanques/getTanksEspera')
    return resp
  }

  const agregarTanqueEspera = async (tank) => {
    console.log('composable - agregarTanqueEspera')
    const resp = await store.dispatch('tanques/agregarTanqueEspera', tank)
    return resp
  }

  // editar tanque en espera
  return {
    getTanksEspera,
    agregarTanqueEspera,
  }
}

export default useTanqueEspera