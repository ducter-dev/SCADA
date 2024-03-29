import { useTanqueStore } from '../store/tanquesStore'

const useTanqueSalida = () => {
  const store = useTanqueStore()

  const fetchTanksSalidas = async (fecha, limit = 0) => {
    const resp = await store.fetchTanksSalidas(fecha, limit)
    return resp
  }

  const fetchUltimaSalida = async () => {
    const resp = await store.fetchUltimaSalida()
    return resp
  }

  const getTanquesInSalida = () => {
    return store.tanquesInSalida
  }
  const getLastTankExit = () => {
    return store.lastTankExit
  }
  // editar tanque de salida

  return {
    fetchTanksSalidas,
    fetchUltimaSalida,
    getTanquesInSalida,
    getLastTankExit,
  }
}

export default useTanqueSalida