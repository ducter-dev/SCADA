export const selectUser = ( state, user ) => {
  state.user = user
}

export const updateUser = (state, user) => {
  console.log('mutation => updateUser')
  const { username, categoria, departamento } = user
  const usuario = state.users.find( u => u.id == user.id)
  console.log(usuario)
  usuario.username = username
  usuario.categoria = categoria
  usuario.departamento = departamento
  state.user = {}
  console.log(usuario)
}

export const addUsers = (state, users) => {
  console.log('mutation => addUsers')
  state.users = users
}