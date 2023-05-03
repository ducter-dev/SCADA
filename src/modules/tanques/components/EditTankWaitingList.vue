
<script setup>
import { ref, reactive, watch, computed } from 'vue'
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
import useToast from "../../dashboard/composables/useToast"
import useEventsBus from "../../../layout/eventBus"
import useBitacora from '../../bitacora/composables'
import useAuth from '../../auth/composables/useAuth'
import useTanqueEspera from '../composables/useTanqueEspera'
import useTanque from '../composables/useTanque'
import EditIcon from "../../../assets/icons/edit.svg"
const props = defineProps({
  tanque: {}
})
//console.log("🚀 ~ file: EditTankWaitingList.vue:23 ~ props.tanque:", props.tanque)

const { addToast } = useToast()
const { emit } = useEventsBus()
const { insertBitacora } = useBitacora()
const { getCurrentUser } = useAuth()
const { updateTanqueEspera } = useTanqueEspera()
const { getTanques } = useTanque()

const tanques = computed(() => getTanques())

const isOpen = ref(false)
const loader = ref(false)

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}

const currentUser = computed(() => getCurrentUser())
//console.log("🚀 ~ file: EditTankWaitingList.vue:48 ~ currentUser.value :", currentUser.value )
const tanqueSel = props.tanque
//console.log("🚀 ~ file: EditTankWaitingList.vue:45 ~ tanqueSel:", tanqueSel)

const tanksTypes = [
  { id: 0, name: 'Sencillo', sufix: '', unavailable: false },
  { id: 1, name: 'Full A', sufix: 'A', unavailable: false },
  { id: 2, name: 'Full B', sufix: 'B', unavailable: false }
]

const tankConnectors = [
  { id: 1, name: 'Izquierdo', unavailable: false },
  { id: 2, name: 'Derecho', unavailable: false },
  { id: 3, name: 'Ambos', unavailable: false }
]

const tipoInitial = tanksTypes.find(t => t.id == tanqueSel.atTipo)
const conectorInitial = tankConnectors.find(d => d.id == tanqueSel.conector)

const getInitialFormData = () => ({
  id: tanqueSel.id,
  atId: tanqueSel.atId,
  atTipo: tipoInitial,
  atName: tanqueSel.atName,
  password: tanqueSel.password,
  embarque: tanqueSel.embarque,
  capacidad: tanqueSel.capacidad,
  conector: conectorInitial,
  posicion: tanqueSel.posicion,
})

const tanqueForm = reactive(getInitialFormData())

const resetForm = () => Object.assign(tanqueForm, getInitialFormData())

async function onSubmit() {
  loader.value = true
  const body = {
    id: tanqueForm.id,
    atId: tanqueForm.atId,
    atTipo: tanqueForm.atTipo.id,
    atName: tanqueForm.atName,
    password: tanqueForm.password,
    embarque: tanqueForm.embarque,
    capacidad: tanqueForm.capacidad,
    conector: tanqueForm.conector.id,
    posicion: tanqueForm.posicion,
  }
  console.log("🚀 ~ file: EditTanque.vue:93 ~ onSubmit ~ body:", body)

  const { data, status } = await updateTanqueEspera(body)
  console.log("🚀 ~ file: EditTanque.vue:96 ~ onSubmit ~ status:", status)
  console.log("🚀 ~ file: EditTanque.vue:97 ~ onSubmit ~ data:", data)

  if (status == 200) {
    loader.value = false
    emit("successUpdateTanqueWaiting", true)
    closeModal()
    resetForm()
    const objBitacora = {
      user: currentUser.value.id,
      actividad: `El usuario ${currentUser.value.username} actualizó al tanque ${data.atName} de la lista de espera.`,
      evento: 28,
    }
    insertBitacora(objBitacora)
    addToast({
      message: {
        title: "Éxito!",
        message: `El tanque ${data.atName} de la lista de espera ha sido actualizado.`,
        type: "success"
      },
    })
  } else {
    loader.value = false
    addToast({
      message: {
        title: "¡Error!",
        message: data,
        type: "error",
        component: "editTankWaitingList - onSubmit()"
      },
    })
  }

}

