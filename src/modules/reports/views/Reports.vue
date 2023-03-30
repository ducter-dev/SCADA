<script setup>
import FilterCard from '../components/FilterCard.vue'
</script>
<template>
	<div class="flex flex-col w-full m-4 sm:m-12">
		<div class="text-sm font-medium text-center border-b text-slate-500 border-slate-200">
			<ul class="flex flex-wrap -mb-px">
				<li class="mr-2">
					<a href="#" class="inline-block p-2 border-b-2 rounded-t-lg text-primary border-primary"
							aria-current="page">Reportes díarios</a>
				</li>
			</ul>
		</div>
		<FilterCard />
	</div>
</template>