<script setup>
import { ref, onMounted, computed, watch } from "vue"
import useToast from "../../dashboard/composables/useToast"
import Toggle from '@vueform/toggle'
import useTankOutput from '../../tanques/composables/useTanqueSalida'
import useDashboard from '../composables/useDashboard'
import useEventsBus from "../../../layout/eventBus"
import useBitacora from "../../bitacora/composables"
import useAuth from "../../auth/composables/useAuth"


let status = ref(false)
let dataLastOutput = ref({})
const { fetchUltimaSalida } = useTankOutput()
const { fetchBarreraSalida, getBarreraSalida, changeBarreraSalida } = useDashboard()

const { insertBitacora } = useBitacora()
const { getCurrentUser } = useAuth()
const currentUser = computed(() => getCurrentUser())

const { addToast } = useToast()
const { bus } = useEventsBus()

const loadDataBarrierStatus = ref(false)
let dataBarrierExitStatus = ref({})
const barrierExit = computed(() => getBarreraSalida())

const dataBarreraSalida = ref({})

const setDataFromFetchDataBarrierExit = (data) => {
    dataBarrierExitStatus.value = data
    loadDataBarrierStatus.value = false
}


const fetchDataLastOutput = async () => {
    try {
        const res = await fetchUltimaSalida()
        const { data, status } = res
        if (status == 200) {
            dataLastOutput.value = data
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: data.message,
                    type: "error",
                    component: "LastOutput - fetchDataLastOutput()"
                },
            });
        }
    } catch (error) {
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component: "LastOutput | Catch - fetchDataLastOutput()"
            },
        });
    }
}

const fetchDataBarreraSalida = async () => {
    try {
        const res = await fetchBarreraSalida()
        const { data, status, message } = res
        if (status == 200) {
            setDataFromFetchDataBarrierExit(data.estado)
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: message,
                    type: "error",
                    component: "LastOutput  - fetchDataBarreraSalida()"
                },
            });
        }
    } catch (error) {
        addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component: "LastOutput | Catch - fetchDataBarreraSalida()"
            },
        });
    }
}

const setTipo = (tipo) => {
    switch (tipo) {
        case 0:
            return 'Sencillo'
        case 1:
            return 'FULL A'
        case 2:
            return 'FULL B'
    }
}

const setConnector = (connector) => {
    switch (connector) {
        case 1:
            return 'Der.'
        case 2:
            return 'Izq.'
        case 3:
            return 'Ambos'
    }
}

/* watch(() => bus.value.get('reloadData'), (val) => {
    fetchDataLastOutput()
    fetchDataBarreraSalida()
}) */

watch(
    () => dataBarrierExitStatus.value, async(estadoBarrera) => {
        const res = await changeBarreraSalida(estadoBarrera)
        
        const { data, status } = res
        if (status == 201) {
            const objBitacora = {
                user: currentUser.value.id,
                actividad: `El usuario ${currentUser.value.username} cambió el estado de la barrera de entrada a: ${estadoBarrera? 'Abierta': 'Cerrada'}.`,
                evento: estadoBarrera ? 22 : 23,
            }
            //console.log("🚀 ~ file: LastOutput.vue:133 ~ objBitacora:", objBitacora)
            insertBitacora(objBitacora)
            addToast({
                message: {
                    title: "Éxito!",
                    message: `Se cambio el estado de la barrera de salida.`,
                    type: "success"
                },
            })  
        } else {
            addToast({
                message: {
                    title: "¡Error!",
                    message: `Error: No se pudo cambiar el estado de la barrera de salida`,
                    type: "error",
                    component: "LastExit | Catch - changeBarreraSalida()"
                },
            })
        }
    }
)

onMounted(() => {
    fetchDataLastOutput()

    if (barrierExit.value) {
        //console.log("🚀 ~ file: LastOutput.vue:157 ~ onMounted ~ barrierExit.value:", barrierExit.value.estado)
        
        // Establece la información del store
        setDataFromFetchDataBarrierExit(barrierExit.value)
    } else {
        // Realiza la petición al servidor
        fetchDataBarreraSalida()
    }

})
</script>
<template>
    <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Última salida</legend>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
                <LCardListItem label="Número de autotanque"
                    :value="dataLastOutput.hasOwnProperty('atName') ? dataLastOutput.atName : '-'" />
                <LCardListItem label="Tipo de autotanque"
                    :value="dataLastOutput.hasOwnProperty('atTipo') ? dataLastOutput.atTipo : '-'" />
                <LCardListItem label="Volumen cargado"
                    :value="dataLastOutput.hasOwnProperty('capacidad') ? dataLastOutput.capacidad : '-'" />
                <LCardListItem label="Peso cargado"
                    :value="dataLastOutput.hasOwnProperty('capacidadStd') ? dataLastOutput.capacidadStd : '-'" />
                <LCardListItem label="Tipo de conector"
                    :value="dataLastOutput.hasOwnProperty('conector') ? setConnector(dataLastOutput.conector) : '-'" />
                <LCardListItem label="Hora de salida" value="13:51" />
                <LCardListItem label="Fecha" value="2023/02/28" />
            </ul>
        </div>
    </div>
    <div class="max-w-sm mt-5 bg-transparent">
        <div class="p-2 border border-solid border-slate-300">
            <div class="py-1">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300">Barrera de salida
                        </p>
                    </div>
                    <div class="flex items-center justify-center mx-2">
                        <Toggle v-model="dataBarrierExitStatus" offLabel="Cerrada" onLabel="Abierta" :classes="{
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