import { useDashboardStore } from '../store/dashboardStore'

const useDashboard = () => {

  const store = useDashboardStore()
  
  const fetchAntenaEntrada = async () => {
    const res = await store.fetchAntenaEntrada()
    return res
  }

  const fetchEntryRadiofrecuency = async () => {
    const res = await store.fetchEntryRadiofrecuency()
    return res
  }

  const fetchAntenaVerificacion = async () => {
    const res = await store.fetchAntenaVerificacion()
    return res
  }

  const fetchAntenaSalida = async () => {
    const res = await store.fetchAntenaSalida()
    return res
  }
  
  // Barrera de Entrada
  const fetchBarreraEntrada = async () => {
    const resp = await store.fetchBarreraEntrada()
    return resp
  }

  const changeBarreraEntrada = async (toggle) => {
    const resp = await store.changeBarreraEntrada(toggle)
    return resp
  }

  // Barrera de Verificación
  const fetchBarreraVerificacion = async () => {
    const resp = await store.fetchBarreraVerificacion()
    return resp
  }

  const changeBarreraVerificacion = async (toggle) => {
    const resp = await store.changeBarreraVerificacion(toggle)
    return resp
  }

  // Barrera de Verificación
  const fetchBarreraSalida = async () => {
    const resp = await store.fetchBarreraSalida()
    return resp
  }

  const changeBarreraSalida = async (toggle) => {
    const resp = await store.changeBarreraSalida(toggle)
    return resp
  }

  const getAntenaEntrada = () => {
    return store.antenaEntrada
  }

  const getAntenaVerificacion = () => {
    return store.antenaVerificacion
  }
  
  const getAntenaSalida = () => {
    return store.antenaSalida
  }

  const getBarreraEntrada = () => {
    return store.barreraEntrada
  }

  const getBarreraVerificacion = () => {
    return store.barreraVerificacion
  }

  const getBarreraSalida = () => {
    return store.barreraSalida
  }

  const preAsignment = async (tanque) => {
    return await store.preAsignmentSt(tanque)
  }

  const acceptAssignment = async (tanque) => {
    return await store.acceptAssignmentSt(tanque)
  }

  const nextFiller = async () => {
    return await store.nextFillerSt()
  }

  const reassignAllocation = async () => {
    return await store.reassignAllocationSt()
  }

  const cancelAllocation = async () => {
    return await store.cancelAllocationSt()
  }

  const getCurrentFiller = async () => {
    return await store.getCurrentFillerSt()
  }

  const liberarLlenadera = async (llenadera) => {
    return await store.liberarLlenadera(llenadera)
  } 

  const desAsignarLlenadera = async (llenadera) => {
    return await store.desAsignarLlenadera(llenadera)
  }

  const setDespachoLlenadera = async (estado) => {
    return await store.setDespacho(estado)
  }

  return {
    fetchAntenaEntrada,
    fetchEntryRadiofrecuency,
    fetchAntenaVerificacion,
    fetchAntenaSalida,
    fetchBarreraEntrada,
    fetchBarreraVerificacion,
    fetchBarreraSalida,
    changeBarreraEntrada,
    changeBarreraVerificacion,
    changeBarreraSalida,
    getAntenaEntrada,
    getAntenaVerificacion,
    getAntenaSalida,
    getBarreraEntrada,
    getBarreraVerificacion,
    getBarreraSalida,
    preAsignment,
    acceptAssignment,
    nextFiller,
    reassignAllocation,
    cancelAllocation,
    getCurrentFiller,
    liberarLlenadera,
    desAsignarLlenadera,
    setDespachoLlenadera,
  }
}

export default useDashboard