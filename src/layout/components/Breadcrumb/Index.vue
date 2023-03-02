<script setup>
defineProps({
  backRoute: {
    default: false
  },
  Lname: {
    type: String,
    default: 'LBreadcrumb',
  },
})
</script>
<template>
  <div>
    <nav class="sm:hidden">
      <router-link :to="backRoute"
        class="flex items-center text-sm font-medium leading-5 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
          class="w-5 h-5 mr-1 -ml-1 shrink-0 text-slate-400 dark:text-slate-500">
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
        Volver
      </router-link>
    </nav>
    <nav class="items-center hidden text-sm font-medium leading-5 sm:flex">
      <slot />
  </nav>
</div></template>