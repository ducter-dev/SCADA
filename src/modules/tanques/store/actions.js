import scadaApi from '../../../api'


// ------ Tanques ------
export const getTanks = async ({commit}) => {
  try {
    console.log('action => getTanks')
    const res = await scadaApi.get('/tanques')
    const { data } = res
    console.log(data)
    commit('addTanks', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const editTank = async ({ commit }, tank) => {
  console.log('action => editTank')
  try {
    const res = await scadaApi.put(`/tanques/${tank.id}`, tank )
    const { data } = res
    console.log(data)
    commit('updateTank', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const registerTank = async ({ commit }, tank) => {
  console.log('action => addTank')
  try {
    const res = await scadaApi.post('tanques', tank)
    const { data } = res
    console.log(data)
    commit('addTank', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const eliminarTank = async ({ commit }, tank) => {
  console.log('action => eliminarTank')
  try {
    const res = await scadaApi.delete(`/tanques/${tank.id}`, tank.id)
    const { data } = res
    console.log(data)
    commit('deleteTank', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const selectTank = (context, tank) => {
  context.commit('selectTank', tank)
}


// ------ Tanques Entradas ------
export const getUltimaEntrada = async ({commit}) => {
  try {
    console.log('action => getUltimaEntrada')
    const res = await scadaApi.get('/tanques/entrada/ultima')
    const { data } = res
    console.log(data)
    commit('addTanksLastEntry', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}



// ------ Tanques Espera ------

export const addTankWaitingList = async ({ commit }, tank) => {
  console.log('action => addTankWaitingList')
  try {
    const res = await scadaApi.post('tanques/espera', tank)
    const { data } = res
    console.log(data)
    commit('addTankWaitingList', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

// ------ Tanques de Servicio ------

export const getUltimaAsignacion = async ({commit}) => {
  console.log('action => getUltimaAsignacion')
  try {
    const res = await scadaApi.get('tanques/servicio/ultimo')
    const { data } = res
    console.log(data)
    commit('addTanksLastAsign', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}


// ------ Tanques de Salidas ------

export const getTanksSalidas = async ({commit}) => {
  try {
    console.log('action => getTanksSalidas')
    const res = await scadaApi.get('/tanques/salida')
    console.log(res)
    const { data } = res
    commit('addTanksSalida', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const getUltimaSalida = async ({commit}) => {
  try {
    console.log('action => getUltimaSalida')
    const res = await scadaApi.get('tanques/salida/ultima')
    const { data } = res
    console.log(data)
    commit('addTanksLastExit', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}