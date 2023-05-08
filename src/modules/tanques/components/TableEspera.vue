<script setup>
//Importación de recursos
import { ref, onMounted, computed, watch } from "vue"
import DeleteIcon from "../../../assets/icons/trash-can-solid.svg"
import AlarmIcon from '../../../assets/icons/alarm.svg'
import CallIcon from "../../../assets/icons/call.svg"
import useToast from "../../dashboard/composables/useToast"
import useTanqueEspera from '../../tanques/composables/useTanqueEspera'
import useEventsBus from "../../../layout/eventBus"
import ModalDelete from '../../../layout/components/Modal/Delete.vue'
import ModalPosicion from '../../../layout/components/Modal/Posicion.vue'
import EditTankWaitingList from "./EditTankWaitingList.vue"


/**
 * Declaración de los atributos que son asignables.
 * 
 * @var array<boolean, string, array>
 */
const { bus } = useEventsBus()
const { fetchTanksInEspera, getTanquesInEspera, deleteTanqueEspera, updateTankPosition, callTank, alarmTanks, changeTankPosition } = useTanqueEspera()
const waitingList = computed(() => getTanquesInEspera())
const { addToast } = useToast()
let dataTankWaitingList = ref([])
let loadData = ref(true)
const configModalDelete = ref({})
const showModal = ref(false)
const configModalPosicion = ref({})
const showModalPosicion = ref(false)
const tanqueSelected = ref({})


/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromResult = (data) => {
  dataTankWaitingList.value = data
  loadData.value = false
}

const openModalDelete = (item) => {
  showModal.value = true
  configModalDelete.value = {
    text: `¿Desea eliminar el tanque ${item.atName} de la lista de espera?`,
    okText: 'Eliminar',
    cancelText: 'Cancelar'
  }
  tanqueSelected.value = item
}

const openModalPosition = (item) => {
  showModalPosicion.value = true
  configModalPosicion.value = {
    text: `¿En qué posición desea mover el tanque ${item.atName}?`,
    okText: 'Mover Tanque',
    cancelText: 'Cancelar'
  }
  tanqueSelected.value = item
}

