
<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

const closeModal = () => {
    isOpen.value = false
}
const openModal = () => {
    isOpen.value = true
}

</script>
<template>
    <button class="p-2" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 h-4 text-slate-600 dark:text-slate-300"
            fill="currentColor">
            <path
                d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
        </svg>
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 opacity-75 bg-slate-600 dark:bg-slate-600" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-full p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">

                            <div class="">
                                <!-- Modal header -->
                                <div class="flex items-start justify-between p-3 border-b rounded-t dark:border-slate-600">
                                    <DialogTitle as="h3" class="text-xl font-semibold text-slate-900 dark:text-white">
                                        Agregar entrada
                                    </DialogTitle>
                                    <button type="button" @click="closeModal"
                                        class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white">
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="sr-only">Cerrar</span>
                                    </button>
                                </div>
                            </div>
                            <!-- Modal body -->
                            <div class="p-3 space-y-6">
                                <div class="grid grid-cols-6 gap-4">
                                    <div class="col-span-6">
                                        <LFloatInput  label="ID" square/>
                                    </div>
                                    <div class="col-span-6">
                                        <LFloatInput  label="Nombre" square/>
                                    </div>
                                    <div class="col-span-6">
                                        <LFloatInput  label="Tipo" square/>
                                    </div>
                                    <div class="col-span-6">
                                        <LFloatInput  label="Conector" square/>
                                    </div>
                                    <div class="col-span-6">
                                        <LFloatInput  label="Capacidad 90" square/>
                                    </div>
                                    <div class="col-span-6">
                                        <LFloatInput  label="Transportadora" square/>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div
                                class="flex items-center justify-end p-3 space-x-2 border-t border-slate-200 dark:border-slate-600">
                                <button type="button"
                                    class="px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>