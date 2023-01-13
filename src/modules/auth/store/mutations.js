export const loginUser = (state, { user, token }) => {
  if (token) {
    localStorage.setItem('token', token)
    state.token = token
  }

  if (user) {
    localStorage.setItem('user', user)
    state.user = user.usuario
  }

  state.user = user
  state.status = 'authenticated'
}

export const logoutUser = (state) => {
  localStorage.setItem('token', '')
  state.token = null
  state.user = null
  state.status = 'No authenticated'
}

