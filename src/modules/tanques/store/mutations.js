
// ----- Tanques -----
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
  const tanques = state.tanques.filter( t => t.id != tank.id)
  console.log(tanques)
  state.tanques = []
  console.log(state.tanques)
  state.tanques = tanques
  console.log(state.tanques)
}

export const selectTank = ( state, tank ) => {
  state.tanqueSelect = tank
}

export const addTank = ( state, tank ) => {
  console.log('mutation => addTank')
  console.log(tank)
  state.tanques.push(tank)
}

// ----- Tanques Entradas -----

export const getTanksEspera = ( state, tanques ) => {
  console.log('mutation => getTanksEspera')
  console.log(tanques)
  state.tanquesInEspera = tanques
}

export const addTanksLastEntry = ( state, entry ) => {
  console.log('mutation => addTanksLastEntry')
  console.log(entry)
  state.lastTankEntry = entry
}


// ----- Tanques Espera -----

export const addTankWaitingList = (state, tank) => {
  console.log('mutation => addTankWaitingList')
  console.log(tank)
  state.tanquesInEspera.push(tank)  
  console.log(state.tanquesInEspera)
}


// ----- Tanques Servicio -----

export const addTanksLastAsign = (state, service) => {
  console.log('mutation => addTanksLastAsign')
  console.log(service)
  state.lastTankAsign = (service)  
}

// ----- Tanques Salidas -----

export const addTanksSalida = (state, tanks) => {
  console.log('mutation => addTanksSalida')
  if (tanks.length < 1) {
    return console.log('Salimos')
  }
  state.tanquesInSalida = tanks
}

export const addTanksLastExit = (state, exit) => {
  console.log('mutation => addTanksLastExit')
  state.lastTankExit = exit
}


// ----- Llenaderas -----

export const addLlenaderas = (state, llenaderas) => {
  console.log('mutation => addLlenaderas')
  state.llenaderas = llenaderas
}

export const addLlenaderasLibres = (state, llenaderas) => {
  console.log('mutation => addTanksLastExit')
  state.llenaderasLibres = llenaderas
}

export const changeEstadoLlenadera = (state, estado) => {
  console.log('mutation => changeEstadoLlenadera')
  state.llenaderasEstado = estado
}