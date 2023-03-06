<script setup>
import {ref, onMounted, computed} from "vue"
import useDashboard from '../composables/useDashboard'
import useToast from "../../dashboard/composables/useToast";
import Toggle from '@vueform/toggle'
import CreateEntry from "../../entries/components/create.vue"
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'

const { fetchUltimaEntrada } = useTanqueEntrada()
const { fetchBarreraEntrada,getBarreraEntrada } = useDashboard()
const { addToast } = useToast()

const loadDataBarrierStatus = ref(false)
let dataBarrierEntryStatus = ref({})
const barrierEntry = computed(() => getBarreraEntrada())
let dataLastEntry = ref({})


/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromFetchDataBarrierEntry = (data) => {
    dataBarrierEntryStatus.value = data
    loadDataBarrierStatus.value = false
}

const setDataFromFetchDataLastEntry = (data) => {
    dataLastEntry.value = data
    loadDataBarrierStatus.value = false
}

const setTipo = (tipo) => {
    switch (tipo) {
        case 1:
            return 'FULL A'
        case 2:
            return 'FULL B'
        case 3:
            return 'Sencillo'
    }
}

const setConnector = (connector) => {
    switch (connector) {
        case 1:
            return 'Izq.'
        case 2:
            return 'Der.'
        case 3:
            return 'Ambos'
    }
}

const fetchDataLastEntry = async () => {
      try {
        const res = await fetchUltimaEntrada()
        const { data, status } = res
        if (status == 200) {
            setDataFromFetchDataLastEntry(data)
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: data.message,
              type: "error",
              component:"LastEntry - fetchDataLastEntry()"
            },
          });
        }
      } catch (error) {
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error",
            component:"LastEntry | Catch - fetchDataLastEntry()"
          },
        });
      }
    }

const fetchDataBarrierEntry = async () => {
    try {
        const res = await fetchBarreraEntrada()
        const { data, status } = res
        if (status == 200) {
            setDataFromFetchDataBarrierEntry(data)
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: data.message,
                    type: "error",
                    component:"LastEntry - fetchDataBarrierEntry()"
                },
            });
        }
    } catch (error) {
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component:"LastEntry | Catch - fetchDataBarrierEntry()"
            },
        });
    }
}

onMounted(() => {

    fetchDataLastEntry()

     //Condicional para verificar existencia de información en el store
     if (barrierEntry.value.length != 0) {
        // Establece la información del store
        setDataFromFetchDataBarrierEntry(barrierEntry.value)
    } else {
        // Realiza la petición al servidor
        fetchDataBarrierEntry()
    }
})
</script>
<template>
       <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="p-2 border border-solid border-slate-300">
            <div class="flex justify-between items-center">
                <legend class="text-base font-medium text-slate-900 dark:text-white">Última entrada</legend>
                <CreateEntry/>
            </div>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
              <LCardListItem label="Número de autotanque" :value="dataLastEntry.length > 0 ? dataLastEntry.atName : '-'" />
              <LCardListItem label="Tipo de autotanque" :value="dataLastEntry.length > 0 ?  setTipo(dataLastEntry.atName) : '-'" />
              <LCardListItem label="Volumen autorizado" :value="dataLastEntry.length > 0 ? dataLastEntry.capacidad : '-'" />
              <LCardListItem label="Número embarque" value="0" />
              <LCardListItem label="Tipo de conector" :value="dataLastEntry.length > 0 ?  setConnector(dataLastEntry.conector) : '-'" />
            </ul>
          </div>
        </div>
        <div class="max-w-sm mt-5 bg-transparent">
        <div class="p-2 border border-solid border-slate-300">
            <div class="py-1">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300">Barrera de entrada
                        </p>
                    </div>
                    
                    <div class="flex items-center justify-center mx-2">
                        <Toggle v-model="dataBarrierEntryStatus" offLabel="Cerrada" onLabel="Abierta" :classes="{
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
</template>