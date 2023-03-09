<template>
  <div
    class="space-y-4 border-b sm:flex sm:items-center sm:justify-between sm:space-y-0 border-slate-200 dark:border-slate-700">
    <div class="flex-1 min-w-0">
      <h2 class="text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-2xl sm:leading-9 sm:truncate ">
        Inicio
      </h2>
    </div>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid gap-5 grid-cols-15">
      <div class="flex flex-col col-span-3">
        <InputAntenna/>
        <LastEntry/> 
      </div>
      <div class="flex flex-col col-span-3">
        <AntennaVerification/>
        <WaitingList/>
      </div>
      <div class="flex flex-col col-span-3">
        <OutputAntenna/>
        <!--<TarjetaUltimaSalida :barrera="dataBarreraSalida" :data="dataLastExit" @toggleChange="toggleSalida" />-->
        <LastOutput/>
      </div>
      <div class="col-span-2">
        <div class="max-w-sm p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Estatus Llenaderas</legend>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
              <LCardListActionButton label-button="Desasignar" value-filler="5" />
              <LCardListActionButton label-button="Desasignar" value-filler="6" />
              <LCardListActionButton label-button="Desasignar" value-filler="7" />
              <LCardListActionButton label-button="Desasignar" value-filler="8" />
              <LCardListActionButton label-button="Desasignar" value-filler="9" />
              <LCardListActionButton label-button="Desasignar" value-filler="10" />
              <LCardListActionButton label-button="Desasignar" value-filler="11" />
              <LCardListActionButton label-button="Desasignar" value-filler="12" />
              <LCardListActionButton label-button="Desasignar" value-filler="13" />
              <LCardListActionButton label-button="Desasignar" value-filler="14" />
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <TarjetaUltimasCargas />
      </div>
    </div>
    <div class="border-t border-slate-300 dark:border-slate-700"></div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <TablaEspera/>
      </div>
    </div>
  </div>
  <!--
  <div class="flex flex-col w-full m-2 sm:mx-12 sm:my-2">
    <div class="flex items-start justify-between w-full">
      <div class="flex items-start justify-between w-full">
        <div class="flex flex-col items-center justify-between w-full">
          <div class="flex items-start justify-around w-full">
            <div class="flex items-center justify-center">
              <TarjetaUltimaEntrada :data="dataLastEntry" :barrera="dataBarreraEntrada" @openForm="openForm"
                @toggleChange="toggleEntrada" />
            </div>
            <div class="flex flex-col items-center justify-center">
              <TarjetaAsignacion :llenaderas="dataLlenaderas" :barrera="dataBarreraVerificacion"
                :data="dataTanksEspera.length > 0 ? dataTanksEspera[0] : {}" :estado="dataEstadoLlenadera"
                @toggleChange="toggleVerificacion" @despachar="setDespacho" @aceptarAsignacion="aceptarAsignacion"
                @reasignarAsignacion="reasignarAsignacion" @siguienteAsignacion="siguienteAsignacion"
                @cancelarAsignacion="cancelarAsignacion" />
            </div>
            <div class="flex items-center justify-center">
              <TarjetaUltimaSalida :barrera="dataBarreraSalida" :data="dataLastExit" @toggleChange="toggleSalida" />
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items center">
          <div class="flex items-center justify-center">
            <TarjetaUltimasCargas />
          </div>
          <div class="flex items-center justify-center">
            <TarjetaLlenaderas :data="dataEstadoLlenadera" @desasignarLlenadera="desasignarLlenadera" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center h-56 overflow-y-scroll">
      <div
        class="flex items-center justify-center w-full p-2 m-2 mt-24 bg-white border shadow-md border-slate-200">
        <TablaEspera :tanques="dataTanksEspera" />
      </div>
    </div>
  </div>
  -->
</template>

<script>
import WaitingList from '../components/WaitingList.vue'
import LastEntry from '../components/LastEntry.vue'
import InputAntenna from '../components/InputAntenna.vue'
import OutputAntenna from '../components/OutputAntenna.vue'
import LastOutput from '../components/LastOutput.vue'
import AntennaVerification from '../components/AntennaVerifcation.vue'
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
import useToast from "../../dashboard/composables/useToast"
import { ref, computed, onMounted } from 'vue'
const { addToast } = useToast()

