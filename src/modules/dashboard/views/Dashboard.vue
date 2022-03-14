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
            <div class="flex flex-col justify-center items-center">
              <TarjetaAsignacion :data="lastAsign" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaUltimaSalida :data="lastExit" />
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items center">
          <div class="flex justify-center items-center">
            <TarjetaUltimasCargas :salidas="tanksSalida" />
          </div>
          <div class="flex justify-center items-center">
            <TarjetaLlenaderas :data="llenaderasLibres" @desasignarLlenadera="desasignarLlenadera" />
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
import TarjetaAsignacion from '../components/TarjetaAsignacion.vue'
import TarjetaUltimaSalida from '../components/TarjetaUltimaSalida.vue'
import TarjetaLlenaderas from '../components/TarjetaLlenaderas.vue'
import useDashboard from '../composables/useDashboard'
import useTanqueSalida from '../../tanques/composables/useTanqueSalida'
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'
import useTanqueServicio from '../../tanques/composables/useTanqueServicio'
import useLlenaderas from '../../tanques/composables/useLlenaderas'
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
    TarjetaAsignacion,
    TarjetaUltimaEntrada,
    TarjetaUltimaSalida,
    TarjetaLlenaderas,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const { getAntenaEntrada, getAntenaVerificacion, getAntenaSalida } = useDashboard()
    const { getTanksSalidas, getUltimaSalida } = useTanqueSalida()
    const { getUltimaEntrada } = useTanqueEntrada()
    const { getUltimaAsignacion } = useTanqueServicio()
    const { getLlenaderasLibres, resetLlenadera } = useLlenaderas()

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
    
    const dataLastAsign = computed(() => store.state.tanques.lastTankAsign)
    let lastAsign = ref(dataLastAsign.value)

    const dataLastExit = computed(() => store.state.tanques.lastTankExit)
    let lastExit = ref(dataLastExit.value)

    const dataLlenaderasLibres = computed(() => store.state.tanques.llenaderasLibres)
    let llenaderasLibres = ref(dataLlenaderasLibres.value)

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
        console.log(res)
        const { data, status } = res
        console.log(data)
        if (status == 200) {
          console.log('status 200')
          if (data.length == 0) {
            console.log('debemos salir')
            return
          }
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
    
    const getLastTankAsign = async () => {
      try {
        const res = await getUltimaAsignacion()
        const { data, status } = res
        if (status == 200) {
          lastAsign.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const getLastTankExit = async () => {
      try {
        const res = await getUltimaSalida()
        const { data, status } = res
        if (status == 200) {
          lastExit.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const getLlenaderasFrees = async () => {
      try {
        const res = await getLlenaderasLibres()
        const { data, status } = res
        if (status == 200) {
          llenaderasLibres.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const openForm = () => {
      router.push('/dashboard/entrada/manual')
    }

    const desasignarLlenadera = async (llenadera) => {
      const res = await resetLlenadera(llenadera)
      const { data, status } = res
        if (status == 201) {
          Swal.fire("Desasignar", data.message, "success")
        } else {
          Swal.fire("Error", data.message, "error")
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
      if (Object.keys(lastEntry.value).length < 1) {
        getLastTankEntry()
      }
      if (Object.keys(lastAsign.value).length < 1) {
        getLastTankAsign()
      }
      if (Object.keys(lastExit.value).length < 1) {
        getLastTankExit()
      }
      if (Object.keys(llenaderasLibres.value).length < 1) {
        getLlenaderasFrees()
      }
    })



    return {
      antenaEntrada,
      antenaVerificacion,
      antenaSalida,
      tanksSalida,
      openForm,
      lastEntry,
      lastAsign,
      lastExit,
      llenaderasLibres,
      desasignarLlenadera,
    }
  },
};
</script>