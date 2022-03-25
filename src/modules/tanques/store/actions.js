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
    commit('addTanksLastEntry', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}



// ------ Tanques Espera ------

export const getTanksEspera = async ({ commit }) => {
  console.log('action => getTanksEspera')
  try {
    const res = await scadaApi.get('tanques/espera')
    const { data } = res
    commit('getTanksEspera', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const agregarTanqueEspera = async ({ commit }, tank) => {
  console.log('action => agregarTanqueEspera')
  try {
    const res = await scadaApi.post('tanques/espera', tank)
    const { data } = res
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
    commit('addTanksLastExit', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}


// ------ Llenaderas ------

export const getLlenaderas = async ({commit}) => {
  try {
    console.log('action => getLlenaderas')
    const res = await scadaApi.get('llenaderas')
    const { data } = res
    commit('addLlenaderas', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const getLlenaderasLibres = async ({commit}) => {
  try {
    console.log('action => getLlenaderasLibres')
    const res = await scadaApi.get('llenaderas/libres')
    const { data } = res
    commit('addLlenaderasLibres', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const desasignLlenadera = async ({commit}, llenadera) => {
  try {
    console.log('action => desasignLlenadera')
    const res = await scadaApi.post(`llenaderas/desasignar/${llenadera}`)
    const { data } = res
    commit('addLlenaderasLibres', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const asignarLlenadera = async ({commit}, form) => {
  try {
    console.log('action => asignarLlenadera')
    const res = await scadaApi.post('llenaderas/asignacion/aceptar', form)
    const { data } = res
    commit('asignarLlenadera', form.llenadera)
    commit('aceptarAsignacion', 0)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}


// Despacho Llenaderas

export const getDespacho = async ({commit}, estado) => {
  try {
    console.log('action => getDespacho')
    const res = await scadaApi.get('/llenaderas/estado', estado)
    console.log(res)
    const { data } = res
    commit('changeEstadoLlenadera', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const changeEstadoLlenadera = async({commit}, estado) => {
  try {
    console.log('action => changeEstadoLlenadera')
    const dataForm = {
      estado
    }
    const res = await scadaApi.post('/llenaderas/estado', dataForm)
    console.log(res)
    const { data } = res
    commit('changeEstadoLlenadera', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

