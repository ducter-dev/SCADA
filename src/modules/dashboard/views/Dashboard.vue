<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="w-full flex justify-between items-start">
      <div class="w-full flex justify-between items-start">
        <div class="w-full flex flex-col justify-between items-center">
          <div class="w-full flex justify-around items-start">
            <div class="flex justify-center items-center">
              <TarjetaEntrada :data="antenaEntrada" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaVerificacion :data="antenaVerificacion" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaSalida :data="antenaSalida" />
            </div>
          </div>
          <div class="w-full flex justify-around items-start">
            <div class="flex justify-center items-center">
              <TarjetaUltimaEntrada :data="lastEntry" @openForm="openForm" />
            </div>
            <div class="flex justify-center items-center">
              Última Asignación
            </div>
            <div class="flex justify-center items-center">
              Última Salida
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items center">
          <div class="flex justify-center items-center">
            <TarjetaUltimasCargas :salidas="tanksSalida" />
          </div>
          <div class="flex justify-center items-center">
            Estado Llenaderas
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      Lista
    </div>
  </div>
</template>

<script>
import TarjetaEntrada from '../components/TarjetaEntrada.vue'
import TarjetaVerificacion from '../components/TarjetaVerificacion.vue'
import TarjetaSalida from '../components/TarjetaSalida.vue'
import TarjetaUltimasCargas from '../components/TarjetaUltimasCargas.vue'
import TarjetaUltimaEntrada from '../components/TarjetaUltimaEntrada.vue'
import useDashboard from '../composables/useDashboard'
import useTanqueSalida from '../../tanques/composables/useTanqueSalida'
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'
import { useRouter } from 'vue-router'

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default {
  components: {
    TarjetaEntrada,
    TarjetaVerificacion,
    TarjetaSalida,
    TarjetaUltimasCargas,
    TarjetaUltimaEntrada,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const { getAntenaEntrada, getAntenaVerificacion, getAntenaSalida } = useDashboard()
    const { getTanksSalidas } = useTanqueSalida()
    const { getUltimaEntrada } = useTanqueEntrada()

    const dataAntenaEntrada = computed(() => store.state.dashboard.antenaEntrada)
    let antenaEntrada = ref(dataAntenaEntrada.value)

    const dataAntenaVerificacion = computed(() => store.state.dashboard.antenaVerificacion)
    let antenaVerificacion = ref(dataAntenaVerificacion.value)

    const dataAntenaSalida = computed(() => store.state.dashboard.antenaSalida)
    let antenaSalida = ref(dataAntenaSalida.value)

    const listaSalida = computed(() => store.state.tanques.tanquesInSalida)
    let tanksSalida = ref(listaSalida.value)

    const dataLastEntry = computed(() => store.state.tanques.lastTankEntry)
    let lastEntry = ref(dataLastEntry.value)

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

    const getLastTankEntry = async () => {
      try {
        const res = await getUltimaEntrada()
        const { data, status } = res
        if (status == 200) {
          lastEntry.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const openForm = () => {
      router.push('/dashboard/entrada/manual')
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
      if (Object.keys(lastEntry.value).length < 1) {
        getLastTankEntry()
      }
    })



    return {
      antenaEntrada,
      antenaVerificacion,
      antenaSalida,
      tanksSalida,
      openForm,
      lastEntry,
    }
  },
};
</script>