import { useTanqueStore } from '../store/tanquesStore'

const useTanqueServicio = () => {
  const store = useTanqueStore()

  const fetchTanksInServicio = async (fecha) => {
    const resp = await store.fetchTanksInServicio(fecha)
    return resp
  }

  const fetchUltimaAsignacion = async () => {
    const resp = await store.fetchUltimaAsignacion()
    return resp
  }

  const getTanquesInServicio = () => {
    return store.tanquesInServicio
  }
  const getTanqueInServicioSel = () => {
    return store.tanqueInServicioSel
  }
  const getLastTankAsign = () => {
    return store.lastTankAsign
  }
  
  return {
    fetchTanksInServicio,
    fetchUltimaAsignacion,
    getTanquesInServicio,
    getTanqueInServicioSel,
    getLastTankAsign,
  } 
  
}

export default useTanqueServicio