<script setup>
import FilterCard from '../components/FilterCard.vue'
</script>
<template>
    <div class="m-4 sm:m-12 w-full flex flex-col">
        <div class="text-sm font-medium text-center text-slate-500 border-b border-slate-200">
            <ul class="flex flex-wrap -mb-px">
                <li class="mr-2">
                    <a href="#" class="inline-block p-2 text-primary border-b-2 border-primary rounded-t-lg"
                        aria-current="page">Reportes díarios</a>
                </li>
            </ul>
        </div>
        <FilterCard />
    </div>
</template>