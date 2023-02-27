<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import IconCircleDown from '../../../assets/icons/circle-down.svg'
import IconSquarePollVerticall from '../../../assets/icons/square-poll-vertical.svg'

defineProps({
    llenadera: {
        type: Object,
        default: {}
    }
})

const date = ref(new Date())

const getTanquesServicio = async (type) => {
    console.log('filtrando fecha', formatPicker())
    console.log('De servicio', type)
}

const formatPicker = () => {
    return format(date.value, 'dd-MM-yyyy')
}

</script>
<template>
    <div class="w-full flex flex-row justify-between items-center h-20">
        <div class="flex flex-row justify-center items-center">
            <div class="flex justify-center items-center mr-2">
                Fecha
            </div>
            <div>
                <Datepicker v-model="date" :format-locale="es" locale="es" cancelText="Cancelar" selectText="Seleccionar"
                    placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply />
            </div>
        </div>
    </div>
    <div>
        <div class="border-t border-slate-400/20 py-3">
            <div class="mb-1.5 text-xs font-semibold text-dark">Lista de reportes disponibles</div>
           <div class="grid grid-cols-3 gap-2">
            <div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
               <div class="flex items-center">
                <IconSquarePollVerticall  class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
                <span> {{formatPicker()}}_Reporte_Entradas</span>   
               </div>
                <IconCircleDown @click="getTanquesServicio('entrada')" class="h-5 w-5 mr-3 stroke-white invisible group-hover:visible cursor-pointer"/>
            </div>

            <div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
               <div class="flex items-center">
                <IconSquarePollVerticall  class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
                <span> {{formatPicker()}}_Reporte_Servicios</span>   
               </div>

                <IconCircleDown @click="getTanquesServicio('servicios')" class="h-5 w-5 mr-3 stroke-white invisible group-hover:visible cursor-pointer"/>
            </div>
            <div   class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
               <div class="flex items-center">
                <IconSquarePollVerticall  class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
                <span> {{formatPicker()}}_Reporte_Diario_Salidas</span>   
               </div>

                <IconCircleDown @click="getTanquesServicio('salidas')" class="h-5 w-5 mr-3 stroke-white invisible group-hover:visible cursor-pointer"/>
            </div>
           </div>
        </div>
    </div>
</template>