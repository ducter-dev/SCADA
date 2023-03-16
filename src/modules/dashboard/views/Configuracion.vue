<template>
  <div class="m-4 sm:m-12 w-full flex flex-col">
    <Usuarios /> 
    <Tanques />
  </div>
</template>

<script>
import Usuarios from '../../usuarios/views/Usuarios.vue'
import Tanques from '../../tanques/views/Tanques.vue'
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