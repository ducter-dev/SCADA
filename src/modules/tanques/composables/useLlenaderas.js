import { useStore } from 'vuex'

const useLlenaderas = () => {
  const store = useStore()

  // ----- Llenaderas -----

  const getLlenaderas = async () => {
    console.log('composable => getLlenaderas')
    const resp = await store.dispatch('tanques/getLlenaderas')
    return resp
  }

  const getLlenaderasLibres = async () => {
    console.log('composable => getLlenaderasLibres')
    const resp = await store.dispatch('tanques/getLlenaderasLibres')
    return resp
  }

  const resetLlenadera = async (llenadera) => {
    console.log('composable => closeLlenadera')
    const resp = await store.dispatch('tanques/desasignLlenadera', llenadera)
    return resp
  }

  // Despacho

  const getEstadoLlenadera = async () => {
    console.log('composable - getEstadoLlenadera')
    const resp = await store.dispatch('tanques/getEstadoLlenadera', toggle)
    return resp
  }

  const changeEstadoLlenadera = async (toggle) => {
    console.log('composable - changeEstadoLlenadera')
    const resp = await store.dispatch('tanques/changeEstadoLlenadera', toggle)
    return resp
  }

  return {
    getLlenaderas,
    getLlenaderasLibres,
    resetLlenadera,
    getEstadoLlenadera,
    changeEstadoLlenadera,
  }
}

export default useLlenaderas