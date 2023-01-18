import { useTanqueStore } from '../store/tanquesStore'

const useLlenaderas = () => {
  const store = useTanqueStore()

  // ----- Llenaderas -----

  const fetchLlenaderas = async () => {
    const resp = await store.fetchLlenaderas()
    return resp
  }

  const fetchLlenaderasLibres = async () => {
    const resp = await store.fetchLlenaderasLibres()
    return resp
  }

  const resetLlenadera = async (llenadera) => {
    const resp = await store.desasignLlenadera(llenadera)
    return resp
  }

  // Despacho

  const fetchEstadoLlenadera = async () => {
    const resp = await store.fetchEstadoLlenadera()
    return resp
  }

  const changeEstadoLlenadera = async (toggle) => {
    const resp = await store.changeEstadoLlenadera(toggle)
    return resp
  }

  const asignarLlenadera = async (form) => {
    const resp = await store.asignarLlenadera(form)
    return resp
  }

  const selectTanque = (tank) => {
    store.selectTank()
  }

  const getLlenaderas = () => {
    return store.llenaderas
  }
  const getLlenaderasLibres = () => {
    return store.llenaderasLibres
  }
  const getLlenaderasEstado = () => {
    return store.llenaderasEstado
  }
  const getLlenaderaAceptaAsignacion = () => {
    return store.llenaderaAceptaAsignacion
  }

  const getLlenaderasFiltradas = () => {
    return store.llenaderasFiltradas
  }

  return {
    fetchLlenaderas,
    fetchLlenaderasLibres,
    resetLlenadera,
    fetchEstadoLlenadera,
    changeEstadoLlenadera,
    asignarLlenadera,
    getLlenaderas,
    getLlenaderasLibres,
    getLlenaderasEstado,
    getLlenaderaAceptaAsignacion,
    getLlenaderasFiltradas,
    selectTanque
  }
}

export default useLlenaderas