const deleteTankFromList = async (result) => {
  console.log("🚀 ~ file: TableEspera.vue:51 ~ deleteTankFromList ~ result:", result)
  try {

    if (!result) {
      showModal.value = false
      tanqueSelected.value = {}
      return
    }
    
    console.log("🚀 ~ file: TableEspera.vue:74 ~ deleteTankFromList ~ result.destino:", result.destino)
    console.log("🚀 ~ file: TableEspera.vue:75 ~ deleteTankFromList ~ tanqueSelected.value.posicion:", tanqueSelected.value.posicion)
    if (result.destino == tanqueSelected.value.posicion) {
      addToast({
        message: {
          title: "¡Error!",
          message: 'Ha seleccionado la misma posición.',
          type: "error"
        },
      })
      tanqueSelected.value = {}
      showModalPosicion.value = false
      return 
    }
    
    const res = await deleteTanqueEspera(tanqueSelected.value)
    const { data, status } = res

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      dataTankWaitingList.value = []
      fetchDataTankWaitingList()
      addToast({
        message: {
          title: "Éxito!",
          message: `Se elimino ${data.atName} de la lista de espera.`,
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
    // En caso de tener error establece un mensaje de error
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    })
  }

}

const moveTank = async (result) => {
  try {
    if (!result.action) {
      tanqueSelected.value = {}
      configModalPosicion.value = {}
      showModalPosicion.value = false
      return
    }

    const formPosition = {
      inicial: tanqueSelected.value.posicion,
      destino: result.destino
    }

    const res = await changeTankPosition(formPosition)
    const { data, status } = res
    console.log("🚀 ~ file: TableEspera.vue:142 ~ moveTank ~ res:", res)
    console.log("🚀 ~ file: TableEspera.vue:142 ~ moveTank ~ data:", data)

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 201) {
      
        dataTankWaitingList.value = []
        fetchDataTankWaitingList()
        tanqueSelected.value = {}
        configModalPosicion.value = {}
        showModalPosicion.value = false
        addToast({
          message: {
            title: "Éxito!",
            message: data.message,
            type: "success"
          },
        })
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: res.message,
          type: "error",
          component: "TableEspera - moveTank()"
        },
      })
    }
  } catch (error) {
    // En caso de tener error establece un mensaje de error
    console.log(error)
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${res.message}`,
        type: "error",
        component: "TableEspera | Catch - moveTank()"
      },
    })
  }

}

/**
 *  Función que consulta `fetchTanksInEspera`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */
const fetchDataTankWaitingList = async () => {
  try {
    loadData.value = true
    const res = await fetchTanksInEspera()
    const { data, status } = res

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      dataTankWaitingList.value = []
      setDataFromResult(data)
    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error",
          component: "TableEspera - fetchDataTankWaitingList()"
        },
      })
    }
  } catch (error) {
    // En caso de tener error establece un mensaje de error
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error",
        component: "TableEspera | Catch - fetchDataTankWaitingList()"
      },
    })
  }
}

const callTanque = async (item) => {
  // editar tanque
  console.log(`Llamar tanque: ${item.id}`)
  const res = await callTank({ "tanque": item.atName })
    const { data, status } = res

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      if (data.hasOwnProperty('atName')) {
        dataTankWaitingList.value = []
        fetchDataTankWaitingList()
        addToast({
          message: {
            title: "Éxito!",
            message: `Se movio el tanque ${data.atName} al inicio de la lista.`,
            type: "success"
          },
        })
      } else {
        addToast({
          message: {
            title: "Info",
            message: data.message,
            type: "info"
          },
        })
      }

    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error",
          component: "TableEspera - callTanque()"
        },
      })
    }
}

const alarmTanque = async () => {
  console.log(`alarmTanque`)
  const res = await alarmTanks()
    const { data, status } = res

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 201) {
      addToast({
        message: {
          title: "Éxito!",
          message: `Se alarmaron los tanques de la lista de espera.`,
          type: "success"
        },
      })

    } else {
      addToast({
        message: {
          title: "¡Error!",
          message: data.message,
          type: "error",
          component: "TableEspera - alarmTanque()"
        },
      })
    }
}

function setTipo(categoria) {
  switch (categoria) {
    case 0:
      return "Sencillo"
    case 1:
      return "Full A"
    case 2:
      return "Full B"
    case 3:
      return ""
  }
}

function setConector(conector) {
  switch (conector) {
    case 1:
      return "Derecho"
    case 2:
      return "Izquierdo"
    case 3:
      return "Ambos"
    case 4:
      return "Ambos"
  }
}

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var waitingList sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchDataTankWaitingList 
 *  para la obtencion de nueva información.
 */
onMounted(() => {
  fetchDataTankWaitingList()
})

watch(() => bus.value.get('successRegistration'), (val) => {
  dataTankWaitingList.value = []
  fetchDataTankWaitingList()
})

watch(() => bus.value.get('reloadData'), (val) => {
  dataTankWaitingList.value = []
  fetchDataTankWaitingList()
})

watch(() => bus.value.get('successUpdateTanqueWaiting'), (val) => {
  console.log('successUpdateTanqueWaiting')
  dataTankWaitingList.value = []
  fetchDataTankWaitingList()
})

watch(() => bus.value.get('successAcceptAssignment'), (val) => {
  console.log("🚀 ~ file: TableEspera.vue:284 ~ watch ~ successAcceptAssignment")
  dataTankWaitingList.value = []
  fetchDataTankWaitingList()
})

</script>
<template>
  <ModalDelete :config="configModalDelete" :class="showModal ? '' : 'hidden'" @submitModal="deleteTankFromList" />
  <ModalPosicion :config="configModalPosicion" :class="showModalPosicion ? '' : 'hidden'" @submitModal="moveTank" />
  <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
    <div class="border border-solid border-slate-300">
      <div class="flex items-center justify-between">
        <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de espera
          <span class="text-xs text-slate-700 dark:text-slate-200">(Elementos en la lista: <strong>{{
            dataTankWaitingList.length }}</strong> )</span>
        </legend>
        <div class="flex flex-row items-center justify-center ml-2">
          <button class="p-2" @click="alarmTanque()">
            <AlarmIcon class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="currentColor" />
          </button>
          <button class="p-2" @click="fetchDataTankWaitingList()">
            <svg xmlns="http://www.w3.org/2000/svg" :class="loadData ? 'animate-spin' : ''"
              class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 512 512">
              <path
                d="M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
            </svg>
          </button>
        </div>
      </div>
      <LTable :loader="loadData">
        <template #head>
          <tr>
            <LHeaderTh value="Posición" center />
            <LHeaderTh value="AT" center />
            <LHeaderTh value="Tipo" center />
            <LHeaderTh value="Clave" center />
            <LHeaderTh value="Embarque" center />
            <LHeaderTh value="Capacidad" center />
            <LHeaderTh value="Conector" center />
            <LHeaderTh value="Hora ingreso" center />
            <LHeaderTh value="Fecha ingreso" center />
            <LHeaderTh value="Acciones" center />
          </tr>
        </template>
        <template #body>
          <tr v-for="(item, index) in dataTankWaitingList" :key="item.id" v-if="dataTankWaitingList.length > 0"
            class=" odd:bg-white odd:dark:bg-slate-800 even:bg-slate-100 even:dark:bg-slate-600">
            <LBodyTh :value="item.posicion" center />
            <LBodyTd :value="item.atName" center />
            <LBodyTd :value="setTipo(item.atTipo)" center />
            <LBodyTd :value="item.atId" center />
            <LBodyTd :value="item.embarque" center />
            <LBodyTd :value="item.capacidad" center />
            <LBodyTd :value="setConector(item.conector)" center />
            <LBodyTd :value="item.horaEntrada" center />
            <LBodyTd :value="item.fechaEntrada" center />
            <LBodyTd center>

              <div class="inline-flex shadow-sm" role="group">
                <EditTankWaitingList :tanque="item"/>
                <button type="button" @click="openModalPosition(item)"
                  class="px-2 py-1.5 text-sm font-medium text-blue-900 bg-transparent border-t border-b border-r border-blue-900 hover:bg-blue-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-3 h-3" fill="currentColor">
                    <path
                      d="M350 177.5c3.8-8.8 2-19-4.6-26l-136-144C204.9 2.7 198.6 0 192 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26s12.5 14.5 22 14.5h88l0 192c0 17.7-14.3 32-32 32H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32l80 0c70.7 0 128-57.3 128-128l0-192h88c9.6 0 18.2-5.7 22-14.5z" />
                  </svg>
                </button>
                <button type="button" @click="openModalDelete(item)"
                  class="px-2 py-1.5 text-sm font-medium text-red-900 bg-transparent border-t border-b border-red-900 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:bg-red-700">
                  <DeleteIcon class="w-3 h-3" />
                </button>
                <button type="button" @click="callTanque(item)"
                  class="px-2 py-1.5 text-sm font-medium text-slate-900 bg-transparent border border-slate-900 hover:bg-slate-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-slate-500 focus:bg-slate-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-slate-700 dark:focus:bg-slate-700">
                  <CallIcon class="w-3 h-3" />
                </button>
              </div>
            </LBodyTd>
          </tr>
          <tr v-else>
            <LBodyTh value="Sin información" colspan="10" center />
          </tr>
        </template>
      </LTable>
    </div>
  </div>
</template>
