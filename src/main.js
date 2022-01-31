import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

createApp(App)
  .component('Datepicker', Datepicker)
  .use(store)
  .use(router)
  .mount('#app')
