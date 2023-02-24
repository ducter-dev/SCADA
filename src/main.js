import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './index.css'
import VueTippy from 'vue-tippy'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
  .component('Datepicker', Datepicker)
  .use(store)
  .use(router)
  .use(VueTippy)
  .mount('#app')
