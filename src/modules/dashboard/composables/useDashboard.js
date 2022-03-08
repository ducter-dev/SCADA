import { useStore } from "vuex"

const useDashboard = () => {
  const store = useStore()

  const getAntenaEntrada = async () => {
    console.log('composable - getAntenaEntrada')
    const resp = await store.dispatch('dashboard/getAntenaEntrada')
    return resp
  }

  const getAntenaVerificacion = async () => {
    console.log('composable - getAntenaVerificacion')
    const resp = await store.dispatch('dashboard/getAntenaVerificacion')
    return resp
  }

  const getAntenaSalida = async () => {
    console.log('composable - getAntenaSalida')
    const resp = await store.dispatch('dashboard/getAntenaSalida')
    return resp
  }

  return {
    getAntenaEntrada,
    getAntenaVerificacion,
    getAntenaSalida,
  }
}

export default useDashboard