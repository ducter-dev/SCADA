import { useStore } from 'vuex'

const useTanque = () => {
  const store = useStore()

  const agregarTanques = async () => {
    console.log('composable => agregarTanques')
    const resp = await store.dispatch('tanques/getTanks')
    return resp
  }

  // editar tanque en espera
  return {
    agregarTanques,
  }
}

export default useTanque