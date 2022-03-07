import { useStore } from 'vuex'

const useTanque = () => {
  const store = useStore()

  const agregarTanques = async () => {
    console.log('composable => agregarTanques')
    const resp = await store.dispatch('tanques/getTanks')
    return resp
  }

  const editarTanque = async ( tanque ) => {
    console.log('composbale => editarTanque')
    const resp = await store.dispatch('tanques/editTank', tanque)
    return resp
  }

  const registrarTanque = async ( tanque ) => {
    console.log('composable => registrarTanque')
    const resp = await store.dispatch('tanques/registerTank', tanque)
    return resp
  }

  return {
    agregarTanques,
    editarTanque,
    registrarTanque,
  }
}

export default useTanque