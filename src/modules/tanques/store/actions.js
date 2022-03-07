import scadaApi from '../../../api'

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
    
  }
}

export const deleteTank = async ({ commit }, tank) => {
  console.log('action => deleteTank')
  try {
    commit('deleteTank', tank)
  } catch (error) {
    
  }
}

export const selectTank = (context, tank) => {
  context.commit('selectTank', tank)
}