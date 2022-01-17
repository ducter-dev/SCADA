import scadaApi from "../../../api"

export const loginUser = async ({ commit }, user) => {
  const {usuario, password } = user
  const dataForm = {
    username: usuario,
    password
  }
  try {
    const { data } = await scadaApi.post('/auth/login', dataForm )
    console.log(data)

  } catch (error) {
    return { ok: false, message: '...'}
  }
}

export const createUser = async ({ commit }, user) => {

}