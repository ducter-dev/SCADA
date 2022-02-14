<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="flex flex-row justify-center items-start">
      <div class="flex justify-center items center w-3/12">
        <TarjetaEntrada />
      </div>
      <div class="flex justify-center items center w-3/12">
        <TarjetaVerificacion />
      </div>
      <div class="flex justify-center items center w-3/12">
        <TarjetaSalida />
      </div>
      <div class="flex justify-center items center w-3/12 border border-blue-900">
        Card 4
      </div>
    </div>
    <div class="flex flex-row justify-center items-start border border-red-500">
      <div class="flex justify-center items center w-3/12 border border-blue-900">
        Card 5
      </div>
      <div class="flex justify-center items center w-3/12 border border-blue-900">
        Card 6
      </div>
      <div class="flex justify-center items center w-3/12 border border-blue-900">
        Card 7
      </div>
      <div class="flex justify-center items center w-3/12 border border-blue-900">
        Card 8
      </div>
    </div>
    <div class="flex flex-row justify-center items-start border border-red-500">
      Lista de Espera
    </div>
  </div>
</template>

<script>
import TarjetaEntrada from '../components/TarjetaEntrada.vue'
import TarjetaVerificacion from '../components/TarjetaVerificacion.vue'
import TarjetaSalida from '../components/TarjetaSalida.vue'

export default {
  components: {
    TarjetaEntrada,
    TarjetaVerificacion,
    TarjetaSalida,
  },
  setup() {
    return {
    }
  },
};
</script>