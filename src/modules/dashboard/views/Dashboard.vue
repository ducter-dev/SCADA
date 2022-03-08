<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="flex flex-row justify-center items-start">
      <div class="flex justify-center items center w-3/12">
        <TarjetaEntrada :data="antenaEntrada" />
      </div>
      <div class="flex justify-center items center w-3/12">
        <TarjetaVerificacion :data="antenaVerificacion" />
      </div>
      <div class="flex justify-center items center w-3/12">
        <TarjetaSalida />
      </div>
      <div class="flex justify-center items center w-3/12">
        <TarjetaUltimasCargas />
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
import TarjetaUltimasCargas from '../components/TarjetaUltimasCargas.vue'
import useDashboard from '../composables/useDashboard'

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    TarjetaEntrada,
    TarjetaVerificacion,
    TarjetaSalida,
    TarjetaUltimasCargas,
  },
  setup() {
    const store = useStore()
    const { getAntenaEntrada, getAntenaVerificacion } = useDashboard()

    const dataAntenaEntrada = computed(() => store.state.dashboard.antenaEntrada)
    let antenaEntrada = ref(dataAntenaEntrada.value)

    const dataAntenaVerificacion = computed(() => store.state.dashboard.antenaVerificacion)
    let antenaVerificacion = ref(dataAntenaVerificacion.value)

    const getDatosAntenaEntrada = async () => {
      try {
        const res = await getAntenaEntrada()
        const { data, status } = res
        if (status == 200) {
          antenaEntrada.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const getDatosAntenaVerificacion = async () => {
      try {
        const res = await getAntenaVerificacion()
        const { data, status } = res
        if (status == 200) {
          antenaVerificacion.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    onMounted(() => {
      if (Object.keys(antenaEntrada.value).length < 1) {
        // No hay usuarios en el store
        getDatosAntenaEntrada()
      }
      if (Object.keys(antenaVerificacion.value).length < 1) {
        // No hay usuarios en el store
        getDatosAntenaVerificacion()
      }
    })



    return {
      antenaEntrada,
      antenaVerificacion,
    }
  },
};
</script>