export const selectUser = (context, user) => {
  context.commit('selectUser', user)
}

export const editUser = ({ commit }, user) => {
  try {
    // Logica de editar usuario - Post
    commit('user/selectUser', {})
    return { ok: true, message: user }
  } catch (error) {
    return { ok: false, message: error.message }
  }
}