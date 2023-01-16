<template>
  <div class="m-2 sm:mx-12 sm:my-2 w-full flex flex-col">
    <div class="w-full flex justify-between items-start">
      <div class="w-full flex justify-between items-start">
        <div class="w-full flex flex-col justify-between items-center">
          <div class="w-full flex justify-around items-start">
            <div class="flex justify-center items-center">
              <TarjetaEntrada :data="dataAntenaEntrada" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaVerificacion :data="dataAntenaVerificacion" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaSalida :data="dataAntenaSalida" />
            </div>
          </div>
          <div class="w-full flex justify-around items-start">
            <div class="flex justify-center items-center">
              <!-- <TarjetaUltimaEntrada :data="lastEntry" :barrera="barreraEntrada" @openForm="openForm" @toggleChange="toggleEntrada" /> -->
            </div>
            <div class="flex flex-col justify-center items-center">
              <!-- <TarjetaAsignacion :llenaderas="llenaderas" :barrera="barreraVerificacion" :data="tanksEspera.length > 0 ? tanksEspera[0] : {}" :estado="estadoLlenadera"  @toggleChange="toggleVerificacion" @despachar="setDespacho" @asignar="asignarTanque" /> -->
            </div>
            <div class="flex justify-center items-center">
              <!-- <TarjetaUltimaSalida :barrera="barreraSalida" :data="lastExit" @toggleChange="toggleSalida" /> -->
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items center">
          <div class="flex justify-center items-center">
            <!-- <TarjetaUltimasCargas :salidas="tanksSalida" /> -->
          </div>
          <div class="flex justify-center items-center">
            <!-- <TarjetaLlenaderas :data="estadoLlenadera" @desasignarLlenadera="desasignarLlenadera" /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div class="w-full flex justify-center items-center p-2 m-2 bg-white rounded-lg border border-gray-200 shadow-md">
        <!-- <TablaEspera :tanques="tanksEspera" /> -->
      </div>
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
import useUsuario from '../../usuarios/composables/useUser'
/* import useTanqueSalida from '../../tanques/composables/useTanqueSalida'
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'
import useTanqueEspera from '../../tanques/composables/useTanqueEspera'
import useTanqueServicio from '../../tanques/composables/useTanqueServicio'
import useLlenaderas from '../../tanques/composables/useLlenaderas'
*/
import TablaEspera from '../../tanques/components/TableEspera.vue'
import { useRouter } from 'vue-router'

