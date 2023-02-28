<script setup>
import ToastList from "../../dashboard/components/toast/list.vue";
</script>
<template>
  <div class="min-h-screen bg-slate-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <router-view />
      <ToastList />
    </div>
  </div>
</template>