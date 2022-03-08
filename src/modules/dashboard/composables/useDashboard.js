import { useStore } from "vuex"

const useDashboard = () => {
  const store = useStore()

  const getAntenaEntrada = async () => {
    console.log('composable - getAntenaEntrada')
    const resp = await store.dispatch('dashboard/getAntenaEntrada')
    return resp
  }

  return {
    getAntenaEntrada,
  }
}

export default useDashboard