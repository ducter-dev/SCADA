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

const date = ref(new Date())
const fileOpen = ref(false)

const { addToast } = useToast()

const { getCargasDiarias, getUltimasCargas, getReportEsferas, getReportPatines, getReportCromatografo, getReportBombas } = useReportes()

const getReportServicio = async (type) => {
	console.log("🚀 ~ file: FilterCard.vue:27 ~ getReportServicio ~ type:", type)
	const fecha = formatPicker()
	let detail = ''

	switch (type) {
		case 'diario-cargas':
			fileOpen.value = getCargasDiarias(fecha)
			detail = `Cargas Diarias de ${fecha}`
			break
		case 'ultimas-cargas':
			fileOpen.value = getUltimasCargas(fecha)
			detail = `Últimas Cargas de ${fecha}`
			break
		case 'esfera-1':
			fileOpen.value = getReportEsferas(fecha, 'a')
			detail = `Reporte diario de esfera a del día ${fecha}`
			break
		case 'esfera-2':
			fileOpen.value = getReportEsferas(fecha, 'b')
			detail = `Reporte diario de esfera b del día ${fecha}`
			break
		case 'patin-401a':
			fileOpen.value = getReportPatines(fecha, '401A')
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-401b':
			fileOpen.value = getReportPatines(fecha, '401B')
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-402a':
			fileOpen.value = getReportPatines(fecha, '402A')
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'patin-402b':
			fileOpen.value = getReportPatines(fecha, '402B')
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'croma-irge':
			fileOpen.value = getReportCromatografo(fecha, 1)
			detail = `Reporte diario de coromatógrafo ${type} del día ${fecha}`
			break
		case 'croma-eb04-1':
			fileOpen.value = getReportCromatografo(fecha, 2)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'croma-eb04-2':
			fileOpen.value = getReportCromatografo(fecha, 3)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'croma-eb04-3':
			fileOpen.value = getReportCromatografo(fecha, 4)
			detail = `Reporte diario de ${type} del día ${fecha}`
			break
		case 'bombas':
			fileOpen.value = getReportBombas(fecha)
			detail = `Reporte diario de bombas ${type} del día ${fecha}`
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

</script>

<template>
	<div class="flex flex-row items-center justify-between w-full h-20">
		<div class="flex flex-row items-center justify-center">
			<div class="flex items-center justify-center mr-2">
				Fecha
			</div>
			<div>
				<Datepicker v-model="date" :format-locale="es" locale="es" cancelText="Cancelar" selectText="Seleccionar"
					placeholder="Seleccione una fecha" :enableTimePicker="false" :format="formatPicker" autoApply />
			</div>
		</div>
	</div>
	<div>
		<div class="py-3 border-t border-slate-400/20">
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Documentación</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Lista_Llegada</span>
					</div>
					<IconCircleDown @click="getReportServicio('lista_llegada')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Llenaderas</span>
					</div>
					<IconCircleDown @click="getReportServicio('llenaderas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Diario_Cargas</span>
					</div>
					<IconCircleDown @click="getReportServicio('diario-cargas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Despacho_Diario</span>
					</div>
					<IconCircleDown @click="getReportServicio('despacho-diario')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Reporte_Ultimas_Cargas</span>
					</div>
					<IconCircleDown @click="getReportServicio('ultimas-cargas')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Patines</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_401A</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-401a')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_401B</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-401b')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_402A</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-402a')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_FMT_402B</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-402b')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Patines</span>
					</div>
					<IconCircleDown @click="getReportServicio('patin-ambos')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Bombas</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Bombas</span>
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
						<span> {{ formatPicker() }}_Cromatografo_IRGE</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-irge')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C1</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04-1')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C2</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04-2')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Cromatografo_EB04_C3</span>
					</div>
					<IconCircleDown @click="getReportServicio('croma-eb04-3')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
			<div class="mt-4 mb-1 text-xs font-semibold text-dark">Reportes de Esferas</div>
			<div class="grid grid-cols-4 gap-1">
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esfera_TE-301A</span>
					</div>
					<IconCircleDown @click="getReportServicio('esfera-1')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esfera_TE-301B</span>
					</div>
					<IconCircleDown @click="getReportServicio('esfera-2')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
				<div class="flex justify-between items-center rounded-md p-1.5 hover:bg-primary hover:text-white group">
					<div class="flex items-center">
						<IconSquarePollVerticall class="mr-2.5 h-5 w-5 flex-none text-slate-400 group-hover:text-white" />
						<span> {{ formatPicker() }}_Esferas</span>
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
						<span> {{ formatPicker() }}_Bitácora</span>
					</div>
					<IconCircleDown @click="getReportServicio('bitácora')"
						class="invisible w-5 h-5 mr-3 cursor-pointer stroke-white group-hover:visible" />
				</div>
			</div>
		</div>
	</div>
</template>