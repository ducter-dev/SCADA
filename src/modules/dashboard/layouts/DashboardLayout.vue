<template>
  <div class="mx-auto h-full flex flex-col-reverse sm:flex-row">
    <div v-show="toggle" class="sm:w-48 relative">
      <Sidebar />
      <div v-show="toggle" class="absolute flex justify-center items-center bottom-6 right-6">
        <button 
          type="button" 
          class="text-white border border-white hover:bg-dark hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          @click="toggleSidebar"
          >
          <IconCaretLeft class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div v-show="!toggle" class="absolute flex justify-center items-center bottom-6 left-0">
      <button 
        type="button" 
        class="text-gray-800 border border-gray-800 hover:bg-dark hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        @click="toggleSidebar"
        >
        <IconCaretRight class="w-4 h-4" />
      </button>
    </div>
    <div class="h-full w-full flex-col items-start">
      <div class="h-10 m-1 sm:m-4">
        <NavBar :userName="userName" @exitApp="exitApp"/>
      </div>
      <div class="w-full flex flex-row justify-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../../auth/composables/useAuth'

import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/SideBar.vue'
import IconCaretLeft from '../../../assets/icons/caretLeft.svg'
import IconCaretRight from '../../../assets/icons/caretRight.svg'

export default {
  components: { NavBar, Sidebar, IconCaretLeft, IconCaretRight },

  setup() {
    const { logout, getToken, getUserName } = useAuth()
    const router = useRouter() 
    const token = computed(() => getToken()) 
    const userName = computed(() => getUserName()) 
    const toggle = ref(true)

    const toggleSidebar = () => {
      toggle.value = !toggle.value
    }

    const exitApp = async () => {
      const resp = await logout()
      if (resp) {
        router.push('/')
      }
    }

    return {
      NavBar,
      Sidebar,
      token,
      userName,
      toggle,
      toggleSidebar,
      exitApp,
    }
  },
}
</script>