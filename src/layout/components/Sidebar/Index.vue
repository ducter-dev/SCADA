<script setup>
import SidebarSecondary from './Secondary.vue';
import { isCollapse } from "../../composables" 
</script>
<template>
    <aside class="hidden md:flex md:shrink-0">
    <div class="flex">
        <div class="w-60 bg-white dark:bg-slate-900 border-r border-transparent md:border-slate-200 md:dark:border-slate-700" 
        :class="isCollapse ? 'hidden' : ''">
             <!--Sidebar Secondary-->
             <SidebarSecondary/>
        </div>
    </div>
</aside>
</template>