import { useStore } from "vuex"

const useDashboard = () => {
  const store = useStore()

  const getAntenaEntrada = async () => {
    console.log('composable - getAntenaEntrada')
    const resp = await store.dispatch('dashboard/getAntenaEntrada')
    return resp
  }

  const getAntenaVerificacion = async () => {
    console.log('composable - getAntenaVerificacion')
    const resp = await store.dispatch('dashboard/getAntenaVerificacion')
    return resp
  }

  const getAntenaSalida = async () => {
    console.log('composable - getAntenaSalida')
    const resp = await store.dispatch('dashboard/getAntenaSalida')
    return resp
  }



  // Barrera de Entrada

  const getBarreraEntrada = async () => {
    console.log('composable - getBarreraEntrada')
    const resp = await store.dispatch('dashboard/getBarreraEntrada')
    return resp
  }

  const changeBarreraEntrada = async (toggle) => {
    console.log('composable - changeBarreraEntrada')
    const resp = await store.dispatch('dashboard/changeBarreraEntrada', toggle)
    return resp
  }


  // Barrera de Verificacion

  const getBarreraVerificacion = async () => {
    console.log('composable - getBarreraVerificacion')
    const resp = await store.dispatch('dashboard/getBarreraVerificacion')
    return resp
  }

  const changeBarreraVerificacion = async (toggle) => {
    console.log('composable - changeBarreraVerificacion')
    const resp = await store.dispatch('dashboard/changeBarreraVerificacion', toggle)
    return resp
  }

  // Barrera de Salida

  const getBarreraSalida = async () => {
    console.log('composable - getBarreraSalida')
    const resp = await store.dispatch('dashboard/getBarreraSalida')
    return resp
  }

  const changeBarreraSalida = async (toggle) => {
    console.log('composable - changeBarreraSalida')
    const resp = await store.dispatch('dashboard/changeBarreraSalida', toggle)
    return resp
  }


  return {
    getAntenaEntrada,
    getAntenaVerificacion,
    getAntenaSalida,
    changeBarreraEntrada,
    getBarreraEntrada,
    getBarreraVerificacion,
    changeBarreraVerificacion,
    getBarreraSalida,
    changeBarreraSalida,
  }
}

export default useDashboard