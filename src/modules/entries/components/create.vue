
<script setup>
import { ref, reactive, watch } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ListboxLabel,
} from '@headlessui/vue'
import { format } from 'date-fns'
import useWaitTank from '../../tanques/composables/useTanqueEspera'
import useToast from "../../dashboard/composables/useToast";
import useEventsBus from "../../../layout/eventBus"

const { addToast } = useToast()
const { emit } = useEventsBus()

const isOpen = ref(false)

const closeModal = () => {
    isOpen.value = false
}
const openModal = () => {
    isOpen.value = true
}

const { agregarTanqueEspera, getCountTanquesEspera } = useWaitTank()

const tanksTypes = [
    { id: 1, name: 'Sencillo', sufix: '', unavailable: false },
    { id: 2, name: 'Full A', sufix: 'A', unavailable: false },
    { id: 3, name: 'Full B', sufix: 'B', unavailable: false }
]

const tankConnectors = [
    { id: 1, name: 'Izquierdo', unavailable: false },
    { id: 2, name: 'Derecho', unavailable: false },
    { id: 3, name: 'Ambos', unavailable: false }
]

const formatDate = (value) => {
    return format(value, 'yyyy-MM-dd')
}

const formatTime = (value) => {
    return format(value, 'H:m:s')
}

const date = ref(new Date())

const getInitialFormData = () => ({
    posicion: 0,
    atId: null,
    atTipo: ref(tanksTypes[0]),
    atName: '',
    capacidad: '',
    conector: ref(tankConnectors[0]),
    password: '',
    embarque: 0,
    horaEntrada: null,
    fechaEntrada: null,
    reporte24: null,
    reporte05: null,
})

const entryForm = reactive(getInitialFormData())

const resetForm = () => Object.assign(entryForm, getInitialFormData())

async function onSubmit() {
    entryForm.posicion = getCountTanquesEspera()
    entryForm.horaEntrada = format(new Date(), 'H:m:s')
    entryForm.fechaEntrada = format(new Date(), 'yyyy-MM-dd')
    entryForm.reporte24 = format(new Date(), 'yyyy-MM-dd')
    entryForm.reporte05 = format(new Date(), 'yyyy-MM-dd')

    const { data, status } = await agregarTanqueEspera({
        posicion: entryForm.posicion,
        atId: entryForm.atId,
        atTipo:entryForm.atTipo.id,
        atName: entryForm.atName,
        capacidad: entryForm.capacidad,
        conector: entryForm.conector.id,
        password: entryForm.password,
        embarque:entryForm.embarque,
        horaEntrada: entryForm.horaEntrada,
        fechaEntrada: entryForm.fechaEntrada,
        reporte24: entryForm.reporte24,
        reporte05: entryForm.reporte05,
    })
    if (status == 200) {
        emit("successRegistration", true);
        resetForm()
        closeModal()
        addToast({
            message: {
                title: "Éxito!",
                message: `Se agregó el tanque ${data.atName} a la lista de espera.`,
                type: "success"
            },
        });
    } else {
        addToast({
            message: {
                title: "¡Error!",
                message: data,
                type: "error",
                component: "create - onSubmit()"
            },
        });
    }
}

watch(() => entryForm.atId, (id) => {
    const { sufix } = tanksTypes.find(t => t.id == entryForm.atTipo.hasOwnProperty('id') ? entryForm.atTipo.id : entryForm.atTipo)
    entryForm.atName = `PG-${id}${sufix}`
    entryForm.password = id
})

watch(() => entryForm.atTipo, () => {
    const { sufix } = tanksTypes.find(t => t.id == entryForm.atTipo.hasOwnProperty('id') ? entryForm.atTipo.id : entryForm.atTipo)
    entryForm.atName = `PG-${entryForm.atId}${sufix}`
})

</script>
<template>
    <button class="p-2" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 h-4 text-blue-600 dark:text-blue-300"
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
                                    <div class="col-span-6 md:col-span-3">
                                        <LFloatInput v-model.number="entryForm.atId" mask="#####" label="PG" square />
                                    </div>
                                    <div class="col-span-6 md:col-span-3">
                                        <LFloatInput v-model.number="entryForm.atName" label="Nombre" square />
                                    </div>
                                    <div class="col-span-6 md:col-span-3">
                                        <Listbox v-model="entryForm.atTipo">
                                            <div class="relative mt-1">
                                                <ListboxButton class="w-full">
                                                    <LFloatInput label="Tipo" v-model="entryForm.atTipo.name" square
                                                        with-append-icon readonly>
                                                        <template #append-icon>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                class="w-5 h-5 text-gray-500">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                            </svg>
                                                        </template>
                                                    </LFloatInput>
                                                </ListboxButton>
                                                <transition leave-active-class="transition ease-in duration-100"
                                                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                    <ListboxOptions
                                                        class=" absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        <ListboxOption as="template" v-for="item in tanksTypes"
                                                            :key="item.id" :value="item" :disabled="item.unavailable"
                                                            v-slot="{ active, selected }">
                                                            <li :class="[
                                                                active
                                                                    ? 'text-white bg-blue-500'
                                                                    : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                            ]">
                                                                <div class="flex items-center">
                                                                    <span :class="[
                                                                        selected ? 'font-semibold' : 'font-normal',
                                                                        'ml-3 block truncate',
                                                                    ]">{{ item.name }}</span>
                                                                </div>

                                                                <span v-if="selected" :class="[
                                                                    active ? 'text-white' : 'text-blue-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                ]">
                                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20" fill="currentColor"
                                                                        aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </span>
                                                            </li>
                                                        </ListboxOption>
                                                    </ListboxOptions>
                                                </transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div class="col-span-6 md:col-span-3">
                                        <Listbox v-model="entryForm.conector">
                                            <div class="relative mt-1">
                                                <ListboxButton class="w-full">
                                                    <LFloatInput label="Conector" v-model="entryForm.conector.name" square
                                                        with-append-icon readonly>
                                                        <template #append-icon>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                class="w-5 h-5 text-gray-500">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                            </svg>
                                                        </template>
                                                    </LFloatInput>
                                                </ListboxButton>
                                                <transition leave-active-class="transition ease-in duration-100"
                                                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                    <ListboxOptions
                                                        class=" absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        <ListboxOption as="template" v-for="item in tankConnectors"
                                                            :key="item.id" :value="item" :disabled="item.unavailable"
                                                            v-slot="{ active, selected }">
                                                            <li :class="[
                                                                active
                                                                    ? 'text-white bg-blue-500'
                                                                    : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                            ]">
                                                                <div class="flex items-center">
                                                                    <span :class="[
                                                                        selected ? 'font-semibold' : 'font-normal',
                                                                        'ml-3 block truncate',
                                                                    ]">{{ item.name }}</span>
                                                                </div>

                                                                <span v-if="selected" :class="[
                                                                    active ? 'text-white' : 'text-blue-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                ]">
                                                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20" fill="currentColor"
                                                                        aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                                            clip-rule="evenodd"></path>
                                                                    </svg>
                                                                </span>
                                                            </li>
                                                        </ListboxOption>
                                                    </ListboxOptions>
                                                </transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div class="col-span-6 md:col-span-3">
                                        <LFloatInput v-model="entryForm.capacidad" label="Capacidad" square />
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div
                                class="flex items-center justify-end p-3 space-x-2 border-t border-slate-200 dark:border-slate-600">
                                <button type="button" @click="onSubmit"
                                    class="px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>