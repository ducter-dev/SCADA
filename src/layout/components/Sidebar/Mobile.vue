<script setup>
import { sidebarOpen, toggleSidebar } from "../../composables"
import SidebarSecondary from "./Secondary.vue";
</script>
<template>
    <div v-show="sidebarOpen" class="md:hidden">
        <transition enter-from-class="opacity-0" enter-to-class="opacity-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-show="sidebarOpen" @click="toggleSidebar()"
                class="fixed inset-0 z-40 transition-opacity ease-linear duration-300">
                <div class="absolute inset-0 bg-slate-900 opacity-75"></div>
            </div>
        </transition>
        <div class="fixed inset-0 flex z-40">
            <transition enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-from-class="translate-x-0"
                leave-to-class="-translate-x-full">
                <div v-show="sidebarOpen"
                    class=" flex-1 flex max-w-xs w-full bg-white dark:bg-slate-900 transform ease-in-out duration-200 ">
                    <div class="absolute top-0 right-0 -mr-14 p-1">
                        <button v-show="sidebarOpen" @click="toggleSidebar()"
                            class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-slate-600 ">
                            <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <SidebarSecondary />
                </div>
            </transition>

            <div class="shrink-0 w-14"></div>
        </div>
    </div>
</template>