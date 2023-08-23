<script setup>
import IconHome from '../../../assets/icons/house-fill.svg'
import IconWait from '../../../assets/icons/hourglass-bottom.svg'
import IconService from '../../../assets/icons/gas-pump-solid.svg'
import IconTruck from '../../../assets/icons/truck-solid.svg'
import IconReportes from '../../../assets/icons/file-arrow-down-solid.svg'
import IconConfig from '../../../assets/icons/gear-solid.svg'
import IconEntrada from '../../../assets/icons/door-open-solid.svg'
import IconChartColumn from '../../../assets/icons/chart-column.svg'
import useAuth from '../../auth/composables/useAuth'

const { getCurrentUser } = useAuth()

const sessionUser = computed(() => getCurrentUser())

const verConfig = ref(false)

verConfig.value = sessionUser.value.categoria == 1

</script>

<template>
  <div class="flex flex-row items-center justify-start flex-shrink-0 w-full bg-gray-800 sm:h-10 sm:py-4 sm:flex-col sm:min-h-screen">
    <nav class="flex flex-row justify-around w-full mt-20 sm:flex-col md:block sm:pb-0 sm:overflow-y-auto">
      <router-link to="/dashboard" activeClass="bg-dark" inactiveClass="bg-gray-800" exactActiveClass="bg-dark" 
        class="flex items-center justify-center sm:px-2 hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="flex items-center justify-center sm:w-full sm:my-2 sm:mr-2 sm:flex-row sm:justify-start">
          <div class="flex items-center justify-center w-full m-4 sm:w-1/6 sm:ml-4 sm:my-4">
            <IconHome class="w-4 h-4 text-white" />
          </div>
          <div class="justify-center hidden w-5/6 text-base font-normal text-white sm:flex">
            Home
          </div>
        </div>
      </router-link>
      <router-link
        to="/dashboard/espera"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="flex items-center justify-center sm:px-2 hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="flex items-center justify-center sm:w-full sm:my-2 sm:mr-2 sm:flex-row sm:justify-start">
          <div class="flex items-center justify-center w-full m-4 sm:w-1/6 sm:ml-4 sm:my-4">
            <IconWait class="w-4 h-4 text-white" />
          </div>
          <div class="justify-center hidden w-5/6 text-base font-normal text-white sm:flex">
            Espera
          </div>
        </div>
      </router-link>
      <router-link
        to="/dashboard/servicio"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="flex items-center justify-center sm:px-2 hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="flex items-center justify-center sm:w-full sm:my-2 sm:mr-2 sm:flex-row sm:justify-start">
          <div class="flex items-center justify-center w-full m-4 sm:w-1/6 sm:ml-4 sm:my-4">
            <IconService class="w-4 h-4 text-white" />
          </div>
          <div class="justify-center hidden w-5/6 text-base font-normal text-white sm:flex">
            Servicio
          </div>
        </div>
      </router-link>
      <router-link
        :to="{name:'reportes'}"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="flex items-center justify-center sm:px-2 hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="flex items-center justify-center sm:w-full sm:my-2 sm:mr-2 sm:flex-row sm:justify-start">
          <div class="flex items-center justify-center w-full m-4 sm:w-1/6 sm:ml-4 sm:my-4">
            <IconChartColumn class="w-4 h-4 text-white" />
          </div>
          <div class="justify-center hidden w-5/6 text-base font-normal text-white sm:flex">
            Reportes
          </div>
        </div>
      </router-link>
      <router-link
        v-show="sessionUser.categoria == 1"
        to="/dashboard/configuracion"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="flex items-center justify-center sm:px-2 hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="flex items-center justify-center sm:w-full sm:my-2 sm:mr-2 sm:flex-row sm:justify-start">
          <div class="flex items-center justify-center w-full m-4 sm:w-1/6 sm:ml-4 sm:my-4">
            <IconConfig class="w-4 h-4 text-white" />
          </div>
          <div class="justify-center hidden w-5/6 text-base font-normal text-white sm:flex">
            Configuración
          </div>
        </div>
      </router-link>
    </nav>
  </div>
</template>

