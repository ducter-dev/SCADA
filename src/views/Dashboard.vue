<template>
  <div class="mx-auto h-full flex flex-col-reverse sm:flex-row">
    <div class="basis-1/12 sm:basis-2/12 bg-dark">SideBar</div>
    <div class="basis-11/12 sm:basis-10/12 flex-col items-start">
      <div class="h-10 m-4 bg-info">
        <NavBar />
      </div>
      <div class="m-4 bg-green-200">Contenido</div>
    </div>
  </div>
</template>

<script setup>
import  NavBar from '../components/NavBar.vue'
</script>