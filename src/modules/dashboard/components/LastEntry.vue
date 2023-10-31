<script setup>
import { ref, onMounted, computed, watch } from "vue"
import useToast from "../../dashboard/composables/useToast"
import Toggle from '@vueform/toggle'
import CreateEntry from "../../entries/components/create.vue"
import useTanqueEntrada from '../../tanques/composables/useTanqueEntrada'
import useEventsBus from "../../../layout/eventBus"
import useBitacora from "../../bitacora/composables"
import useAuth from "../../auth/composables/useAuth"


const { fetchUltimaEntrada } = useTanqueEntrada()

const { insertBitacora } = useBitacora()
const { getCurrentUser } = useAuth()
const currentUser = computed(() => getCurrentUser())

const { addToast } = useToast()
const { bus } = useEventsBus()
let dataLastEntry = ref({})


/**
 * Método para establecer valor a la variable `dataResult` y cambia el estatus del indicador de carga `loadData`
 * 
 * Retorna una matriz de datos o matriz vacia
 * @param {*} data 
 */

const setDataFromFetchDataLastEntry = (data) => {
    dataLastEntry.value = data
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

const fetchDataLastEntry = async () => {
    try {
        const res = await fetchUltimaEntrada()
        const { data, status } = res
        if (status == 200) {
            setDataFromFetchDataLastEntry(data)
        } else {
            /* addToast({
                message: {
                    title: "¡Error!",
                    message: data.message,
                    type: "error",
                    component: "LastEntry - fetchDataLastEntry()"
                },
            }) */
        }
    } catch (error) {
        /* addToast({
            message: {
                title: "¡Error!",
                message: `Error: ${error.message}`,
                type: "error",
                component: "LastEntry | Catch - fetchDataLastEntry()"
            },
        }) */
    }
}

onMounted(() => {
    fetchDataLastEntry()
})
</script>

<template>
    <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <div class="p-2 border border-solid border-slate-300">
            <div class="flex items-center justify-between">
                <legend class="text-base font-medium text-slate-900 dark:text-white">Última entrada</legend>
                <CreateEntry />
            </div>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
                <LCardListItem label="Número de autotanque"
                    :value="dataLastEntry.hasOwnProperty('atName') ? dataLastEntry.atName : '-'" />
                <LCardListItem label="Tipo de autotanque"
                    :value="dataLastEntry.hasOwnProperty('atTipo') ? setTipo(dataLastEntry.atTipo) : '-'" />
                <LCardListItem label="Volumen autorizado"
                    :value="dataLastEntry.hasOwnProperty('capacidad') ? dataLastEntry.capacidad : '-'" />
                <LCardListItem label="Número embarque" value="0" />
                <LCardListItem label="Tipo de conector"
                    :value="dataLastEntry.hasOwnProperty('conector') ? setConnector(dataLastEntry.conector) : '-'" />
                <LCardListItem label="Fecha"
                    :value="dataLastEntry.hasOwnProperty('fechaEntrada') ? dataLastEntry.fechaEntrada : '-'" />
            </ul>
        </div>
    </div>
</template>