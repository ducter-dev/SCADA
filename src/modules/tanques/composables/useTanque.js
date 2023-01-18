import { useTanqueStore } from '../store/tanquesStore'

const useTanque = () => {
  const store = useTanqueStore()

  const fetchTanques = async () => {
    const resp = await store.fetchTanks()
    console.log("🚀 ~ file: useTanque.js:8 ~ fetchTanques ~ resp", resp)
    return resp
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

  return {
    fetchTanques,
    editarTanque,
    registrarTanque,
    eliminarTanque,
    getTanques,
    getTanqueSelect,
    getTanquesInEntrada,
    getTanquesInEntradaSel,
    getLastTankEntry,
    setSelectTank,
  }
}

export default useTanque