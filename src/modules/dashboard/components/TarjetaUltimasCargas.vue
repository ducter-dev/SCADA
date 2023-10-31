<script setup>
//Importación de recursos
import { ref, onMounted, computed, watch } from "vue";
import useToast from "../../dashboard/composables/useToast";
import useDepartureTank from '../../tanques/composables/useTanqueSalida'
import useEventsBus from "../../../layout/eventBus"
import { format } from 'date-fns'

/**
 * Declaración de los atributos que son asignables.
 * 
 * @var array<boolean, string, array>
 */
const { bus } = useEventsBus()
const { fetchTanksSalidas } = useDepartureTank()
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
  dataResult.value = data
  loadData.value = false
}

/**
 *  Función que consulta `fetchTanksSalidas`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */
const fecthInformationOnTanksLastDepartures = async () => {
  try {
    const date = ref(new Date())
    const dateToUse = computed(() => format(date.value, 'yyyy-MM-dd'))
    const res = await fetchTanksSalidas(dateToUse.value, 0)
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
          type: "error",
          component:"TarjetaUltimasCargas - fecthInformationOnTanksLastDepartures()"
        },
      });
    }
  } catch (error) {
    // En caso de tener error establece un mensaje de error
    addToast({
      message: {
        title: "¡Error!",
        message: `Error: ${error.message}`,
        type: "error",
        component:"TarjetaUltimasCargas | Catch - fecthInformationOnTanksLastDepartures()"
      },
    });
  }
}

const setNumber = (num) => {
	let result = 0
	if (Number.isInteger(num)) {
		result = `${num}.000`
	} else {
		result = `${num}`
	}
	return result
}

watch(() => bus.value.get('reloadData'), (val) => {
  fecthInformationOnTanksLastDepartures()
})

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var departureList sera asignado,
 *  en caso contrario se invoca a la funcion @function fecthInformationOnTanksLastDepartures 
 *  para la obtencion de nueva información.
 */
onMounted(() => {
  fecthInformationOnTanksLastDepartures()
})
</script>
<template>
  <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
    <div class="border border-solid border-slate-300">
      <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Últimas salidas</legend>
      <LTable :loader="loadData" :full="false">
        <template #head>
          <tr>
            <LHeaderTh value="No." left />
            <LHeaderTh value="Llenadera" left />
            <LHeaderTh value="AT" left />
            <LHeaderTh value="Toneladas" left />
            <LHeaderTh value="Densidad" left />
          </tr>
        </template>
        <template #body>
          <tr v-for="(item) in dataResult" :key="item.id">
            <LBodyTh :value="item.id" center />
            <LBodyTd :value="item.llenadera" center />
            <LBodyTd :value="item.atName" center />
            <LBodyTd :value="setNumber(item.masaTons)" center />
            <LBodyTd :value="item.densidadCor" center />
          </tr>
          <tr v-show="dataResult.length < 1">
            <LBodyTh value="Sin información" colspan="5" center />
          </tr>
        </template>
      </LTable>
    </div>
  </div>
</template>