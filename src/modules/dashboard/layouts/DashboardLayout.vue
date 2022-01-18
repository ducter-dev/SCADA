<template>
  <div class="mx-auto h-full flex flex-col-reverse sm:flex-row">
    <div class="sm:w-48">
      <Sidebar />
    </div>
    <div class="h-full w-full flex-col items-start">
      <div class="h-10 m-1 sm:m-4 bg-info">
        <NavBar />
      </div>
      <div class="m-2 sm:m-4 bg-green-200">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/SideBar.vue'

export default {
  components: { NavBar, Sidebar },

  setup() {
    const store = useStore()
    const token = computed(() => store.state.auth.token) 
    console.log(token.value)
    return {
      NavBar,
      Sidebar,
      token,
    }
  },
}
</script>