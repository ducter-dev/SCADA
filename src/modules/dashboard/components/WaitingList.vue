<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import useDashboard from '../composables/useDashboard'
import useWaitingTank from '../../tanques/composables/useTanqueEspera'
import useFillers from '../../tanques/composables/useLlenaderas'
import useToast from "../../dashboard/composables/useToast"
import IconArrowsRotate from '../../../assets/icons/arrows-rotate.svg'
import IconBars from "../../../assets/icons/bars.svg"
import Toggle from '@vueform/toggle'
import useEventsBus from "../../../layout/eventBus"
import IconArrowsTurnRight from '../../../assets/icons/arrows-turn-right.svg'
import IconCheckToSlot from '../../../assets/icons/check-to-slot.svg'
import IconBan from '../../../assets/icons/ban.svg'
import IconArrowsTurnToDots from '../../../assets/icons/arrows-turn-to-dots.svg'
import IconCircleStop from '../../../assets/icons/circle-stop.svg'
import IconPlay from '../../../assets/icons/play.svg'
import useBitacora from "../../bitacora/composables"
import useAuth from "../../auth/composables/useAuth"
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import useTanque from '../../tanques/composables/useTanque'

const { bus } = useEventsBus()
const { fetchEstadoLlenadera, getLlenaderasEstado, changeEstadoLlenadera } = useFillers()
const { getLastAssignment, fetchTanksInEspera, resetTanquesEspera, getTanquesInEspera } = useWaitingTank()
const { fetchBarreraVerificacion, getBarreraVerificacion, getCurrentFiller, nextFiller, reassignAllocation, cancelAllocation, acceptAssignment,
  changeBarreraVerificacion, preAsignment } = useDashboard()
const { getLlenaderas } = useTanque()

const { addToast } = useToast()
const loaderFiller = ref(false)
const loadData = ref(false)
const loadDataFillerStatus = ref(false)
const getFiller = ref(false)
const filler = ref()
const listWaitingTank = computed(() => getLastAssignment())

const fillerStatus = computed(() => getLlenaderasEstado())  // Estado de la llenadera en el store
const fillers = computed(() => getLlenaderas())             // Llenaderas del store
const tanksWaiting = computed(() => getTanquesInEspera())   // Tanques en la lista de la espera en el store
let dataFillerStatus = ref({})

const { insertBitacora } = useBitacora()
const { getCurrentUser } = useAuth()
const currentUser = computed(() => getCurrentUser())
const dataWaitingTank = ref({})

const loadDataBarrierStatus = ref(false)
let dataBarrierVerificationStatus = ref({})
const barrierVerification = computed(() => getBarreraVerificacion())

// ** Variable para mostrar el tanque para asignar.
const showTankForAssigment = ref(false)

/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
/* const  setDataFromResult = (data) => {
  dataWaitingTanks.value = data
  loadData.value = false
  loadDataBarrierStatus.value = false
} */

/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromFetchingWaitingTanks = (data) => {
  dataFillerStatus.value = data
  loadDataFillerStatus.value = false
  loadDataBarrierStatus.value = false
}

const setDataFromFetchDataBarrierVerification = (data) => {
  dataBarrierVerificationStatus.value = data
  loadDataBarrierStatus.value = false
}

/**
 *  Función que consulta `fetchLastAssignment`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */


const fetchFillerStatus = async () => {
  try {
    const res = await fetchEstadoLlenadera()
    //console.log("🚀 ~ file: WaitingList.vue:115 ~ fetchFillerStatus ~ res:", res)
    const { data, status } = res
    if (status == 200) {
      setDataFromFetchingWaitingTanks(data.estado)
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error",
          component: "WaitingList - fetchFillerStatus()"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error",
        component: "WaitingList | Catch - fetchFillerStatus()"
      },
    })
  }
}

const currentFiller = async () => {
  loaderFiller.value = true
  try {
    const res = await getCurrentFiller()
    const { data, status } = res
    if (status == 200) {
      //filler.value = data.llenaderaDisponible
      filler.value = 5
      getFiller.value = true
      getTankToAssigment()
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: res.message,
          type: "error",
          component: "WaitingList - currentFiller()"
        },
      })
    }
    loaderFiller.value = false
  } catch (error) {
    loaderFiller.value = false
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error",
        component: "WaitingList | Catch - currentFiller()"
      },
    })
  }
}

