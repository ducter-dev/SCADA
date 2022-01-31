import { createStore } from 'vuex'

import auth from '../modules/auth/store'
import user from '../modules/usuarios/store'
import tanques from '../modules/tanques/store'


const store = createStore({
  modules: {
    auth,
    user,
    tanques,
  }
})


export default store