export default {
  components: {
    TarjetaVerificacion,
    TarjetaSalida,
    TarjetaUltimasCargas,
    TarjetaAsignacion,
    TarjetaUltimaEntrada,
    TarjetaUltimaSalida,
    TarjetaLlenaderas,
    TablaEspera,
    WaitingList,
    InputAntenna,
    AntennaVerification,
    OutputAntenna,
    LastEntry,
    LastOutput
},
  setup() {
    const router = useRouter()

    const { getBarreraEntrada, changeBarreraEntrada, getBarreraVerificacion,
      changeBarreraVerificacion, getBarreraSalida, changeBarreraSalida, fetchBarreraEntrada, fetchBarreraSalida,
       fetchBarreraVerificacion, acceptAssignment, nextFiller, reassignAllocation, cancelAllocation } = useDashboard()

    const { fetchUsuarios, getUsuarios } = useUsuario()
    const { fetchUltimaSalida } = useTanqueSalida()
    const { fetchUltimaEntrada } = useTanqueEntrada()
    const { fetchTanksInEspera, getTanquesInEspera, deleteTanqueEspera } = useTanqueEspera()
    const { fetchUltimaAsignacion } = useTanqueServicio()
    const { fetchLlenaderas, resetLlenadera, fetchEstadoLlenadera, changeEstadoLlenadera, asignarLlenadera, getLlenaderasEstado,
       getLlenaderasFiltradas } = useLlenaderas()

    const usuarios = computed(() => getUsuarios())
    const barreraEntrada = computed(() => getBarreraEntrada())
    const barreraVerificacion = computed(() => getBarreraVerificacion())
    const barreraSalida = computed(() => getBarreraSalida())
    const estadoLlenadera = computed(() => getLlenaderasEstado())
    const listaEspera = computed(() => getTanquesInEspera())
    const llenaderas = computed(() => getLlenaderasFiltradas())

    const dataAntenaSalida = ref({})
    const dataBarreraEntrada = ref({})
    const dataBarreraVerificacion = ref({})
    const dataBarreraSalida = ref({})
    let dataEstadoLlenadera = ref({})
    let dataTanksEspera = ref([])
    let dataLastEntry = ref({})
    let dataLastAsign = ref({})
    let dataLastExit = ref({})
    let dataLlenaderas = ref([])

    const fetchDataBarreraEntrada = async () => {
      try {
        const res = await fetchBarreraEntrada()
        const { data, status } = res
        if (status == 200) {
          dataBarreraEntrada.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error",
              component:"Dashboard - fetchDataBarreraEntrada()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataBarreraEntrada()"
          },
        });
      }
    }

    const fetchDataBarreraVerificacion = async () => {
      try {
        const res = await fetchBarreraVerificacion()
        const { data, status } = res
        if (status == 200) {
          dataBarreraVerificacion.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error",
              component:"Dashboard - fetchDataBarreraVerificacion()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataBarreraVerificacion()"
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
              type: "error",
              component:"Dashboard - fetchDataEstadoLlenadera()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataEstadoLlenadera()"
          },
        });
      }
    }

    const fetchDataBarreraSalida = async () => {
      try {
        const res = await fetchBarreraSalida()
        const { data, status } = res
        if (status == 200) {
          dataBarreraSalida.value = data
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error",
              component:"Dashboard  - fetchDataBarreraSalida()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataBarreraSalida()"
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
              message: `La barrera de entrada ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
              type: "success"
            },
          });
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error",
              component:"Dashboard | - toggleEntrada()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - toggleEntrada()"
          },
        });
      }
    }

    const toggleVerificacion = async (toggle) => {
      //
      try {
        const res = await changeBarreraVerificacion(toggle)
        const { data, status } = res
        if (status == 201) {
          dataBarreraVerificacion.value = data
          addToast({
            message: {
              title: "Barrera de Verificación",
              message: `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
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
            message: `Error: ${error.message}`,
            type: "error"
          },
        });
      }
    }

    const toggleSalida = async (toggle) => {
      //
      try {
        const res = await changeBarreraSalida(toggle)
        const { data, status } = res
        if (status == 201) {
          dataBarreraSalida.value = data

          addToast({
            message: {
              title: "Barrera de Verificación",
              message: `La barrera de verificación ha sido ${data.estado ? 'Abierta' : 'Cerrada'}.`,
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
            message: `Error: ${error.message}`,
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
              type: "error",
              component:"Dashboard - fetchDataTanksInEspera()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataTanksInEspera()"
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
              type: "error",
              component:"Dashboard - fetchDataLastEntry()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataLastEntry()"
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
              type: "error",
              component:"Dashboard - fetchDataLastExit()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataLastExit()"
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
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchDataLlenaderas()"
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
            message: `Error: ${error.message}`,
            type: "error",
            component:"Dashboard | Catch - fetchUsers()"
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
              message: `La llenadera ha sido ${data.estado == 1 ? 'Detenida' : 'Liberada'}.`,
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
            message: `Error: ${error.message}`,
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
              message: `La llenadera ${llenaderaSelected.numero} ha aceptado la asignación.`,
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
            message: `Error: ${error.message}`,
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
            message: `Error: ${error.message}`,
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
            message: `Error: ${error.message}`,
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
            message: `Error: ${error.message}`,
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
            message: `Error: ${error.message}`,
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
            message: `Error: ${error.message}`,
            type: "error"
          },
        });
      }
    }

    onMounted(() => {

    

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

      if (usuarios.value || usuarios.value.length < 1) {
        fetchUsers()
      }

      if (llenaderas.value || llenaderas.value.length < 1) {
        fetchDataLlenaderas()
      }
    })

    return {
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