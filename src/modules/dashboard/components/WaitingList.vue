<script setup>
import { ref, computed, onMounted } from 'vue'
import useDashboard from '../composables/useDashboard'
import useWaitingTank from '../../tanques/composables/useTanqueEspera'
import useFillers from '../../tanques/composables/useLlenaderas'
import useToast from "../../dashboard/composables/useToast";
import IconArrowsRotate from '../../../assets/icons/arrows-rotate.svg'
import Toggle from '@vueform/toggle'

const { fetchEstadoLlenadera, getLlenaderasEstado } = useFillers()
const { fetchTanksInEspera, getTanquesInEspera } = useWaitingTank()
const { getCurrentFiller } = useDashboard()
const { addToast } = useToast()
const loaderFiller = ref(false)
const loadData = ref(false)
const loadDataFillerStatus = ref(false)
const getFiller = ref(false)
const filler = ref()
const listWaitingTanks = computed(() => getTanquesInEspera())
const fillerStatus = computed(() => getLlenaderasEstado())
let dataWaitingTanks = ref([])
let dataFillerStatus = ref({})

/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromResult = (data) => {
    dataWaitingTanks.value = data.length > 0 ? data[0] : {}
    loadData.value = false
}

/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */
const setDataFromFetchingWaitingTanks = (data) => {
    dataFillerStatus.value = data
    loadDataFillerStatus.value = false
}

/**
 *  Función que consulta `fetchTanksInEspera`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */
const fetchWaitingTanks = async () => {
    try {
        const res = await fetchTanksInEspera()
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
                    component:"WaitingList - fetchWaitingTanks()"
                },
            });
        }

    } catch (error) {
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component:"WaitingList | Catch - fetchWaitingTanks()"
            },
        });
    }
}

const fetchFillerStatus = async () => {
    try {
        const res = await fetchEstadoLlenadera()
        const { data, status } = res
        if (status == 200) {
           setDataFromFetchingWaitingTanks(data)
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: data.message,
                    type: "error",
                    component:"WaitingList - fetchFillerStatus()"
                },
            });
        }
    } catch (error) {
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component:"WaitingList | Catch - fetchFillerStatus()"
            },
        });
    }
}

const currentFiller = async () => {
    loaderFiller.value = true
    try {
        const res = await getCurrentFiller()
        const { data, status } = res
        if (status == 201) {
            filler.value = data.llenaderaDisponible
            getFiller.value = true
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: res.message,
                    type: "error",
                    component:"WaitingList - currentFiller()"
                },
            });
        }
        loaderFiller.value = false
    } catch (error) {
        loaderFiller.value = false
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component:"WaitingList | Catch - currentFiller()"
            },
        });
    }
}

const setTipo = (tipo) => {
    switch (tipo) {
        case 1:
            return 'Sencillo'
        case 2:
            return 'Full A'
        case 3:
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

onMounted(() => {
    //Condicional para verificar existencia de información en el store
    if (listWaitingTanks.value.length != 0) {
        // Establece la información del store
        setDataFromResult(listWaitingTanks.value)
    } else {
        // Realiza la petición al servidor
        fetchWaitingTanks()
    }

    //Condicional para verificar existencia de información en el store
    if (fillerStatus.value.length != 0) {
        // Establece la información del store
        setDataFromResult(fillerStatus.value)
    } else {
        // Realiza la petición al servidor
        fetchFillerStatus()
    }
    currentFiller()
})
</script>
<template>
    <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Lista de espera</legend>
            <p class="text-base font-medium text-center text-slate-800 dark:text-slate-500">Asignación de AT'S</p>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
                <LCardListItem label="Número de autotanque" value="10" />
                <LCardListItem label="Tipo de autotanque" :value="setTipo(dataWaitingTanks.atTipo)" />
                <LCardListItem label="Volumen programado" :value="dataWaitingTanks.capacidad" />
                <LCardListItem label="Tipo de conector" :value="setConector(dataWaitingTanks.conector)" />

                <LCardListItem label="Llenadera disponible">
                    <span v-if="getFiller">{{ llenadera }}</span>
                    <div class="flex justify-between mx-2 text-sm font-semibold text-red-500" v-else>
                        <span>Error</span>
                        <IconArrowsRotate class="w-4 h-4 ml-2 cursor-pointer text-slate-400 "
                            :class="loaderFiller ? 'animate-spin' : ''" @click="currentFiller"
                            v-tippy="'Actualizar información'" />
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
                        <Toggle v-model="dataFillerStatus" offLabel="Cerrada" onLabel="Abierta" :classes="{
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