<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <ListaLlenaderas />
    <ListaServicio />
  </div>
</template>

<script>
import ListaLlenaderas from '../components/ListaLlenaderas.vue'
import ListaServicio from '../components/ListaServicio.vue'

export default {
  components: {
    ListaLlenaderas,
    ListaServicio,
  }
}
</script>