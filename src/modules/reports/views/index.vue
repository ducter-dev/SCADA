<script setup>
import { ref } from 'vue'
import FilterCard from '../components/FilterCard.vue'
import MensualesCard from '../components/MensualesCard.vue'

const showDiarios = ref(true)

</script>

<template>
	<div class="flex flex-col w-full m-4 sm:m-12">
		<div class="text-sm font-medium text-center border-b text-slate-500 border-slate-200">
			<ul class="flex flex-wrap -mb-px">
				<li class="mr-2">
					<a 
						href="#"
						class="inline-block p-2 rounded-t-lg" 
						:class="showDiarios? 'border-b-2 text-primary border-primary':'text-dark'" 
						aria-current="page" 
						@click="showDiarios = true">
						Reportes díarios
					</a>
				</li>
				<li class="mr-2">
					<a
						href="#"
						class="inline-block p-2 border-b-2 rounded-t-lg" 
						:class="!showDiarios? 'border-b-2 text-primary border-primary':'text-dark'" 
						aria-current="page"
						@click="showDiarios = false">
						Reportes mensuales
					</a>
				</li>
			</ul>
		</div>
		<div v-show="showDiarios">
			<FilterCard />
		</div>
		<div v-show="!showDiarios">
			<MensualesCard v-show="!showDiarios"/>
		</div>
	</div>
</template>