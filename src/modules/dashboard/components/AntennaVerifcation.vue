<script setup>
//Importación de recursos
import { ref, computed, onMounted, watch } from 'vue'
import useInputAntenna from '../composables/useDashboard'
import useToast from "../composables/useToast"
import useEventsBus from "../../../layout/eventBus"

/**
 * Declaración de los atributos que son asignables.
 * 
 * @var array<boolean, string, array>
 */
const { addToast } = useToast()
const { getAntenaVerificacion, fetchAntenaVerificacion } = useInputAntenna()
const verificationAntenna = computed(() => getAntenaVerificacion())
const dataResult = ref({})
let loadData = ref(true)
const { bus } = useEventsBus()

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
 *  Función que consulta `fetchAntenaVerificacion`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */
const fetchAntennaVerificationData = async () => {
    try {
        const res = await fetchAntenaVerificacion()
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
                    component:"AntennaVerification - fetchAntennaVerificationData()"
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
                component:"AntennaVerification | Catch - fetchAntennaVerificationData()"
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

watch(() => bus.value.get('reloadData'), (val) => {
    fetchAntennaVerificationData()
})

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var verificationAntenna sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchAntennaVerificationData 
 *  para la obtencion de nueva información.
 */
onMounted(() => {
   //Condicional para verificar existencia de información en el store
    if (verificationAntenna.value && Object.keys(verificationAntenna.value).length > 0) {
        // Establece la información del store
        setDataFromResult(verificationAntenna.value)
    } else {
        // Realiza la petición al servidor
        fetchAntennaVerificationData()
    }
})
</script>
<template>
    <div class="min-w-[12rem] mx-auto p-1 bg-white border border-slate-200  shadow dark:bg-slate-800 dark:border-slate-700">
        <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Antena de verificación</legend>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
                <LCardListItem label="Número de PG" :value="dataResult.numAT" />
                <LCardListItem label="Tipo de AT" :value="setTipo(dataResult.tipoAT)" />
            </ul>
        </div>
    </div>
</template>