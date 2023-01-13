import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './index.css'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
  .component('Datepicker', Datepicker)
  .use(store)
  .use(router)
  .mount('#app')
