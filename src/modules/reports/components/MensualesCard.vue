<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import useReportes from '../composables/useReportes'
import useToast from '../../dashboard/composables/useToast'
import Toggle from '@vueform/toggle'

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
const fileOpen = ref(false)
const typeReport05 = ref(true)
const sufix = ref('05')

const { addToast } = useToast()

const { getCromatografoMensual } = useReportes()

const getReportServicio = async (type) => {
	const fecha = formatPicker()
	let detail = ''
	const reportType = typeReport05.value ? 5 : 24
	switch (type) {
		case 'croma-irge':
			fileOpen.value = getCromatografoMensual(fecha, reportType, 'irge')
			detail = `Reporte Mensual de Cromatógrafo IRGE de ${fecha}`
			break
		case 'croma-eb04c1':
			fileOpen.value = getCromatografoMensual(fecha, reportType, 'c1')
			detail = `Reporte Mensual de Cromatógrafo EB04 Corriente 1 de ${fecha}`
			break
		case 'croma-eb04c2':
			fileOpen.value = getCromatografoMensual(fecha, reportType, 'c2')
			detail = `Reporte Mensual de Cromatógrafo EB04 Corriente 2 de ${fecha}`
			break
		case 'croma-eb04c3':
			fileOpen.value = getCromatografoMensual(fecha, reportType, 'c3')
			detail = `Reporte Mensual de Cromatógrafo EB04 Corriente 3 de ${fecha}`
			break
			default:
				break
		}
		addToast({
			message: {
				title: "¡Descargando archivo!",
				message: detail,
				type: "info"
			},
		})
}

const formatPicker = () => {
	computed
	return format(date.value, 'yyyy-MM-dd')
}

watch(
		() => typeReport05.value, (tipo) => {
			sufix.value = tipo ? '05' : '24'
		}
)

</script>

<template>
	<div class="flex flex-row items-center justify-between w-full h-20">
		<div class="flex flex-row items-center justify-center">
			<div class="flex items-center justify-center mr-2 dark:text-white">
				Fecha
			</div>
			<div>
				<Datepicker v-model="date" :format-locale="es" locale="es" cancelText="Cancelar" selectText="Seleccionar"
					placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply />
			</div>
			<div class="flex items-center justify-center ml-4 mr-2 dark:text-white">
				Tipo de Reportes:
			</div>
			<div class="flex items-center justify-center mx-2">
				<Toggle v-model="typeReport05" offLabel="24" onLabel="05" :classes="{
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
	<div>
		<div class="py-3 border-t border-slate-400/20">
			<div class="mb-1.5 text-xs font-semibold text-dark">Lista de reportes Cromatógrafos</div>
			<div class="grid grid-cols-4 gap-1 dark:text-white">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_IRGE_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-irge')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C1_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04c1')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}Cromatografo_EB04_C2_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04c2')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}Cromatografo_EB04_C3_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04c3')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="mb-1.5 text-xs font-semibold text-dark">Lista de reportes Cromatógrafos</div>
			</div>
			<div class="grid grid-cols-4 gap-1 dark:text-white">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Balance_Mensual_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('balance-mensual')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
		</div>
	</div>
</template>