watch(() => tanqueForm.atId, () => {
    const { sufix } = tanksTypes.find(t => t.id == tanqueForm.atTipo.id)
    console.log("🚀 ~ file: EditTankWaitingList.vue:131 ~ watch ~ tanqueForm.atId:", tanqueForm.atId)
    tanqueForm.atName = tanqueForm.atId < 999 ? `PG-0${tanqueForm.atId}${sufix}` : `PG-${tanqueForm.atId}${sufix}`
    tanqueForm.password = tanqueForm.atTipo.id
    const pgFinded = tanques.value.find( t => t.atName === tanqueForm.atName)
    if (pgFinded) { 
        tanqueForm.capacidad = pgFinded.capacidad90
        tanqueForm.conector = tankConnectors.find(t => t.id == pgFinded.conector)
    }
})

watch(() => tanqueForm.atTipo, () => {
    const { sufix } = tanksTypes.find(t => t.id == tanqueForm.atTipo.id)
    console.log("🚀 ~ file: EditTankWaitingList.vue:143 ~ watch ~ tanqueForm.atId:", tanqueForm.atId)
    tanqueForm.atName = tanqueForm.atId < 999 ? `PG-0${tanqueForm.atId}${sufix}` : `PG-${tanqueForm.atId}${sufix}`
    tanqueForm.password = tanqueForm.atTipo.id
    const pgFinded = tanques.value.find( t => t.atName === tanqueForm.atName)
    if (pgFinded) { 
        tanqueForm.capacidad = pgFinded.capacidad90
        tanqueForm.conector = tankConnectors.find(t => t.id == pgFinded.conector)
    }
})

</script>

<template>
  <button type="button" @click="openModal"
    class="px-2 py-1.5 text-sm font-medium text-yellow-900 bg-transparent border border-yellow-900 hover:bg-yellow-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-yellow-500 focus:bg-yellow-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-yellow-700 dark:focus:bg-yellow-700">
    <EditIcon class="w-3 h-3" />
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
                    Editar tanque - Lista de espera
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
                    <LFloatInput v-model.number="tanqueForm.atId" mask="#####" label="PG" square />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <Listbox v-model="tanqueForm.atTipo">
                      <div class="relative mt-1">
                        <ListboxButton class="w-full">
                          <LFloatInput label="Tipo" v-model="tanqueForm.atTipo.name" square with-append-icon readonly>
                            <template #append-icon>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                              </svg>
                            </template>
                          </LFloatInput>
                        </ListboxButton>
                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                          leave-to-class="opacity-0">
                          <ListboxOptions
                            class="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="item in tanksTypes" :key="item.id" :value="item"
                              :disabled="item.unavailable" v-slot="{ active, selected }">
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
                                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
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
                    <LFloatInput v-model.number="tanqueForm.atName" label="Nombre" square />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <Listbox v-model="tanqueForm.conector">
                      <div class="relative mt-1">
                        <ListboxButton class="w-full">
                          <LFloatInput label="Conector" v-model="tanqueForm.conector.name" square with-append-icon
                            readonly>
                            <template #append-icon>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 text-gray-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                              </svg>
                            </template>
                          </LFloatInput>
                        </ListboxButton>
                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                          leave-to-class="opacity-0">
                          <ListboxOptions
                            class="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="item in tankConnectors" :key="item.id" :value="item"
                              :disabled="item.unavailable" v-slot="{ active, selected }">
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
                                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor" aria-hidden="true">
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
                    <LFloatInput v-model="tanqueForm.capacidad" label="Capacidad" square />
                  </div>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex items-center justify-end p-3 space-x-2 border-t border-slate-200 dark:border-slate-600">
                <button type="button" @click="onSubmit" :disabled="loader"
                  class="px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                  <template v-if="loader">
                    <svg class="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor" />
                    </svg>

                    Guardando
                  </template>
                  <template v-else> Guardar </template>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>