export const loginUser = (state, { user, token }) => {
  if (token) {
    localStorage.setItem('token', token)
    state.token = token
  }

  if (user) {
    localStorage.setItem('user', user)
    state.user = user
  }

  state.user = user
  state.status = 'authenticated'
}