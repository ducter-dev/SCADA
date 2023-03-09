import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './index.css'
import VueTippy from 'vue-tippy'
import mitt from 'mitt';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Breadcrumb from "./layout/components/Breadcrumb/Index.vue"
import Lplugin from "./layout/index"

const emitter = mitt();

const app = createApp(App)
  .component('Datepicker', Datepicker)
  .component('Breadcrumb', Breadcrumb)
  .use(store)
  .use(router)
  .use(VueTippy)
  .use(Lplugin)

app.config.globalProperties.emitter = emitter

app.mount('#app')