import { useStore } from 'vuex'

const useTanqueEspera = () => {
  const store = useStore()

  const agregarTanqueEspera = async (tank) => {
    console.log('composable => agregarTanqueEspera')
    const resp = await store.dispatch('tanques/addTankWaitingList', tank)
    return resp
  }

  // editar tanque en espera
  return {
    agregarTanqueEspera,
  }
}

export default useTanqueEspera