<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import useToast from "../../dashboard/composables/useToast"
import useBitacora from '../../bitacora/composables'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import useEventsBus from "../../../layout/eventBus"

/**
 * Declaración de los atributos que son asignables.
 * 
 * @var array<boolean, string, array>
*/

const { bus } = useEventsBus()
const { fetchBitacora, getBitacora } = useBitacora()
const records = computed(() => getBitacora())
const date = ref(new Date())
const dateToUse = computed(() => format(date.value, 'yyyy-MM-dd'))
const { addToast } = useToast()

let dataResult = ref([])
let loadData = ref(true)

/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromResult = (data) => {
  console.log("🚀 ~ file: index.vue:31 ~ setDataFromResult ~ data:", data)
  
  if (data.length == 0) {
    addToast({
      message: {
        title: "¡Atención!",
        message: "No existen registros con esa fecha.",
        type: "info"
      },
    });
  }
  dataResult.value = data
  loadData.value = false
}
/**
 *  Función que consulta `fetchDataBitacora`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */

const fetchDataBitacora = async () => {
  console.log("🚀 ~ file: index.vue:53 ~ fetchDataBitacora ~ fetchDataBitacora:", fetchDataBitacora)
  try {
    console.log("🚀 ~ file: index.vue:56 ~ fetchDataBitacora ~ dateToUse:", dateToUse.value)
    const res = await fetchBitacora(dateToUse.value)
    const { data, status } = res

    // Valida de acuerdo al estatus de la petición
    // Si el código de estatus es diferente de 200 se marcara un error 
    if (status == 200) {
      setDataFromResult(data)
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
    // En caso de tener error establece un mensaje de error
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error"
      },
    });
  }
}
const formatPicker = () => {
  return format(date.value, 'dd-MM-yyyy')
}

watch(() => bus.value.get('successRegistrationBitacora'), (val) => {
  console.log("🚀 ~ file: index.vue:87 ~ watch ~ successRegistrationBitacora:", successRegistrationBitacora)
  fetchDataBitacora()
})

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var records sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchDataBitacora
 *  para la obtencion de nueva información.
 */
onMounted(() => {
  console.log("🚀 ~ file: index.vue:98 ~ onMounted ~ records.value:", records.value.length)
  //Condicional para verificar existencia de información en el store
  if (records.value.length != 0) {
    // Establece la información del store
    setDataFromResult(records.value)
  } else {
    console.log("🚀 ~ file: index.vue:105 ~ onMounted ~ else:")
    // Realiza la petición al servidor
    fetchDataBitacora()
  }
})
</script>

<template>
  <LBreadcrumb :back-route="{ name: 'Home' }">
    <svg class="w-5 h-5 shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clip-rule="evenodd" />
    </svg>
    <router-link :to="{ name: 'Home' }"
      class="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-500">
      Inicio
    </router-link>
  </LBreadcrumb>
  <div
    class="space-y-4 border-b sm:flex sm:items-center sm:justify-between sm:space-y-0 border-slate-200 dark:border-slate-700">
    <div class="flex-1 min-w-0">
      <h2 class="text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-2xl sm:leading-9 sm:truncate ">
        Bitácora
      </h2>
    </div>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="border border-solid border-slate-300">
            <div class="flex items-center justify-between">
              <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de registros de bitácora
              </legend>
              <div>
                <button class="p-2" @click="fetchDataBitacora()">
                  <svg xmlns="http://www.w3.org/2000/svg" :class="loadData ? 'animate-spin' : ''"
                    class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 512 512">
                    <path
                      d="M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-4 p-2">
              <div class="col-span-2">
                <Datepicker v-model="date" :format-locale="es" locale="es" cancelText="Cancelar" selectText="Seleccionar"
                  placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply
                  @update:model-value="fetchDataBitacora()" :clearable="false" />
              </div>
            </div>
            <LTable :loader="loadData">
              <template #head>
                <tr>
                  <LHeaderTh value="No." center />
                  <LHeaderTh value="Actividad" center />
                  <LHeaderTh value="Evento" center />
                  <LHeaderTh value="Usuario" center />
                  <LHeaderTh value="Fecha" center />
                </tr>
              </template>
              <template #body v-if="dataResult.length > 0">
                <tr  v-for="(item, index) in dataResult" :key="item.id">
                  <LBodyTh :value="index + 1" center />
                  <LBodyTd :value="item.actividad" />
                  <LBodyTd :value="item.evento.descripcion" center />
                  <LBodyTd :value="item.user.username" center />
                  <LBodyTd :value="item.fecha" center />
                </tr>
              </template>
              <template #body v-else>
                <tr>
                  <LBodyTh value="Sin información" colspan="7" center />
                </tr>
              </template>
            </LTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>