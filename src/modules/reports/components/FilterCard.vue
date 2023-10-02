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

const { getCargasDiarias, getUltimasCargas, getReportEsferas, getReportPatines, getReportCromatografo, getReportBombas, getListaLlegada, 
			getLlenaderas, getDespachoDiario, getBitacora, getBalanceDiario,getReciboPatin, getDensidades } = useReportes()

const getReportServicio = async (type) => {
	console.log("🚀 ~ file: FilterCard.vue:27 ~ getReportServicio ~ type:", type)
	const fecha = formatPicker()
	let detail = ''
	const reportType = typeReport05.value ? 5 : 24
	switch (type) {
		case 'lista_llegada':
			fileOpen.value = getListaLlegada(fecha, reportType)
			detail = `Cargas Diarias de ${fecha}`
			break
		case 'llenaderas':
			fileOpen.value = getListaLlegada(fecha, reportType)
			detail = `Llenaderas de ${fecha}`
			break
		case 'diario-cargas':
			fileOpen.value = getCargasDiarias(fecha, reportType)
			detail = `Cargas Diarias de ${fecha}`
			break
		case 'despacho-diario':
			fileOpen.value = getDespachoDiario(fecha, reportType)
			detail = `Cargas Diarias de ${fecha}`
			break
		case 'ultimas-cargas':
			fileOpen.value = getUltimasCargas(fecha, reportType)
			detail = `Últimas Cargas de ${fecha}`
			break
		case 'esfera-1':
			fileOpen.value = getReportEsferas(fecha, 'a', reportType)
			detail = `Reporte diario de esfera a del día ${fecha}`
			break
		case 'esfera-2':
			fileOpen.value = getReportEsferas(fecha, 'b', reportType)
			detail = `Reporte diario de esfera b del día ${fecha}`
			break
		case 'esferas':
			fileOpen.value = getReportEsferas(fecha, 'ab', reportType)
			detail = `Reporte diario de esferas del día ${fecha}`
			break
		case 'patin-401a':
			fileOpen.value = getReportPatines(fecha, '401A', reportType)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-401b':
			fileOpen.value = getReportPatines(fecha, '401B', reportType)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-402a':
			fileOpen.value = getReportPatines(fecha, '402A', reportType)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-402b':
			fileOpen.value = getReportPatines(fecha, '402B', reportType)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-ambos':
			//fileOpen.value = getReportPatines(fecha, '402B', reportType)
			detail = `Reporte diario de Patines del día ${fecha}`
			break
		case 'croma-irge':
			fileOpen.value = getReportCromatografo(fecha, 1, reportType)
			detail = `Reporte diario de cromatógrafo ${type} del día ${fecha}`
			break
		case 'croma-eb04-1':
			fileOpen.value = getReportCromatografo(fecha, 2, reportType)
			detail = `Reporte diario de cromatógrafo ${type} del día ${fecha}`
			break
		case 'croma-eb04-2':
			fileOpen.value = getReportCromatografo(fecha, 3, reportType)
			detail = `Reporte diario de cromatógrafo ${type} del día ${fecha}`
			break
		case 'croma-eb04-3':
			fileOpen.value = getReportCromatografo(fecha, 4, reportType)
			detail = `Reporte diario de cromatógrafo ${type} del día ${fecha}`
			break
		case 'bombas':
			fileOpen.value = getReportBombas(fecha)
			detail = `Reporte diario de bombas ${type} del día ${fecha}`
			break
		case 'llenaderas-5':
			fileOpen.value = getLlenaderas(5, fecha, reportType)
			detail = `Reporte diario de llenadera 5 del día ${fecha}`
			break
		case 'llenaderas-6':
			fileOpen.value = getLlenaderas(6, fecha, reportType)
			detail = `Reporte diario de llenadera 6 del día ${fecha}`
			break
		case 'llenaderas-7':
			fileOpen.value = getLlenaderas(7, fecha, reportType)
			detail = `Reporte diario de llenadera 7 del día ${fecha}`
			break
		case 'llenaderas-8':
			fileOpen.value = getLlenaderas(8, fecha, reportType)
			detail = `Reporte diario de llenadera 8 del día ${fecha}`
			break
		case 'llenaderas-9':
			fileOpen.value = getLlenaderas(9, fecha, reportType)
			detail = `Reporte diario de llenadera 9 del día ${fecha}`
			break
		case 'llenaderas-10':
			fileOpen.value = getLlenaderas(10, fecha, reportType)
			detail = `Reporte diario de llenadera 10 del día ${fecha}`
			break
		case 'llenaderas-11':
			fileOpen.value = getLlenaderas(11, fecha, reportType)
			detail = `Reporte diario de llenadera 11 del día ${fecha}`
			break
		case 'llenaderas-12':
			fileOpen.value = getLlenaderas(12, fecha, reportType)
			detail = `Reporte diario de llenadera 12 del día ${fecha}`
			break
		case 'llenaderas-13':
			fileOpen.value = getLlenaderas(13, fecha, reportType)
			detail = `Reporte diario de llenadera 13 del día ${fecha}`
			break
		case 'llenaderas-14':
			fileOpen.value = getLlenaderas(14, fecha, reportType)
			detail = `Reporte diario de llenadera 14 del día ${fecha}`
			break
		case 'bitacora':
			fileOpen.value = getBitacora(fecha, reportType)
			detail = `Reporte diario de llenadera 14 del día ${fecha}`
			break
		case 'balance-diario':
			fileOpen.value = getBalanceDiario(fecha, reportType)
			detail = `Reporte de balance diario del día ${fecha}`
			break
		case 'patin-401':
			fileOpen.value = getReciboPatin(fecha, reportType, 401)
			detail = `Reporte de patines 401 diario del día ${fecha}`
			break
		case 'patin-402':
			fileOpen.value = getReciboPatin(fecha, reportType, 402)
			detail = `Reporte de patines 401 diario del día ${fecha}`
			break
		case 'patin-recibo':
			fileOpen.value = getReciboPatin(fecha, reportType, 400)
			detail = `Reporte de recibo de patines diario del día ${fecha}`
			break
		case 'densidades':
			fileOpen.value = getDensidades(fecha, reportType)
			detail = `Reporte de densidades diario del día ${fecha}`
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
		<div class="py-3 border-t border-slate-400/20 text-dark dark:text-white">
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Documentación</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Lista_Llegada_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('lista_llegada')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Diario_Cargas_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('diario-cargas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Despacho_Diario_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('despacho-diario')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Ultimas_Cargas_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('ultimas-cargas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Llenaderas</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-5_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-5')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-6_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-6')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-7_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-7')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-8_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-8')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-9_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-9')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-10_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-10')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-11_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-11')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-12_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-12')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-13_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-13')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas-14_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas-14')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Patines</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_401A_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-401a')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_401B_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-401b')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_402A_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-402a')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_402B_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-402b')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Patines_401_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-401')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Patines_402_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-402')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Recibo_Patín_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-recibo')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Bombas</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Bombas_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('bombas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Cromatógrafo</div>
			<div class="grid grid-cols-4 gap-1">
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
					<IconCircleDown @click="getReportServicio('croma-eb04-1')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C2_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04-2')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C3_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04-3')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Densidades_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('densidades')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Esferas</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esfera_TE-301A_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('esfera-1')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esfera_TE-301B_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('esfera-2')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esferas_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('esferas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Bitácora</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Bitácora_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('bitacora')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Balance</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Balance_Diario_{{ sufix }}</span>
					</div>
					<IconCircleDown @click="getReportServicio('balance-diario')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
		</div>
	</div>
</template>