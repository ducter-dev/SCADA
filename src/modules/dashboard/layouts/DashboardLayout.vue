
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toggleSidebar } from '../../../layout/composables'
import Header from '../../../layout/components/Header/Index.vue'
import Sidebar from '../../../layout/components/Sidebar/Index.vue'
import SidebarMobile from '../../../layout/components/Sidebar/Mobile.vue'
import Footer from '../../../layout/components/Footer.vue'
import ToastList from '../components/toast/list.vue'
import useTanque from '../../tanques/composables/useTanque'
import useAuth from '../../auth/composables/useAuth'

const { fetchTanquesAll } = useTanque()
const { getCurrentUser } = useAuth()

const sessionUser = computed(() => getCurrentUser())
const router = useRouter()

const goToLogin = () => {
  router.push( { name: 'login' })
}

if (!sessionUser.value) {
  goToLogin()
}

onMounted(() => {
  fetchTanquesAll()
})

</script>

<template>
  <div class="overflow-hidden font-sans antialiased bg-slate-100 dark:bg-slate-900">
    <div class="flex h-screen overflow-hidden" @keyup.esc="toggleSidebar">
      <!-- Sidebar-->
      <Sidebar />

      <!-- Sidebar mobile-->
      <SidebarMobile />

      <div class="flex flex-col flex-1 w-0 overflow-hidden overflow-y-auto">
        <!-- Header-->
        <Header />

        <router-view v-slot="{ Component, route }">
          <transition appear enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <main class="relative z-0 flex-1 py-3 lg:py-6" scroll-region>
              <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 min-h-(screen-content) ">
                <component :is="Component" :key="route.path" />
              </div>
            </main>
          </transition>
        </router-view>
        <Footer />
        <ToastList />
      </div>
    </div>
  </div>
</template>

