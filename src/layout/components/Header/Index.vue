<script setup>
import IconSun from "../../../assets/icons/sun.svg"
import IconMoon from "../../../assets/icons/moon.svg"
import IconExpand from "../../../assets/icons/expand.svg"
import IconCompress from "../../../assets/icons/compress.svg"
import IconRightFromBracket from "../../../assets/icons/right-from-bracket.svg"
import IconChevronDown from "../../../assets/icons/chevron-down.svg"
import Dropdown from "../Dropdown/Dropdown.vue"
import DropdownLink from "../Dropdown/DropdownLink.vue"
import Button from "../Button.vue"
import { useRouter } from "vue-router"
import { toggleSidebar, isDark, toggleDarkMode,toggleCollapsableMode, isCollapse } from "../../composables"
import { useFullscreen } from "@vueuse/core";
import useAuth from "../../../modules/auth/composables/useAuth"
import { computed, ref } from "vue"
import useToast from "../../../modules/dashboard/composables/useToast";

const { addToast } = useToast()
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const { logout, getToken, getUserName } = useAuth()
const token = computed(() => getToken())
const userName = computed(() => getUserName())
const router = useRouter()
const exitApp = () => {
    const resp = logout()
    if (resp) {
        addToast({
            message: {
                title: "¡Éxito!",
                message: "Cierre de sesión exitosamente.",
                type: "info"
            },
        });
        router.push({ name: 'login' })
    }
}
</script>
<template>
    <div
        class=" sticky top-0 z-10 shrink-0 flex h-16 bg-white dark:bg-slate-900 md:bg-transparent md:dark:bg-transparent backdrop-filter backdrop-blur-md shadow md:shadow-none md:py-2 md:h-auto border-b border-transparent md:border-slate-200 dark:border-slate-700">
        <button @click="toggleSidebar()" aria-label="Open sidebar"
            class="px-4 border-r border-slate-200 dark:border-slate-700 text-slate-500 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-600 dark:focus:text-slate-500 md:hidden">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </button>
        <button @click="toggleCollapsableMode()" aria-label="Open sidebar"
            class="px-4 border-r border-slate-200 dark:border-slate-700 text-slate-500 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-600 dark:focus:text-slate-500 hidden md:block">
            <svg class="h-6 w-6 transition delay-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" v-if="!isCollapse" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" v-else />
            </svg>
        </button>
        <div class="flex-1 px-4 sm:px-6 md:px-8 flex justify-between">
            <div class="flex-1 flex">
                <!-- Search component -->
            </div>
            <div class="ml-4 flex items-center md:ml-6 space-x-4">
                <button v-tippy="'alternar el modo oscuro'" type="button" @click="toggleDarkMode()"
                    class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    <IconSun v-show="isDark" class="w-5 h-5" />
                    <IconMoon v-show="!isDark" class="w-5 h-5" />
                </button>
                <button v-tippy="'alternar pantalla completa'" type="button" @click="toggleFullScreen()"
                    class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    <!-- iconos de maximizar y minimizar -->
                    <IconExpand v-show="!isFullscreen" class="w-5 h-5" />
                    <IconCompress v-show="isFullscreen" class="w-5 h-5" />
                </button>
                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                    <Dropdown align="right" width="56">
                        <template #trigger>
                            <button
                                class="max-w-xs flex items-center text-sm rounded-full overflow-hidden focus:outline-none hover:bg-slate-50 dark:focus:bg-slate-700 dark:hover:bg-slate-800 lg:p-2 lg:rounded-md">
                                <span class=" text-slate-900 dark:text-white text-sm leading-5 font-medium block" v-text="userName"></span>
                                <IconChevronDown class="hidden shrink-0 ml-1 h-4 w-4 text-slate-400 lg:block" />
                            </button>
                        </template>
                        <template #content>
                            <div class="py-1">
                                <DropdownLink @click="exitApp" class="w-full">
                                    <!-- iconos de cerrar sesion -->
                                    <IconRightFromBracket
                                        class=" mr-3 h-5 w-5 text-red-400 group-hover:text-red-500 group-focus:text-red-500" />
                                    Cerrar sesión
                                </DropdownLink>
                            </div>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>