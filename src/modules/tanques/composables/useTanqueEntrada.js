import { useTanqueStore } from '../store/tanquesStore'

const useTanqueEntrada = () => {
  const store = useTanqueStore()
  
  const fetchUltimaEntrada = async () => {
    const resp = await store.fetchUltimaEntrada()
    return resp
  }

  const getLastTankEntry = () => {
    return store.lastTankEntry  }

  return {
    fetchUltimaEntrada,
    getLastTankEntry,
  }

}

export default useTanqueEntrada