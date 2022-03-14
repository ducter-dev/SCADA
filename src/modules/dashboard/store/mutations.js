export const addAntenaEntrada = (state, antenaEntrada) => {
  console.log('mutation => addAntenaEntrada')
  state.antenaEntrada = antenaEntrada
}

export const addAntenaVerificacion = (state, antenaVerificacion) => {
  console.log('mutation => addAntenaVerificacion')
  state.antenaVerificacion= antenaVerificacion
}

export const addAntenaSalida = (state, antenaSalida) => {
  console.log('mutation => addAntenaVerificacion')
  state.antenaSalida= antenaSalida
}

export const changeBarreraEntrada = (state, estado) => {
  console.log(estado)
  console.log('mutation => changeBarreraEntrada')
  state.barreraEntrada = estado
}

export const changeBarreraVerificacion = (state, estado) => {
  console.log(estado)
  console.log('mutation => changeBarreraVerificacion')
  state.barreraVerificacion = estado
}

export const changeBarreraSalida = (state, estado) => {
  console.log(estado)
  console.log('mutation => changeBarreraSalida')
  state.barreraSalida = estado
}