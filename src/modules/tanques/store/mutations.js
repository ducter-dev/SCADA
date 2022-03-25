
// ----- Tanques -----
export const addTanks = (state, tanks) => {
  console.log('mutation => addTanks')
  state.tanques = tanks
}

export const updateTank = (state, tank) => {
  console.log('mutation => updateTank')
  const { atId, atTipo, atName, conector, capacidad90, transportadora } = tank
  const tanque = state.tanques.find( t => t.id == tank.id)
  tanque.atId = atId
  tanque.atTipo = atTipo
  tanque.atName = atName
  tanque.conector = conector
  tanque.capacidad90 = capacidad90
  tanque.transportadora = transportadora
  state.tanqueSelect = {}
}

export const deleteTank = (state, tank) => {
  console.log('mutation => deleteTank')
  const tanques = state.tanques.filter( t => t.id != tank.id)
  state.tanques = []
  state.tanques = tanques
}

export const selectTank = ( state, tank ) => {
  state.tanqueSelect = tank
}

export const addTank = ( state, tank ) => {
  console.log('mutation => addTank')
  state.tanques.push(tank)
}

// ----- Tanques Entradas -----

export const getTanksEspera = ( state, tanques ) => {
  console.log('mutation => getTanksEspera')
  state.tanquesInEspera = tanques
}

export const addTanksLastEntry = ( state, entry ) => {
  console.log('mutation => addTanksLastEntry')
  state.lastTankEntry = entry
}


// ----- Tanques Espera -----

export const addTankWaitingList = (state, tank) => {
  console.log('mutation => addTankWaitingList')
  state.tanquesInEspera.push(tank)  
}

export const deleteTankIWaitingList = ( state, idTankWaiting ) => {
  console.log('mutation => deleteTankIWaitingList')
  state.tanquesInEspera = state.tanquesInEspera.filter( tanks => tanks.id !== idTankWaiting)
}


// ----- Tanques Servicio -----

export const addTanksInService = (state, tanks) => {
  console.log('mutation => addTanksInService')
  state.tanquesInServicio = tanks
}

export const addTanksLastAsign = (state, service) => {
  console.log('mutation => addTanksLastAsign')
  state.lastTankAsign = service
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

export const aceptarAsignacion = (state, toggle) => {
  console.log('mutation => aceptarAsignacion')
  state.llenaderaAceptaAsignacion = toggle
}

export const asignarLlenadera = (state, llenadera) => {
  console.log('mutation => asignarLlenadera')
  state.llenaderas.map( llen => {
    if (llen.numero == llenadera) {
      llen.estado = 0
      console.log(`Llenadera: ${llen.numero}, estado: ${llen.estado == 1 ? 'Libre' : 'Ocupada'}`)
    }
  })
}