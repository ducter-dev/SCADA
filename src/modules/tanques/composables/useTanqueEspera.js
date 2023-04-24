import { useTanqueStore } from '../store/tanquesStore'

const useTanqueEspera = () => {
  const store = useTanqueStore()

  const fetchTanksInEspera = async () => {
    const resp = await store.fetchTanksEspera()
    return resp
  }

  const fetchLastAssignment = async () => {
    const resp = await store.fetchLastAssignmentSt()
    return resp
  }

  const agregarTanqueEspera = async (tank) => {
    const resp = await store.agregarTanqueEspera(tank)
    return resp
  }

  const addEntryTank = async (tank) => {
    return await store.addEntryTankSt(tank)
  }

  const deleteTanqueEspera = async (tank) => {
    const resp = await store.borrarTanqueEspera(tank)
    return resp
  }

  const updateTankPosition = async (tank) => {
    return  await store.updateTankPosition(tank)
  }

  const getTanquesInEspera = () => {
    return store.tanquesInEspera
  }

  const getTanqueInEspereaSel = () => {
    return store.tanqueInEspereaSel
  }

  const getCountTanquesEspera = () => {
    return store.countTanquesEspera
  }
  const getLastAssignment = () =>{
    return store.lastTankAsign
  }

  const getFirstTank = () => {
    return store.firstTanqueInWaitingList
  }
  
  return {
    fetchTanksInEspera,
    fetchLastAssignment,
    agregarTanqueEspera,
    addEntryTank,
    deleteTanqueEspera,
    updateTankPosition,
    getTanquesInEspera,
    getTanqueInEspereaSel,
    getCountTanquesEspera,
    getLastAssignment,
    getFirstTank,
  }
}

export default useTanqueEspera