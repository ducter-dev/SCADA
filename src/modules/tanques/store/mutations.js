export const addTanks = (state, tanks) => {
  console.log('mutation => addTanks')
  state.tanques = tanks
}

export const updateTank = (state, tank) => {
  console.log('mutation => updateTank')
  const tanque = state.tanques.find( t => t.id == tank.id)
  console.log(tanque)
}

export const deleteTank = (state, tank) => {
  console.log('mutation => deleteTank')
  const tanque = state.tanques.find( t => t.id == tank.id)
  console.log(tanque)
}