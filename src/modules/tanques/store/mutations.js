export const addTanks = (state, tanks) => {
  console.log('mutation => addTanks')
  state.tanques = tanks
}

export const updateTank = (state, tank) => {
  console.log('mutation => updateTank')
  const { atId, atTipo, atName, conector, capacidad90, transportadora } = tank
  const tanque = state.tanques.find( t => t.id == tank.id)
  console.log(tanque)
  tanque.atId = atId
  tanque.atTipo = atTipo
  tanque.atName = atName
  tanque.conector = conector
  tanque.capacidad90 = capacidad90
  tanque.transportadora = transportadora
  state.tanqueSelect = {}
  console.log(tanque)
}

export const deleteTank = (state, tank) => {
  console.log('mutation => deleteTank')
  const tanque = state.tanques.find( t => t.id == tank.id)
  console.log(tanque)
}

export const selectTank = ( state, tank ) => {
  state.tanqueSelect = tank
}

export const addTank = ( state, tank ) => {
  console.log('mutation => addTank')
  console.log(tank)
  state.tanques.push(tank)
}