import { ref, computed, onMounted } from 'vue'

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
    TablaEspera,
  },
  setup() {
    const router = useRouter()
    
    const { getAntenaEntrada, getAntenaVerificacion, getAntenaSalida, getBarreraEntrada, changeBarreraEntrada, getBarreraVerificacion, 
      changeBarreraVerificacion, getBarreraSalida, changeBarreraSalida, fetchAntenaEntrada, fetchAntenaSalida, fetchAntenaVerificacion,
      fetchBarreraEntrada, fetchBarreraSalida, fetchBarreraVerificacion } = useDashboard()

    const { fetchUsuarios, getUsuarios } = useUsuario()
    /* const { getTanksSalidas, getUltimaSalida } = useTanqueSalida()
    const { getUltimaEntrada } = useTanqueEntrada()
    const { getTanksEspera } = useTanqueEspera()
    const { getUltimaAsignacion } = useTanqueServicio()
    const { getLlenaderas, resetLlenadera, getEstadoLlenadera, changeEstadoLlenadera, asignarLlenadera } = useLlenaderas() */

    const antenaEntrada = computed(() => getAntenaEntrada())
    const antenaVerificacion = computed(() => getAntenaVerificacion())
    const antenaSalida = computed(() => getAntenaSalida())
    const usuarios = computed(() => getUsuarios())
    const barreraEntrada = computed(() => getBarreraEntrada())
    const barreraVerificacion = computed(() => getBarreraVerificacion())
    const barreraSalida = computed(() => getBarreraSalida())
    
    const dataAntenaEntrada = ref({})
    const dataAntenaVerificacion = ref({})
    const dataAntenaSalida = ref({})
    const dataBarreraEntrada = ref({})
    const dataBarreraVerificacion = ref({})
    const dataBarreraSalida = ref({})
    /* const listaEspera = computed(() => store.state.tanques.tanquesInEspera)
    let tanksEspera = ref(listaEspera.value)

    const listaSalida = computed(() => store.state.tanques.tanquesInSalida)
    let tanksSalida = ref(listaSalida.value)

    const dataLastEntry = computed(() => store.state.tanques.lastTankEntry)
    let lastEntry = ref(dataLastEntry.value)
    
    const dataLastAsign = computed(() => store.state.tanques.lastTankAsign)
    let lastAsign = ref(dataLastAsign.value)

    const dataLastExit = computed(() => store.state.tanques.lastTankExit)
    let lastExit = ref(dataLastExit.value)

    const dataLlenaderas = computed(() => store.getters['tanques/llenaderasFiltradas'])
    let llenaderas = ref(dataLlenaderas.value) */

    
    
    /* const dataEstadoLlenadera = computed(() => store.state.tanques.llenaderasEstado)
    let estadoLlenadera = ref(dataEstadoLlenadera.value) */

    const fetchDatosAntenaEntrada = async () => {
      try {
        const res = await fetchAntenaEntrada()
        const { data, status } = res
        if (status == 200) {
          dataAntenaEntrada.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const fetchDatosAntenaVerificacion = async () => {
      try {
        const res = await fetchAntenaVerificacion()
        const { data, status } = res
        if (status == 200) {
          dataAntenaVerificacion.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const fetchDatosAntenaSalida = async () => {
      try {
        const res = await fetchAntenaSalida()
        const { data, status } = res
        if (status == 200) {
          dataAntenaSalida.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    /* const getTanquesSalida = async () => {
      try {
        const res = await getTanksSalidas()
        const { data, status } = res
        if (status == 200) {
          tanksSalida.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
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
        Swal.fire('Error', `Error: ${error.message}`, 'error')
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
        Swal.fire('Error', `Error: ${error.message}`, 'error')
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
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const getDataLlenaderas = async () => {
      try {
        const res = await getLlenaderas()
        const { data, status } = res
        if (status == 200) {
          llenaderas.value = store.getters['tanques/llenaderasFiltradas']
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    } */

    const fetchDataBarreraEntrada = async () => {
      try {
        const res = await fetchBarreraEntrada()
        const { data, status } = res
        if (status == 201) {
          dataBarreraEntrada.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const fetchDataBarreraVerificacion = async () => {
      try {
        const res = await fetchBarreraVerificacion()
        const { data, status } = res
        if (status == 201) {
          dataBarreraVerificacion.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    /* const getDataEstadoLlenadera = async () => {
      try {
        const res = await getEstadoLlenadera()
        const { data, status } = res
        if (status == 201) {
          estadoLlenadera.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    } */

    const fetchDataBarreraSalida = async () => {
      try {
        const res = await fetchBarreraSalida()
        const { data, status } = res
        if (status == 201) {
          dataBarreraSalida.value = data
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

    /* const desasignarLlenadera = async (llenadera) => {
      try {
        const res = await resetLlenadera(llenadera)
        const { data, status } = res
        if (status == 201) {
          Swal.fire("Desasignar", data.message, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    } */

    const toggleEntrada = async (toggle) => {
      try {
        const res = await changeBarreraEntrada(toggle)
        const { data, status } = res
        if (status == 201) {
          barreraEntrada.value = data
          Swal.fire("Barrera de Entrada", `La barrera de entrada ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const toggleVerificacion = async (toggle) => {
      try {
        const res = await changeBarreraVerificacion(toggle)
        const { data, status } = res
        if (status == 201) {
          barreraVerificacion.value = data
          Swal.fire("Barrera de Verificacion", `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const toggleSalida = async (toggle) => {
      try {
        const res = await changeBarreraSalida(toggle)
        const { data, status } = res
        if (status == 201) {
          barreraSalida.value = data
          Swal.fire("Barrera de Verificacion", `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    /* const setDespacho = async (orden) => {
      try {
        const res = await changeEstadoLlenadera(orden)
        const { data, status } = res
        if (status == 201) {
          estadoLlenadera.value = data
          Swal.fire("Estado Llenadera", `La llenadera ha sido ${data.estado == 1 ? 'Detenida' : 'Liberada'}.`, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const getTanquesEspera = async () => {
      try {
        const res = await getTanksEspera()
        const { data, status } = res
        if (status == 200) {
          tanksEspera.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const asignarTanque = async (asign) => {
      try {
        if (asign === 'noData') {
          Swal.fire("Error", 'No existe un tanque para asignar.', "error")
          return
        }

        if (store.state.tanques.llenaderasEstado.estado == 1) {
          Swal.fire("Info", 'No se puede realizar la asignación, compruebe el estado de la llenadera', "error")
          return
        }

        const { llenaderaSelected, assignated, tanque } = asign
        if (!assignated) {
          return
        }
        const form = {
          tanque: tanque.atName,
          llenadera: llenaderaSelected.numero
        }
        const res = await asignarLlenadera(form)
        const { data, status } = res
        if (status == 201) {
          llenaderas.value = store.state.tanques.llenaderas
          store.commit('tanques/deleteTankIWaitingList',tanque.id)
          getTanquesEspera()
          // Pendiente refrescar lista de salida
          Swal.fire("Hecho", `La llenadera ${llenaderaSelected.numero} ha aceptado la asignación.`, "success")
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    } */

    const fetchUsers = async () => {
      try {
        const res = await fetchUsuarios()
        const { data, status } = res
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }
    
    onMounted(() => {
      /* if (tanksEspera.value.length == 0) {
        getTanquesEspera()
      }
      if (llenaderas.value.length < 1) {
        getDataLlenaderas()
      }
      if (Object.keys(estadoLlenadera.value).length < 1) {
        getDataEstadoLlenadera()
      } */
      if (barreraEntrada.value || Object.keys(barreraEntrada.value).length < 1) {
        fetchDataBarreraEntrada()
      }

      if (barreraVerificacion.value || Object.keys(barreraVerificacion.value).length < 1) {
        fetchDataBarreraVerificacion()
      }

      if (barreraSalida.value || Object.keys(barreraSalida.value).length < 1) {
        fetchDataBarreraSalida()
      }

      if (antenaEntrada.value || Object.keys(antenaEntrada.value).length < 1) {
        fetchDatosAntenaEntrada()
      }

      if (Object.keys(antenaVerificacion.value).length < 1) {
        fetchDatosAntenaVerificacion()
      }

      if (antenaSalida.value || Object.keys(antenaSalida.value).length < 1) {
        fetchDatosAntenaSalida()
      }

      if (usuarios.value || usuarios.value.length < 1 ) {
        fetchUsers()
      }
      
      /* if (Object.keys(lastEntry.value).length < 1) {
        getLastTankEntry()
      }
      if (Object.keys(lastAsign.value).length < 1) {
        getLastTankAsign()
      }
      if (Object.keys(lastExit.value).length < 1) {
        getLastTankExit()
      }
      if (tanksSalida.value.length == 0) {
        getTanquesSalida()
      } */
    })

    return {
      dataAntenaEntrada,
      dataAntenaVerificacion,
      dataAntenaSalida,
      openForm,
      dataBarreraEntrada,
      dataBarreraVerificacion,
      dataBarreraSalida,
      toggleEntrada,
      toggleVerificacion,
      toggleSalida,
      /* tanksSalida, */
      /* lastEntry,
      lastAsign,
      lastExit,
      llenaderas,
      desasignarLlenadera, */
      /* setDespacho,
      estadoLlenadera,
      tanksEspera,
      asignarTanque, */
    }
  },
}
</script>