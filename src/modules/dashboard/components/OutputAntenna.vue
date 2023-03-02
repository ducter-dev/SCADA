<script setup>
//Importación de recursos
import { ref, computed, onMounted } from 'vue'
import useOutputAntenna from '../composables/useDashboard'
import useToast from "../composables/useToast"

/**
 * Declaración de los atributos que son asignables.
 * 
 * @var array<boolean, string, array>
 */
const { addToast } = useToast()
const { getAntenaSalida, fetchAntenaSalida } = useOutputAntenna()
const outputAntenna = computed(() => getAntenaSalida())
const dataResult = ref({})
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
 *  Función que consulta `fetchAntenaSalida`  para obtener datos desde la API la información.
 *  Invoca a la función @function setDataFromResult para almacenar el resultado.
 *  En caso de error en la petición @throws crea una instancia con el metodo @method addToast 
 *  en la cual guarda un mensaje para visualizar en la interfaz.
 */
const fetchOutputAntennaData = async () => {
    try {
        const res = await fetchAntenaSalida()
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
                    component:"OutputAntenna - fetchOutputAntennaData()"
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
                component:"OutputAntenna | Catch - fetchOutputAntennaData()"
            },
        });
    }
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

/**
 *  Al montar el componente evalua la disponibilidad y existencia de la información
 *  previamente almacenada en el store, en caso de existir @var outputAntenna sera asignado,
 *  en caso contrario se invoca a la funcion @function fetchOutputAntennaData 
 *  para la obtencion de nueva información.
 */
onMounted(() => {
   //Condicional para verificar existencia de información en el store
    if (outputAntenna.value && Object.keys(outputAntenna.value).length > 0) {
        // Establece la información del store
        setDataFromResult(outputAntenna.value)
    } else {
        // Realiza la petición al servidor
        fetchOutputAntennaData()
    }
})
</script>
<template>
    <div class="min-w-[12rem] mx-auto p-1 bg-white border border-slate-200  shadow dark:bg-slate-800 dark:border-slate-700">
        <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Antena de salida</legend>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
                <LCardListItem label="Número de PG" :value="dataResult.numAT" />
                <LCardListItem label="Tipo de AT" :value="setTipo(dataResult.tipoAT)" />
            </ul>
        </div>
    </div>
</template>