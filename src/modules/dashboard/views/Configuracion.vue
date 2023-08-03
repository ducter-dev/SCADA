<template>
  <div class="flex flex-col w-full m-4 sm:m-12">
    <Usuarios /> 
    <Tanques />
  </div>
</template>

<script>
import Usuarios from '../../usuarios/views/Index.vue'
import Tanques from '../../tanques/views/Index.vue'
export default {
  components: {
    Usuarios,
    Tanques,
  },
  setup () {
    return {}
  }
}
</script>