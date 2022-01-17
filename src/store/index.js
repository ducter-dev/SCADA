import { createStore } from 'vuex'

import auth from '../modules/auth/store'
import user from '../modules/usuarios/store'


const store = createStore({
  modules: {
    auth,
    user,
  }
})


export default store