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
const { logout, getToken, getUserName, getCurrentUser } = useAuth()
const token = computed(() => getToken())
const userName = computed(() => getUserName())
const router = useRouter()
const currentUser = computed(() => getCurrentUser())

const exitApp = async () => {
    const oldUser = currentUser.value
    const objBitacora = {
        user: oldUser.id,
        actividad: `El usuario ${oldUser.username} ha cerrado sesión.`,
        evento: 2,
    }
    
    const resp = await logout(objBitacora)
    if (resp) {
        addToast({
            message: {
                title: "¡Éxito!",
                message: "Cierre de sesión exitosamente.",
                type: "info"
            },
        })
        router.push({ name: 'login' })
    }
}
</script>
<template>
    <div
        class="sticky top-0 z-10 flex h-16 bg-white border-b border-transparent shadow shrink-0 dark:bg-slate-900 md:bg-transparent md:dark:bg-transparent backdrop-filter backdrop-blur-md md:shadow-none md:py-2 md:h-auto md:border-slate-200 dark:border-slate-700">
        <button @click="toggleSidebar()" aria-label="Open sidebar"
            class="px-4 border-r border-slate-200 dark:border-slate-700 text-slate-500 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-600 dark:focus:text-slate-500 md:hidden">
            <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </button>
        <button @click="toggleCollapsableMode()" aria-label="Open sidebar"
            class="hidden px-4 border-r border-slate-200 dark:border-slate-700 text-slate-500 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-600 dark:focus:text-slate-500 md:block">
            <svg class="w-6 h-6 transition delay-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" v-if="!isCollapse" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" v-else />
            </svg>
        </button>
        <div class="flex justify-between flex-1 px-4 sm:px-6 md:px-8">
            <div class="flex flex-1">
                <!-- Search component -->
            </div>
            <div class="flex items-center ml-4 space-x-4 md:ml-6">
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
                <div class="relative ml-3">
                    <Dropdown align="right" width="56">
                        <template #trigger>
                            <button
                                class="flex items-center max-w-xs overflow-hidden text-sm rounded-full focus:outline-none hover:bg-slate-50 dark:focus:bg-slate-700 dark:hover:bg-slate-800 lg:p-2 lg:rounded-md">
                                <span class="block text-sm font-medium leading-5 text-slate-900 dark:text-white" v-text="userName"></span>
                                <IconChevronDown class="hidden w-4 h-4 ml-1 shrink-0 text-slate-400 lg:block" />
                            </button>
                        </template>
                        <template #content>
                            <div class="py-1">
                                <DropdownLink @click="exitApp" class="w-full">
                                    <!-- iconos de cerrar sesion -->
                                    <IconRightFromBracket
                                        class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-500 group-focus:text-red-500" />
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