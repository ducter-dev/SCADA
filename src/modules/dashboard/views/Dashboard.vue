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
              <TarjetaUltimaEntrada :data="dataLastEntry" :barrera="dataBarreraEntrada" @openForm="openForm"
                @toggleChange="toggleEntrada" />
            </div>
            <div class="flex flex-col justify-center items-center">
              <TarjetaAsignacion :llenaderas="dataLlenaderas" :barrera="dataBarreraVerificacion"
                :data="dataTanksEspera.length > 0 ? dataTanksEspera[0] : {}" :estado="dataEstadoLlenadera"
                @toggleChange="toggleVerificacion" @despachar="setDespacho" @aceptarAsignacion="aceptarAsignacion"
                @reasignarAsignacion="reasignarAsignacion" @siguienteAsignacion="siguienteAsignacion"
                @cancelarAsignacion="cancelarAsignacion" />
            </div>
            <div class="flex justify-center items-center">
              <TarjetaUltimaSalida :barrera="dataBarreraSalida" :data="dataLastExit" @toggleChange="toggleSalida" />
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items center">
          <div class="flex justify-center items-center">
            <TarjetaUltimasCargas :salidas="dataTanksSalida" />
          </div>
          <div class="flex justify-center items-center">
            <TarjetaLlenaderas :data="dataEstadoLlenadera" @desasignarLlenadera="desasignarLlenadera" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center h-56 overflow-y-scroll">
      <div
        class="w-full flex justify-center items-center p-2 m-2 bg-white rounded-lg border border-gray-200 shadow-md mt-24">
        <TablaEspera :tanques="dataTanksEspera" />
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
import useTanqueSalida from '../../tanques/composables/useTanqueSalida'
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'
import useTanqueEspera from '../../tanques/composables/useTanqueEspera'
import useTanqueServicio from '../../tanques/composables/useTanqueServicio'
import useLlenaderas from '../../tanques/composables/useLlenaderas'
import TablaEspera from '../../tanques/components/TableEspera.vue'
import { useRouter } from 'vue-router'
import useToast from "../../dashboard/composables/useToast";
import { ref, computed, onMounted } from 'vue'

