import scadaApi from '../../../api'

export const getAntenaEntrada = async ({commit}) => {
  try {
    console.log('action => getAntenaEntrada')
    const res = await scadaApi.get('/opc/antena/entrada')
    console.log(res)
    const { data } = res
    commit('addAntenaEntrada', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const getAntenaVerificacion = async ({commit}) => {
  try {
    console.log('action => getAntenaVerificacion')
    const res = await scadaApi.get('/opc/antena/verificacion')
    console.log(res)
    const { data } = res
    commit('addAntenaVerificacion', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const getAntenaSalida = async ({commit}) => {
  try {
    console.log('action => getAntenaSalida')
    const res = await scadaApi.get('/opc/antena/salida')
    console.log(res)
    const { data } = res
    commit('addAntenaSalida', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}


// Barrera de Entrada
export const getBarreraEntrada = async({commit}) => {
  try {
    console.log('action => getBarreraEntrada')
    const res = await scadaApi.get('/barrera/entrada')
    console.log(res)
    const { data } = res
    commit('changeBarreraEntrada', data.estado)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}

export const changeBarreraEntrada = async({commit}, toggle) => {
  try {
    console.log('action => changeBarreraEntrada')
    const dataForm = {
      estado: toggle
    }
    const res = await scadaApi.post('/barrera/entrada', dataForm)
    console.log(res)
    const { data } = res
    commit('changeBarreraEntrada', data.estado)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}