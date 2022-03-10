import scadaApi from '../../../api'


// tanque
export const getTanks = async ({commit}) => {
  try {
    console.log('action => getTanks')
    const res = await scadaApi.get('/tanques')
    console.log(res)
    const { data } = res
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


// Tanques de Salidas

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


// Tanques Lista Espera

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