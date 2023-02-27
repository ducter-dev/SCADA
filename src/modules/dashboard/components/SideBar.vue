<template>
  <div class="sm:h-10 flex-shrink-0 sm:py-4 flex flex-row justify-start items-center sm:flex-col sm:min-h-screen w-full bg-gray-800">
    <nav class="flex flex-row justify-around sm:flex-col w-full md:block sm:pb-0 sm:overflow-y-auto mt-20">
      <router-link to="/dashboard" activeClass="bg-dark" inactiveClass="bg-gray-800" exactActiveClass="bg-dark" 
        class="sm:px-2 flex justify-center items-center hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="sm:w-full sm:my-2 sm:mr-2 flex sm:flex-row justify-center sm:justify-start items-center">
          <div class="w-full sm:w-1/6 flex justify-center items-center m-4 sm:ml-4 sm:my-4">
            <IconHome class="text-white w-4 h-4" />
          </div>
          <div class="hidden w-5/6 sm:flex justify-center text-base font-normal text-white">
            Home
          </div>
        </div>
      </router-link>
      <router-link
        to="/dashboard/espera"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="sm:px-2 flex justify-center items-center hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="sm:w-full sm:my-2 sm:mr-2 flex sm:flex-row justify-center sm:justify-start items-center">
          <div class="w-full sm:w-1/6 flex justify-center items-center m-4 sm:ml-4 sm:my-4">
            <IconWait class="text-white w-4 h-4" />
          </div>
          <div class="hidden w-5/6 sm:flex justify-center text-base font-normal text-white">
            Espera
          </div>
        </div>
      </router-link>
      <router-link
        to="/dashboard/servicio"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="sm:px-2 flex justify-center items-center hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="sm:w-full sm:my-2 sm:mr-2 flex sm:flex-row justify-center sm:justify-start items-center">
          <div class="w-full sm:w-1/6 flex justify-center items-center m-4 sm:ml-4 sm:my-4">
            <IconService class="text-white w-4 h-4" />
          </div>
          <div class="hidden w-5/6 sm:flex justify-center text-base font-normal text-white">
            Servicio
          </div>
        </div>
      </router-link>
      <router-link
        :to="{name:'reportes'}"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="sm:px-2 flex justify-center items-center hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="sm:w-full sm:my-2 sm:mr-2 flex sm:flex-row justify-center sm:justify-start items-center">
          <div class="w-full sm:w-1/6 flex justify-center items-center m-4 sm:ml-4 sm:my-4">
            <IconChartColumn class="text-white w-4 h-4" />
          </div>
          <div class="hidden w-5/6 sm:flex justify-center text-base font-normal text-white">
            Reportes
          </div>
        </div>
      </router-link>
      <router-link
        to="/dashboard/configuracion"
        activeClass="bg-dark"
        inactiveClass="bg-gray-800"
        exactActiveClass="bg-dark"
        class="sm:px-2 flex justify-center items-center hover:text-blue-100 focus:text-blue-100 hover:bg-dark focus:bg-dark focus:outline-none focus:shadow-outline">
        <div class="sm:w-full sm:my-2 sm:mr-2 flex sm:flex-row justify-center sm:justify-start items-center">
          <div class="w-full sm:w-1/6 flex justify-center items-center m-4 sm:ml-4 sm:my-4">
            <IconConfig class="text-white w-4 h-4" />
          </div>
          <div class="hidden w-5/6 sm:flex justify-center text-base font-normal text-white">
            Configuración
          </div>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
import IconHome from '../../../assets/icons/house-fill.svg'
import IconWait from '../../../assets/icons/hourglass-bottom.svg'
import IconService from '../../../assets/icons/gas-pump-solid.svg'
import IconTruck from '../../../assets/icons/truck-solid.svg'
import IconReportes from '../../../assets/icons/file-arrow-down-solid.svg'
import IconConfig from '../../../assets/icons/gear-solid.svg'
import IconEntrada from '../../../assets/icons/door-open-solid.svg'
import IconChartColumn from '../../../assets/icons/chart-column.svg'

export default {
  components: {
    IconHome,
    IconWait,
    IconService,
    IconTruck,
    IconReportes,
    IconConfig,
    IconEntrada,
    IconChartColumn,
  },
  setup() {},
}
</script>