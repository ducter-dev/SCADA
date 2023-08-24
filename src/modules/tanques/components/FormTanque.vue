<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useTanque from '../composables/useTanque'
import useToast from '../../dashboard/composables/useToast'


const { getTanqueSelect, getTanques } = useTanque()
const tanques = computed(() => getTanques())
const router = useRouter()
const tanqueSelected = computed(() => getTanqueSelect())
const { emit } = useEventsBus()
const { addToast } = useToast()

const isEditing = ref(false)
const isDisabled = ref(true)
const existTank = ref(false)

const tiposTanque = [
  { id: 0, nombre: 'Sencillo', sufix: '' },
  { id: 1, nombre: 'Full A', sufix: 'A' },
  { id: 2, nombre: 'Full B', sufix: 'B' }
]

const conectorTanque = [
  { id: 1, nombre: 'Izquierdo' },
  { id: 2, nombre: 'Derecho' },
  { id: 3, nombre: 'Ambos' }
]

const initialFormData = () => ({
  atId: 0,
  atName: '',
  atTipo: 0, 
  capacidad90: 0,
  conector: 3,
  transportadora: 0
})

const tanqueForm = reactive(initialFormData())

if (Object.keys(tanqueSelected.value).length > 0) {
  isEditing.value = true
  isDisabled.value = false
  tanqueForm.id = tanqueSelected.value.id
  tanqueForm.atId = tanqueSelected.value.atId
  tanqueForm.atName = tanqueSelected.value.atName
  tanqueForm.atTipo = tanqueSelected.value.atTipo
  tanqueForm.capacidad90 = tanqueSelected.value.capacidad90
  tanqueForm.conector = tanqueSelected.value.conector
  tanqueForm.transportadora = tanqueSelected.value.transportadora
}


const resetform = () => {
  Object.assign(tanqueForm, initialFormData())
}

const handleSubmit = () => {
  if (existTank.value) {
    errorDuplicateTank()
    return 
  }
  const obj = {
    id: tanqueForm.id,
    atId: tanqueForm.atId,
    atName: tanqueForm.atName,
    atTipo: tanqueForm.atTipo,
    capacidad90: tanqueForm.capacidad90,
    conector: tanqueForm.conector,
    transportadora: tanqueForm.transportadora,
  }
  emit('submitForm', obj)
  resetform()
}

const errorDuplicateTank = () => {
  addToast({
    message: {
      title: "¡Error!",
      message: "El tanque ya exite en los registros.",
      type: "error",
      component: "create - onSubmit()"
    },
  })
}

const goBack = () => {
  router.go(-1)
}

watch(() => tanqueForm.atId, () => {
    const { sufix } = tiposTanque.find(t => t.id == tanqueForm.atTipo)
    tanqueForm.atName = tanqueForm.atId < 999 ? `PG-0${tanqueForm.atId}${sufix}` : `PG-${tanqueForm.atId}${sufix}`
    
    const pgFinded = tanques.value.find( t => t.atName === tanqueForm.atName)
    if (pgFinded) { 
      tanqueForm.capacidad90 = pgFinded.capacidad90
      tanqueForm.conector =  pgFinded.conector
      isDisabled.value = true
      existTank.value = true
    }
    else {
      tanqueForm.capacidad90 = 0
      tanqueForm.conector = 3
      isDisabled.value = false
      existTank.value = false
    }
})

watch(() => tanqueForm.atTipo, () => {
    const { sufix } = tiposTanque.find(t => t.id == tanqueForm.atTipo)
    tanqueForm.atName = tanqueForm.atId < 999 ? `PG-0${tanqueForm.atId}${sufix}` : `PG-${tanqueForm.atId}${sufix}`

    const pgFinded = tanques.value.find( t => t.atName === tanqueForm.atName)
    if (pgFinded) { 
      tanqueForm.capacidad90 = pgFinded.capacidad90
      tanqueForm.conector = pgFinded.conector
      isDisabled.value = true
      existTank.value = true
    } else {
      tanqueForm.capacidad90 = 0
      tanqueForm.conector = 3
      isDisabled.value = false
      existTank.value = false
    }
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="id"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="tanqueForm.atId" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Id</label>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <label for="tipos" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un Tipo</label>
      <select required id="tipo" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5"
          v-model="tanqueForm.atTipo">
        <option v-for="tipo in tiposTanque" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="id"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="tanqueForm.atName" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <label for="tipos" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un Conector</label>
      <select required id="tipo" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5"
          v-model="tanqueForm.conector">
        <option v-for="c in conectorTanque" :key="c.id" :value="c.id">{{ c.nombre }}</option>
      </select>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="id"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="tanqueForm.capacidad90" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Capacidad</label>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <button type="button"
        class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2"
        @click="goBack">Cancelar
      </button>
      <button type="submit"
        class="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2"
        :class="isDisabled ? 'bg-blue-300 hover:bg-blue-400 focus:ring-blue-100' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300'"
        :disabled="isDisabled"
        >
          Guardar
      </button>
    </div>
  </form>
</template>

