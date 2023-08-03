import { useTanqueStore } from '../store/tanquesStore'

const useTanque = () => {
  const store = useTanqueStore()

  const fetchTanques = async (params) => {
    const resp = await store.fetchTanks(params)
    return resp
  }
  
  const fetchTanquesAll = async () => {
    const resp = await store.fetchTanksAll()
    return resp
  }
  
  const fetchEntriesTanks = async (date) => {
    const resp = await store.fetchEntriesTanksSt(date)
    return resp
  }

  const getTanksEntries = () => {
    return store.tanksEntries
  }

  const editarTanque = async ( tanque ) => {
    const resp = await store.editTank(tanque)
    return resp
  }

  const registrarTanque = async ( tanque ) => {
    const resp = await store.registerTank(tanque)
    return resp
  }

  const eliminarTanque = async ( tanque ) => {
    const resp = await store.eliminarTank(tanque)
    return resp
  }

  const setSelectTank = (tank) => {
    store.selectTank(tank)
  }

  const getTanques = () => {
    return store.tanques
  }
  const getTanqueSelect = () => {
    return store.tanqueSelect
  }
  const getTanquesInEntrada = () => {
    return store.tanquesInEntrada
  }
  const getTanquesInEntradaSel = () => {
    return store.tanquesInEntradaSel
  }
  const getLastTankEntry = () => {
    return store.lastTankEntry
  }

  const getLlenaderas = () => {
    return store.llenaderas
  }

  return {
    fetchTanques,
    fetchTanquesAll,
    editarTanque,
    registrarTanque,
    eliminarTanque,
    getTanques,
    getTanqueSelect,
    getTanquesInEntrada,
    getTanquesInEntradaSel,
    getLastTankEntry,
    setSelectTank,
    getTanksEntries,
    fetchEntriesTanks,
    getLlenaderas,
  }
}

export default useTanque