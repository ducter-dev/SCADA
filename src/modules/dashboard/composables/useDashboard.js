import { useDashboardStore } from '../store/dashboardStore'

const useDashboard = () => {

  const store = useDashboardStore()
  
  const fetchAntenaEntrada = async () => {
    const res = await store.fetchAntenaEntrada()
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
    const resp = await store.fetchBarreraEntrada()
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

  const acceptAssignment = async () => {
    return await store.acceptAssignmentSt()
  }

  const nextFiller = async () => {
    return await store.nextFillerSt()
  }

  const reassignAllocation = async () => {
    return await store.reassignAllocationSt()
  }

  return {
    fetchAntenaEntrada,
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
    acceptAssignment,
    nextFiller,
    reassignAllocation,
  }
}

export default useDashboard