const setTipo = (tipo) => {
  switch (tipo) {
    case 0:
      return 'Sencillo'
    case 1:
      return 'Full A'
    case 2:
      return 'Full B'
  }
}

const setConector = (conector) => {
  switch (conector) {
    case 1:
      return 'Izq.'
    case 2:
      return 'Der.'
    case 3:
      return 'Ambos'
  }
}

const nextAssignment = async () => {
  try {
    const res = await nextFiller()
    const { data, status } = res
    if (status == 201) {
      currentFiller()
      addToast({
        message: {
          title: "¡Éxito!",
          message: "Se establecio la siguiente llenadera correctamente.",
          type: "success"
        },
      })

    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

const reassignAssignment = async () => {
  try {
    const res = await reassignAllocation()
    if (res.data) {
      addToast({
        message: {
          title: "¡Éxito!",
          message: "Se reasigno la asignación correctamente.",
          type: "success"
        },
      })
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} reasignó la llenadera.`,
        evento: 15,
      }
      insertBitacora(objBitacora)
    } else if (!res.ok) {
      addToast({
        message: {
          title: "¡Error!",
          message: res.message,
          type: "error"
        },
      })
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} reasignó la llenadera.`,
        evento: 15,
      }
      insertBitacora(objBitacora)
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

const acceptAssignmentFunction = async () => {
  try {
    const res = await preAsignment(dataWaitingTank.value.atName)
    const { data, status } = res
    if (status == 201) {

      const resA = await acceptAssignment(dataWaitingTank.value.atName)
      if (resA.status == 200) {

        // Reseteamos la lista de espera 
        resetTanquesEspera()

        // Llenamos la lista de espera 
        fetchTanksInEspera()

        // Ocultamos tanque de asignacion si esta detenido el despacho

        if (fillerStatus.estado != 0) {
          showTankForAssigment.value = false
        }

        const objBitacora = {
          user: currentUser.value.id,
          actividad: `El usuario ${currentUser.value.username} aceptó la asignación.`,
          evento: 13,
        }
        insertBitacora(objBitacora)
        addToast({
          message: {
            title: "¡Éxito!",
            message: "Se acepto la asignación correctamente.",
            type: "success"
          },
        })
      }
    } else {
      showTankForAssigment.value = false
      addToast({
        message: {
          title: "¡Error!",
          message: data,
          type: "error"
        },
      })
    }
  } catch (error) {
    showTankForAssigment.value = false
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

const unassign = async () => {
  try {
    const res = await cancelAllocation()
    if (res.data) {
      showTankForAssigment.value = false
      addToast({
        message: {
          title: "¡Éxito!",
          message: "Se cancelo la asignación correctamente.",
          type: "success"
        },
      })
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} canceló la asignación.`,
        evento: 14,
      }
      insertBitacora(objBitacora)
    } else if (!res.ok) {
      addToast({
        message: {
          title: "¡Error!",
          message: res.message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

const fetchDataBarrierVerification = async () => {
  try {
    const res = await fetchBarreraVerificacion()
    //console.log("🚀 ~ file: WaitingList.vue:322 ~ fetchDataBarrierVerification ~ res:", res)
    const { data, status } = res
    if (status == 200) {
      setDataFromFetchDataBarrierVerification(data.estado)
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error",
          component: "LastEntry - fetchDataBarrierEntry()"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error",
        component: "LastEntry | Catch - fetchDataBarrierEntry()"
      },
    })
  }
}

const stopDispacth = async () => {
  try {
    const res = await changeEstadoLlenadera(1)
    const { data, status } = res
    if (status == 201) {
      addToast({
        message: {
          title: "¡Éxito!",
          message: `El usuario ${currentUser.value.username} detuvo el despacho de la llenaderas.`,
          type: "success"
        },
      })
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} detuvo el despacho de la llenaderas.`,
        evento: 16,
      }
      insertBitacora(objBitacora)
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

const releaseDispacth = async () => {
  try {
    const res = await changeEstadoLlenadera(0)
    const { data, status } = res
    if (status == 201) {
      getTankToAssigment()
      showTankForAssigment.value = true
      addToast({
        message: {
          title: "¡Éxito!",
          message: `El usuario ${currentUser.value.username} liberó el despacho de la llenaderas.`,
          type: "success"
        },
      })
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} liberó el despacho de la llenaderas.`,
        evento: 17,
      }
      insertBitacora(objBitacora)
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }
}

/** Función para obtener el primer tanque adecuado para asignarse 
*   Se necesita la llenadera disponible y sus características */ 

const getTankToAssigment = () => {
  //  Llenadera disponible y sus caractersticas
  const llenaderaDisponible = filler.value
  console.log("🚀 ~ file: WaitingList.vue:454 ~ getTankToAssigment ~ llenaderaDisponible:", llenaderaDisponible)
  if (llenaderaDisponible == 0) {
    console.log('Aqui salimos ...')
    // return
  }

  const llenaderaSt = fillers.value.find( ll => ll.numero == llenaderaDisponible)
  console.log("🚀 ~ file: WaitingList.vue:456 ~ getTankToAssigment ~ llenaderaSt:", llenaderaSt)
  
  // Recorremos los tanques de la lista de espera para encontrar el tanque apropiado.

  const tank = tanksWaiting.value.find( t => t.conector == llenaderaSt.conector || t.conector == 3)
  console.log("🚀 ~ file: WaitingList.vue:470 ~ getTankToAssigment ~ tank:", tank)
  dataWaitingTank.value = tank  
  console.log("🚀 ~ file: WaitingList.vue:472 ~ getTankToAssigment ~ dataWaitingTank.value:", dataWaitingTank.value)
}

watch(() => bus.value.get('reloadData'), (val) => {
  currentFiller()
  fetchFillerStatus()
  fetchDataBarrierVerification()
})

watch(
  () => dataBarrierVerificationStatus.value, async (estadoBarrera) => {
    //console.log("🚀 ~ file: WaitingList.vue:357 ~ estadoBarrera:", estadoBarrera)
    const res = await changeBarreraVerificacion(estadoBarrera)
    //console.log("🚀 ~ file: WaitingList.vue:359 ~ res:", res)
    const { data, status } = res
    if (status == 201) {
      const objBitacora = {
        user: currentUser.value.id,
        actividad: `El usuario ${currentUser.value.username} cambió el estado de la barrera de entrada a: ${estadoBarrera ? 'Abierta' : 'Cerrada'}.`,
        evento: estadoBarrera ? 20 : 21,
      }
      //console.log("🚀 ~ file: WaitingList.vue:367 ~ objBitacora:", objBitacora)
      insertBitacora(objBitacora)
      addToast({
        message: {
          title: "Éxito!",
          message: `Se cambio el estado de la barrera de verificación.`,
          type: "success"
        },
      })
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: `Error: No se pudo cambiar el estado de la barrera de verificación`,
          type: "error",
          component: "WaitingList | Catch - changeBarreraVerificacion()"
        },
      })
    }
  }
)

onMounted(() => {
  fetchFillerStatus()
  currentFiller()
  if (barrierVerification.value.length != 0) {
    //console.log("🚀 ~ file: LastEntry.vue:392 ~ onMounted ~ barrierVerification.value:", barrierVerification.value.estado)
    // Establece la información del store
    setDataFromFetchDataBarrierVerification(barrierVerification.value.estado)
  } else {
    // Realiza la petición al servidor
    fetchBarreraVerificacion()
  }
})
</script>
<template>
  <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
    <div class="p-2 border border-solid border-slate-300">
      <div class="flex items-start">
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="mr-5">
            <IconBars class="w-4 h-4 text-slate-500" />
          </MenuButton>
          <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
              class="absolute left-0 mt-2 origin-top-right bg-white divide-y shadow-lg w-44 divide-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="px-1 py-1 divide-y">
                <MenuItem v-slot="{ active }">
                <button @click="nextAssignment()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">

                  <IconArrowsTurnRight class="w-5 h-5 mr-2 text-green-400" />
                  Siguiente llenadera
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="acceptAssignmentFunction()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">
                  <IconCheckToSlot class="w-5 h-5 mr-2 text-blue-400" />

                  Aceptar asignación
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="unassign()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">
                  <IconBan class="w-5 h-5 mr-2 text-orange-400" />

                  Cancelar asignación
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="reassignAssignment()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">
                  <IconArrowsTurnToDots class="w-5 h-5 mr-2 text-indigo-400" />
                  Reasignar llenadera
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="stopDispacth()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">
                  <IconCircleStop class="w-5 h-5 mr-2 text-red-400" />
                  Detener despacho
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="releaseDispacth()" :class="[
                    active ? 'bg-slate-50 dark:text-white' : 'text-slate-900',
                    'group flex w-full items-center px-1 py-1 text-sm',
                  ]">
                  <IconPlay class="w-5 h-5 mr-2 text-lime-400" />
                  Liberar despacho
                </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <legend class="text-base font-medium text-slate-900 dark:text-white">Menú de asignación de AT'S</legend>
      </div>
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <LCardListItem label="Número de autotanque" :value="showTankForAssigment ? dataWaitingTank.atName : ''" />
        <LCardListItem label="Tipo de autotanque" :value="setTipo(showTankForAssigment ? dataWaitingTank.atTipo : 0)" />
        <LCardListItem label="Volumen programado" :value="showTankForAssigment ? dataWaitingTank.capacidad : 0" />
        <LCardListItem label="Tipo de conector" :value="setConector(showTankForAssigment ? dataWaitingTank.conector : 3)" />

        <LCardListItem label="Llenadera disponible">
          <span v-if="getFiller">{{ filler }}</span>
          <div class="flex justify-between mx-2 text-sm font-semibold text-red-500" v-else>
            <span>Error</span>
            <IconArrowsRotate class="w-4 h-4 ml-2 cursor-pointer text-slate-400 "
              :class="loaderFiller ? 'animate-spin' : ''" @click="currentFiller" v-tippy="'Actualizar información'" />
          </div>
        </LCardListItem>
        <LCardListItem value-class="uppercase" label="Lista de despacho"
          :value="fillerStatus.estado === 0 ? 'Liberada' : 'Detenida'" />
      </ul>
    </div>
  </div>
  <div class="max-w-sm mt-5 bg-transparent">
    <div class="p-2 border border-solid border-slate-300">
      <div class="py-1">
        <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300">Barrera de verificación
            </p>
          </div>
          <div class="flex items-center justify-center mx-2">
            <Toggle v-model="dataBarrierVerificationStatus" offLabel="Cerrada" onLabel="Abierta" :classes="{
                toggle: 'flex w-[5.5rem] py-2 relative cursor-pointer transition items-center box-content text-sm leading-none',
                toggleOn: 'bg-green-200 dark:bg-green-700 border-salte-300 dark:border-salte-800 justify-start text-green-900 dark:text-white',
                toggleOff: 'bg-red-200 dark:bg-red-700 border-salte-300 dark:border-salte-800 justify-end text-red-900 dark:text-white',
                toggleOnDisabled: 'bg-slate-200 border-slate-200 dark:bg-slate-700 dark:border-slate-800 justify-start text-slate-400 dark:text-slate-400 cursor-not-allowed',
                toggleOffDisabled: 'bg-slate-200 border-slate-200 dark:bg-slate-700 dark:border-slate-800 justify-end text-slate-400 dark:text-slate-400 cursor-not-allowed',
                handle: 'inline-block bg-white dark:bg-slate-600 w-5 h-5 p-1 mx-1 top-1 absolute transition-all',
                handleOn: 'left-20 transform -translate-x-full',
                handleOff: 'left-0',
                handleOnDisabled: 'bg-slate-100  left-20 transform -translate-x-full',
                handleOffDisabled: 'bg-slate-100  left-0',
                label: 'text-center border-box whitespace-nowrap select-none mx-2',
              }" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-2 mt-2">
    <button type="button"
      class="px-2 py-1 text-sm font-medium text-center border text-slate-900 border-slate-800 hover:text-white hover:bg-slate-900 focus:ring-2 focus:outline-none focus:ring-slate-300 dark:border-slate-600 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-800">
      Imprimir ticket para carga
    </button>
  </div>
</template>