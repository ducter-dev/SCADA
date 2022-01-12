const useAuth = () => {
  
  const createUser = async( user ) => {
    console.log(user)
    // TODO: store.dispatch('auth/createUser', user)
    // return resp
  }
  return {
    createUser
  }
}

export default useAuth