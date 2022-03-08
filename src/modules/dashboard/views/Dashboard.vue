<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="flex flex-row justify-between items-start">
      <div class="flex justify-center items center mx-2">
        <TarjetaEntrada :data="antenaEntrada" />
      </div>
      <div class="flex justify-center items center mx-2">
        <TarjetaVerificacion :data="antenaVerificacion" />
      </div>
      <div class="flex justify-center items center mx-2">
        <TarjetaSalida :data="antenaSalida" />
      </div>
      <div class="flex justify-center items center mx-2">
        <TarjetaUltimasCargas :salidas="tanksSalida" />
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
import useTanqueSalida from '../../tanques/composables/useTanqueSalida'

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
    const { getAntenaEntrada, getAntenaVerificacion, getAntenaSalida } = useDashboard()
    const { getTanksSalidas } = useTanqueSalida()

    const dataAntenaEntrada = computed(() => store.state.dashboard.antenaEntrada)
    let antenaEntrada = ref(dataAntenaEntrada.value)

    const dataAntenaVerificacion = computed(() => store.state.dashboard.antenaVerificacion)
    let antenaVerificacion = ref(dataAntenaVerificacion.value)

    const dataAntenaSalida = computed(() => store.state.dashboard.antenaSalida)
    let antenaSalida = ref(dataAntenaSalida.value)

    const listaSalida = computed(() => store.state.tanques.tanquesInSalida)
    let tanksSalida = ref(listaSalida.value)

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

    const getDatosAntenaSalida = async () => {
      try {
        const res = await getAntenaSalida()
        const { data, status } = res
        if (status == 200) {
          antenaSalida.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const getTanquesSalida = async () => {
      try {
        const res = await getTanksSalidas()
        const { data, status } = res
        if (status == 200) {
          tanksSalida.value = data
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
        getDatosAntenaEntrada()
      }
      if (Object.keys(antenaVerificacion.value).length < 1) {
        getDatosAntenaVerificacion()
      }
      if (Object.keys(antenaSalida.value).length < 1) {
        getDatosAntenaSalida()
      }
      if (tanksSalida.value.length == 0) {
        getTanquesSalida()
      }
    })



    return {
      antenaEntrada,
      antenaVerificacion,
      antenaSalida,
      tanksSalida,
    }
  },
};
</script>