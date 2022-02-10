import scadaApi from '../../../api'

export const getTanks = async ({commit}) => {
  try {
    console.log('action => getTanks')
    const res = await scadaApi.get('/tanques')
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
    commit('updateTank', tank)
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