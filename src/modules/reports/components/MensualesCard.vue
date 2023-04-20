<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import useReportes from '../composables/useReportes'
import useToast from '../../dashboard/composables/useToast'

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

const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})
const fileOpen = ref(false)

const { addToast } = useToast()

const { getCargasDiarias } = useReportes()

const getReportServicio = async (type) => {
	/* const fecha = formatPicker()
	const detail = `Cargas Diarias de ${fecha}`

	switch (type) {
		case 'diario-cargas':
			fileOpen.value = getCargasDiarias(fecha)
			addToast({
          message: {
            title: "¡Descargando archivo!",
            message: detail,
            type: "info"
          },
        });
			break
		default:
			break
	} */
}

const formatPicker = () => {
    const date = new Date(month.value.year, month.value.month, 1 )
    computed
    return format(date, 'yyyy-MM')
}

</script>

<template>
	<div class="flex flex-row items-center justify-between w-full h-20">
		<div class="flex flex-row items-center justify-center">
			<div class="flex items-center justify-center mr-2">
				Fecha
			</div>
			<div>
				<Datepicker v-model="month" :format-locale="es" locale="es" cancelText="Cancelar" selectText="Seleccionar"
					placeholder="Seleccione una fecha" :format="formatPicker" month-picker autoApply />
			</div>
		</div>
	</div>
	<div>
		<div class="py-3 border-t border-slate-400/20">
			<div class="mb-1.5 text-xs font-semibold text-dark">Lista de reportes disponibles</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_Mensual</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-mensual')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
        <div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
          <div class="flex items-center">
            <IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
            <span> {{ formatPicker() }}_Balance_Mensual</span>
          </div>
          <IconCircleDown @click="getReportServicio('balance-mensual')"
            class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
        </div>
			</div>
		</div>
	</div>
</template>