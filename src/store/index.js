import { createStore } from 'vuex'

import auth from '../modules/auth/store'


const store = createStore({
  modules: {
    auth,
  }
})


export default store