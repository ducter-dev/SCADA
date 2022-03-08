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