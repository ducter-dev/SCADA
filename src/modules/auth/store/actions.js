import scadaApi from "../../../api"

export const loginUser = async ({ commit }, user) => {
  const { usuario, password } = user
  const dataForm = {
    username: usuario,
    password
  }
  try {
    const { data } = await scadaApi.post('/auth/login', dataForm )
    const { token } = data
    delete user.password
    commit('loginUser', { user, token })
    return data
  } catch (error) {
    return { ok: false, message: error.response.data}
  }
}

export const logoutUser = async ({ commit }) => {
  commit('logoutUser')
  return true
}