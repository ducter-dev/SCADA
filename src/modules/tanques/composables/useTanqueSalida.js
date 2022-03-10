import { useStore } from 'vuex'

const useTanqueSalida = () => {
  const store = useStore()

  const getTanksSalidas = async () => {
    console.log('composable - getTanksSalidas')
    const resp = await store.dispatch('tanques/getTanksSalidas')
    return resp
  }

  const getUltimaSalida = async () => {
    console.log('composable - getUltimaSalida')
    const resp = await store.dispatch('tanques/getUltimaSalida')
    return resp
  }

  // editar tanque de salida

  return {
    getTanksSalidas,
    getUltimaSalida,
  }
}

export default useTanqueSalida