import { useTanqueStore } from '../store/tanquesStore'

const useTanqueEspera = () => {
  const store = useTanqueStore()

  const fetchTanksInEspera = async () => {
    const resp = await store.fetchTanksEspera()
    return resp
  }

  const agregarTanqueEspera = async (tank) => {
    const resp = await store.agregarTanqueEspera(tank)
    return resp
  }

  const deleteTanqueEspera = async (tank) => {
    const resp = await store.borrarTanqueEspera(tank)
    return resp
  }

  const getTanquesInEspera = () => {
    return store.tanquesInEspera
  }

  const getTanqueInEspereaSel = () => {
    return store.tanqueInEspereaSel
  }


  
  return {
    fetchTanksInEspera,
    agregarTanqueEspera,
    deleteTanqueEspera,
    getTanquesInEspera,
    getTanqueInEspereaSel,
  }
}

export default useTanqueEspera