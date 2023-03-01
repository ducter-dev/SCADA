<script setup>
import IconHouse from '../../../assets/icons/house.svg'
import IconGasPump from '../../../assets/icons/gas-pump.svg'
import IconSliders from '../../../assets/icons/sliders.svg'
</script>
<template>
  <div class="flex-1 overflow-y-auto">
    <div class="p-3 min-h-[64px] lg:min-h-[48px]">
      <p class="text-sm business_name font-semibold text-slate-900 dark:text-slate-100"
        v-tippy="'Ductos y Terminales, S.A. de C.V.'">
        Ductos y Terminales, S.A. de C.V.
      </p>
    </div>
    <nav class="sidebar mb-8 space-y-5 border-t border-transparent md:border-slate-200 dark:border-slate-700 pb-4">
      <div>
        <li>
          <router-link :to="{ name: 'Home' }"
          exact-active-class="text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 border-blue-700 hover:border-blue-700"
          class="group flex items-center pl-5 pr-4 py-2 mt-1 border-l-4 border-transparent text-sm font-medium focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
            <IconHouse class="shrink-0 -ml-1 mr-3 h-5 w-5" />
            Inicio
          </router-link>
        </li>
      </div>
      <div>
        <h5 class="menu-heading text-xs leading-4 text-blue-700 uppercase tracking-wider mb-2 font-semibold ml-5">
          Menu
        </h5>
        <router-link :to="{ name: 'ListaServicio' }"  
        exact-active-class="text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 border-blue-700 hover:border-blue-700"
          class="group flex items-center pl-5 pr-4 py-2 mt-1 border-l-4 border-transparent text-sm font-medium focus:outline-none text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
          <IconGasPump class="shrink-0 -ml-1 mr-3 h-5 w-5" />
          <span class="truncate">Servicio</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
