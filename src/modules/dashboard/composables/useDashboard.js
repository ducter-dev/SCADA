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

  return {
    getAntenaEntrada,
    getAntenaVerificacion,
  }
}

export default useDashboard