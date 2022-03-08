import { useStore } from 'vuex'

const useTanqueSalida = () => {
  const store = useStore()

  const getTanksSalidas = async () => {
    console.log('composable - getTanksSalidas')
    const resp = await store.dispatch('tanques/getTanksSalidas')
    return resp
  }

  // editar tanque de salida

  return {
    getTanksSalidas,
  }
}

export default useTanqueSalida