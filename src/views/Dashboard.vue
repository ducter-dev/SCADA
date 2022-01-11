<template>
  <div class="mx-auto h-full flex flex-col-reverse sm:flex-row">
    <div class="sm:w-48">
      <Sidebar />
    </div>
    <div class="h-full w-full flex-col items-start">
      <div class="h-10 m-1 sm:m-4 bg-info">
        <NavBar />
      </div>
      <div class="m-2 sm:m-4 bg-green-200">Contenido</div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/SideBar.vue'
</script>