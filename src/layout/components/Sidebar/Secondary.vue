<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconHouse from "../../../assets/icons/house.svg"
import IconGasPump from "../../../assets/icons/gas-pump.svg"
import IconTruckFast from "../../../assets/icons/truck-fast.svg"
import IconTruck from "../../../assets/icons/truck.svg"
import IconPause from '../../../assets/icons/pause.svg'
import IconSliders from '../../../assets/icons/sliders.svg'
import IconFile from '../../../assets/icons/file-arrow-down-solid.svg'
import IconBook from '../../../assets/icons/book-solid.svg'
import Dropdown from './Dropdown.vue'

const route = useRoute()
const routeName = computed(() => route.name)

</script>
<template>
  <div class="flex-1 overflow-y-auto">
    <div class="p-3 min-h-[64px] lg:min-h-[48px]">
      <p class="text-sm font-semibold business_name text-slate-900 dark:text-slate-100"
        v-tippy="'Instalación de Recibo, Guarda y Entrega'">
        IRGE
      </p>
    </div>
    <nav class="pb-4 mb-8 space-y-5 border-t border-transparent sidebar md:border-slate-200 dark:border-slate-700">
      <div>
        <li>
          <router-link :to="{ name: 'dashboard.home' }"
            exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
            class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
            <IconHouse class="w-5 h-5 mr-3 -ml-1 shrink-0" />
            Inicio
          </router-link>
        </li>
      </div>
      <div>
        <h5 class="mb-2 ml-5 text-xs font-semibold leading-4 tracking-wider text-blue-700 uppercase menu-heading">
          Menu
        </h5>
        <router-link :to="{ name: 'entries' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconTruckFast class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Entradas</span>
        </router-link>
        <router-link :to="{ name: 'waitinglist' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconPause class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Espera</span>
        </router-link>
        <router-link :to="{ name: 'services' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconGasPump class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Servicio</span>
        </router-link>
        <router-link :to="{ name: 'exits' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconTruck class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Salidas</span>
        </router-link>i
        <router-link :to="{ name: 'reports' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconFile class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Reportes</span>
        </router-link>
        <router-link :to="{ name: 'records' }"
          exact-active-class="border-blue-700 text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 hover:border-blue-700"
          class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 border-transparent group focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconBook fill="currentColor" class="w-5 h-5 mr-3 -ml-1 shrink-0" />
          <span class="truncate">Bitácora</span>
        </router-link>
        <Dropdown 
          class="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800" 
          label="Configuration" 
          :active="
            routeName === 'usuarios.home' ||
            routeName === 'tanques.home'
          "
        >
          <template #icon>
            <div class="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800">
              <IconSliders class="w-5 h-5 mr-3 -ml-1 shrink-0" fill="currentColor" />
            </div>
          </template>
          <template #content>
            <div>
              <router-link :to="{ name: 'usuarios.home' }" custom
                v-slot="{ href, navigate, isActive, isExactActive }">
                <a :class="isExactActive
                    ? 'text-blue-700 border-blue-500 '
                    : ' text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                  " :href="href" @click="navigate"
                  class="flex items-center py-2 pl-12 pr-4 mt-1 text-sm font-medium group focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span class="truncate">Usuarios</span>
                </a>
              </router-link>
            </div>
            <div>
              <router-link :to="{ name: 'tanques.home' }" custom
                v-slot="{ href, navigate, isActive, isExactActive }">
                <a :class="isExactActive
                    ? 'text-blue-700 border-blue-500 '
                    : ' text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                  " :href="href" @click="navigate"
                  class="flex items-center py-2 pl-12 pr-4 mt-1 text-sm font-medium group focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span class="truncate">Tanques</span>
                </a>
              </router-link>
            </div>
          </template>
        </Dropdown>
      </div>
    </nav>
  </div>
</template>
