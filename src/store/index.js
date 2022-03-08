import { createStore } from 'vuex'

import auth from '../modules/auth/store'
import user from '../modules/usuarios/store'
import tanques from '../modules/tanques/store'
import dashboard from '../modules/dashboard/store'


const store = createStore({
  modules: {
    auth,
    user,
    tanques,
    dashboard,
  }
})


export default store