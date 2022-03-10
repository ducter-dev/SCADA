export const currentTanqueInEspera = (state) => {
  return state.tanqueInEspereaSel
}

export const currentTanqueSel = (state) => {
  return state.tanqueSelect
}

export const countTanquesEspera = (state) => {
  return state.tanquesInEspera.length + 1
}