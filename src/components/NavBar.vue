<template>
  <nav
    class="
      bg-white
      border-gray-200
      px-2
      sm:px-4
      py-2.5
      rounded
    "
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link to="/" class="flex">
        <img class="w-32" :src="Logo" alt="Logo Ducter">
      </router-link>
      <div class="flex items-center md:order-2">
        <button type="button" class="
          text-dark hover:text-white
          bg-white hover:bg-dark
          font-bold 
          focus:ring-4 focus:ring-blue-300 
          rounded-lg 
          text-sm 
          px-5 py-2.5 
          text-center 
          mr-3 md:mr-0">
          Vianey
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Logo from '../assets/logo_ductos_altiplano.png'
</script>