const { addToast } = useToast()

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
      fetchBarreraEntrada, fetchBarreraSalida, fetchBarreraVerificacion, acceptAssignment, nextFiller, reassignAllocation, cancelAllocation } = useDashboard()

    const { fetchUsuarios, getUsuarios } = useUsuario()
    const { fetchTanksSalidas, fetchUltimaSalida, getTanquesInSalida, getLastTankExit } = useTanqueSalida()
    const { fetchUltimaEntrada, getLastTankEntry } = useTanqueEntrada()
    const { fetchTanksInEspera, getTanquesInEspera, deleteTanqueEspera } = useTanqueEspera()
    const { fetchUltimaAsignacion, getLastTankAsign } = useTanqueServicio()
    const { fetchLlenaderas, resetLlenadera, fetchEstadoLlenadera, changeEstadoLlenadera, asignarLlenadera, getLlenaderas, getLlenaderasLibres,
      getLlenaderasEstado, getLlenaderaAceptaAsignacion, getLlenaderasFiltradas } = useLlenaderas()

    const antenaEntrada = computed(() => getAntenaEntrada())
    const antenaVerificacion = computed(() => getAntenaVerificacion())
    const antenaSalida = computed(() => getAntenaSalida())
    const usuarios = computed(() => getUsuarios())
    const barreraEntrada = computed(() => getBarreraEntrada())
    const barreraVerificacion = computed(() => getBarreraVerificacion())
    const barreraSalida = computed(() => getBarreraSalida())
    const estadoLlenadera = computed(() => getLlenaderasEstado())
    const listaEspera = computed(() => getTanquesInEspera())
    const listaSalida = computed(() => getTanquesInSalida())
    const llenaderas = computed(() => getLlenaderasFiltradas())

    const dataAntenaEntrada = ref({})
    const dataAntenaVerificacion = ref({})
    const dataAntenaSalida = ref({})
    const dataBarreraEntrada = ref({})
    const dataBarreraVerificacion = ref({})
    const dataBarreraSalida = ref({})
    let dataEstadoLlenadera = ref({})
    let dataTanksEspera = ref([])
    let dataTanksSalida = ref([])
    let dataLastEntry = ref({})
    let dataLastAsign = ref({})
    let dataLastExit = ref({})
    let dataLlenaderas = ref([])

    const fetchDatosAntenaEntrada = async () => {
      try {
        const res = await fetchAntenaEntrada()
        const { data, status } = res
        if (status == 200) {
          dataAntenaEntrada.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDatosAntenaVerificacion = async () => {
      try {
        const res = await fetchAntenaVerificacion()
        const { data, status } = res
        if (status == 200) {
          dataAntenaVerificacion.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDatosAntenaSalida = async () => {
      try {
        const res = await fetchAntenaSalida()
        const { data, status } = res
        if (status == 200) {
          dataAntenaSalida.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataBarreraEntrada = async () => {
      try {
        const res = await fetchBarreraEntrada()
        const { data, status } = res
        if (status == 201) {
          dataBarreraEntrada.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataBarreraVerificacion = async () => {
      try {
        const res = await fetchBarreraVerificacion()
        const { data, status } = res
        if (status == 201) {
          dataBarreraVerificacion.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataEstadoLlenadera = async () => {
      try {
        const res = await fetchEstadoLlenadera()
        const { data, status } = res
        if (status == 201) {
          dataEstadoLlenadera.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataBarreraSalida = async () => {
      try {
        const res = await fetchBarreraSalida()
        const { data, status } = res
        if (status == 201) {
          dataBarreraSalida.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const openForm = () => {
      router.push('/dashboard/entrada/manual')
    }

    const toggleEntrada = async (toggle) => {
      return
      try {
        const res = await changeBarreraEntrada(toggle)
        const { data, status } = res
        if (status == 201) {
          dataBarreraEntrada.value = data
          addToast({
            message: {
              title: "Barrera de Entrada",
              message:  `La barrera de entrada ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const toggleVerificacion = async (toggle) => {
      return
      try {
        const res = await changeBarreraVerificacion(toggle)
        const { data, status } = res
        if (status == 201) {
          dataBarreraVerificacion.value = data
          addToast({
            message: {
              title: "Barrera de Verificación",
              message:  `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const toggleSalida = async (toggle) => {
      return
      try {
        const res = await changeBarreraSalida(toggle)
        const { data, status } = res
        if (status == 201) {
          dataBarreraSalida.value = data

          addToast({
            message: {
              title: "Barrera de Verificación",
              message:  `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataTanksInEspera = async () => {
      try {
        const res = await fetchTanksInEspera()
        const { data, status } = res
        if (status == 200) {
          dataTanksEspera.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataTanksSalida = async () => {
      try {
        const res = await fetchTanksSalidas()
        const { data, status } = res
        if (status == 200) {
          dataTanksSalida.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataLastEntry = async () => {
      try {
        const res = await fetchUltimaEntrada()
        const { data, status } = res
        if (status == 200) {
          dataLastEntry.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataLastAsign = async () => {
      try {
        const res = await fetchUltimaAsignacion()
        const { data, status } = res
        if (status == 200) {
          dataLastAsign.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataLastExit = async () => {
      try {
        const res = await fetchUltimaSalida()
        const { data, status } = res
        if (status == 200) {
          dataLastExit.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const fetchDataLlenaderas = async () => {
      try {
        const res = await fetchLlenaderas()
        const { data, status } = res
        dataLlenaderas.value = getLlenaderasFiltradas()
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }


    const fetchUsers = async () => {
      try {
        const res = await fetchUsuarios()
        const { data, status } = res
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const setDespacho = async (orden) => {
      try {
        const res = await changeEstadoLlenadera(orden)
        const { data, status } = res
        if (status == 201) {
          dataEstadoLlenadera.value = data
          addToast({
            message: {
              title: "Estado Llenadera",
              message:  `La llenadera ha sido ${data.estado == 1 ? 'Detenida' : 'Liberada'}.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }


    const asignarTanque = async (asign) => {
      try {
        /* 3. Revisar que se haya seleccionado un tanque para asignar */
        if (asign === 'noData') {
          addToast({
            message: {
              title: "¡Error!",
              message: "No existe un tanque para asignar.",
              type: "error"
            },
          });
          return
        }

        /* 4. Revisar el estado de la llenadera */
        console.log("🚀 ~ file: Dashboard.vue:410 ~ asignarTanque ~ dataEstadoLlenadera.value", dataEstadoLlenadera.value)
        if (dataEstadoLlenadera.value == 1) {
          addToast({
            message: {
              title: "¡Atención!",
              message: "No se puede realizar la asignación, compruebe el estado de la llenadera.",
              type: "error"
            },
          });
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

        /* 5. Realizar la asignación del autotanque */
        const res = await asignarLlenadera(form)
        const { data, status } = res
        if (status == 201) {

          dataLlenaderas.value = getLlenaderasFiltradas()
          deleteTanqueEspera(tanque)
          /* Pendiente refrescar lista de salida */
          addToast({
            message: {
              title: "¡Éxito!",
              message:`La llenadera ${llenaderaSelected.numero} ha aceptado la asignación.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const aceptarAsignacion = async () => {
      try {
        const res = await acceptAssignment()
        const { data, status } = res
        if (status == 201) {
          addToast({
            message: {
              title: "¡Éxito!",
              message: "Se acepto la asignación correctamente.",
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const siguienteAsignacion = async () => {
      try {
        const res = await nextFiller()
        const { data, status } = res
        if (status == 201) {
          addToast({
            message: {
              title: "¡Éxito!",
              message: "Se establecio la siguiente llenadera correctamente.",
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const reasignarAsignacion = async () => {
      try {
        const res = await reassignAllocation()
        if (res.data) {
          addToast({
            message: {
              title: "¡Éxito!",
              message: "Se reasigno la asignación correctamente.",
              type: "success"
            },
          });
        } else if (!res.ok) {
          addToast({
            message: {
              title: "¡Error!",
              message: res.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const cancelarAsignacion = async () => {
      try {
        const res = await cancelAllocation()
        if (res.data) {
          addToast({
            message: {
              title: "¡Éxito!",
              message: "Se cancelo la asignación correctamente.",
              type: "success"
            },
          });
        } else if (!res.ok) {
          addToast({
            message: {
              title: "¡Error!",
              message: res.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    const desasignarLlenadera = async (llenadera) => {
      try {
        const res = await resetLlenadera(llenadera)
        const { data, status } = res
        if (status == 201) {
          addToast({
            message: {
              title: "¡Éxito!",
              message: "Se desasigno correctamente.",
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error"
            },
          });
        }
      } catch (error) {
        addToast({
            message: {
              title: "¡Error!",
              message:  `Error: ${error.message}`,
              type: "error"
            },
          });
      }
    }

    onMounted(() => {

      if (listaEspera.value || listaEspera.value.length == 0) {
        fetchDataTanksInEspera()
      } else {
        dataTanksEspera.value = listaEspera.value
      }

      if (listaSalida.value || listaSalida.value.length == 0) {
        fetchDataTanksSalida()
      } else {
        dataTanksSalida.value = listaSalida.value
      }

      fetchDataLastEntry()
      fetchDataLastAsign()
      fetchDataLastExit()

      if (estadoLlenadera.value || Object.keys(estadoLlenadera.value).length < 1) {
        fetchDataEstadoLlenadera()
      } else {
        dataEstadoLlenadera.value = estadoLlenadera.value
      }

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

      if (usuarios.value || usuarios.value.length < 1) {
        fetchUsers()
      }

      if (llenaderas.value || llenaderas.value.length < 1) {
        fetchDataLlenaderas()
      }
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
      dataEstadoLlenadera,
      dataTanksEspera,
      dataTanksSalida,
      dataLastEntry,
      dataLastAsign,
      dataLastExit,
      dataLlenaderas,
      setDespacho,
      asignarTanque,
      desasignarLlenadera,
      aceptarAsignacion,
      siguienteAsignacion,
      reasignarAsignacion,
      cancelarAsignacion,
    }
  },
}
</script>