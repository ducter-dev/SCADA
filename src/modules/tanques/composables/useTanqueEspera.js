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

  const updateTanqueEspera = async (tank) => {
    console.log("🚀 ~ file: useTanqueEspera.js:26 ~ updateTanqueEspera ~ tank:", tank)
    const res = await store.updateTanqueEspera(tank)
    console.log("🚀 ~ file: useTanqueEspera.js:28 ~ updateTanqueEspera ~ res:", res)
    return res
  }

  const deleteTanqueEspera = async (tank) => {
    const resp = await store.borrarTanqueEspera(tank)
    return resp
  }

  const resetTanquesEspera = () => {
    store.resetListaTanquesEspera()
  }

  const updateTankPosition = async (tank) => {
    return  await store.updateTankPosition(tank)
  }

  const alarmTanks = async () => {
    const resp = await store.alarmTanksSt()
    return resp
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

  const callTank = async (tanque) => {
    return await store.calTankSt(tanque)
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
    resetTanquesEspera,
    callTank,
    updateTanqueEspera,
    alarmTanks,
  }
}

export default useTanqueEspera