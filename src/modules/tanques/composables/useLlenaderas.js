import { useStore } from 'vuex'

const useLlenaderas = () => {
  const store = useStore()

  // ----- Llenaderas -----

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

  return {
    getLlenaderasLibres,
    resetLlenadera,
  }

}

export default useLlenaderas