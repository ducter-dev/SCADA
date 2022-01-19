import scadaApi from '../../../api'

export const selectUser = (context, user) => {
  context.commit('selectUser', user)
}

export const editUser = async ({ commit }, user) => {
  console.log('action => editUser')
  const { usuario, categoria, departamento } = user
  const dataForm = {
    username: usuario,
    categoria,
    departamento
  }
  try {
    const res = await scadaApi.put(`/users/${user.id}`, dataForm )
    console.log(res)
    const { data } = res
    commit('updateUser', data)
    return res
  } catch (error) {
    return { ok: false, message: error}
  }
}

export const getUsers = async ({commit}) => {
  try {
    console.log('action => getUsers')
    const res = await scadaApi.get('/users')
    console.log(res)
    const { data } = res
    commit('addUsers', data)
    return res
  } catch (error) {
    return { ok: false, message: error.message }
  }
}