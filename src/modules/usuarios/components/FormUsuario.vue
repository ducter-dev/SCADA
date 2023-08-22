<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from "@/layout/eventBus"
import useToast from '../../dashboard/composables/useToast'
import useUsuario from '../composables/useUser'

const { getSelectedUsuario, getUsuarios } = useUsuario()
const usuarios = computed(() => getUsuarios())
const router = useRouter()
const usuarioSelected = computed(() => getSelectedUsuario())
const { emit } = useEventsBus()
const { addToast } = useToast()

const isEditing = ref(false)
const isDisabled = ref(false)
const existUser = ref(false)


const categorias = [
  { id: 1, nombre: 'Administrador', unavailable: false },
  { id: 2, nombre: 'Supervisor', unavailable: false },
  { id: 3, nombre: 'Operador', unavailable: false },
  { id: 4, nombre: 'Auditor Fiscal', unavailable: false },
]

const departamentos = [
  { id: 1, nombre: 'Administración', unavailable: false },
  { id: 2, nombre: 'Cuarto de Control', unavailable: false },
  { id: 3, nombre: 'Acceso', unavailable: false },
  { id: 4, nombre: 'Báscula', unavailable: false },
  { id: 5, nombre: 'Exterior', unavailable: false },
]

const initialFormData = () => ({
  username: '',
  nombre: '',
  categoria: 0,
  departamento: 0,
  email: ''
})

const userForm = reactive(initialFormData())

if (Object.keys(usuarioSelected.value).length > 0) {
  isEditing.value = true
  userForm.id = usuarioSelected.value.id
  userForm.nombre = usuarioSelected.value.nombre
  userForm.username = usuarioSelected.value.username
  userForm.categoria = usuarioSelected.value.categoria
  userForm.departamento = usuarioSelected.value.departamento
  userForm.email = usuarioSelected.value.email
}


const resetform = () => {
  Object.assign(userForm, initialFormData())
}

const handleSubmit = () => {
  if (existUser.value) {
    errorDuplicateUser()
    return
  }
  const obj = {
    id: userForm.id,
    nombre: userForm.nombre,
    username: userForm.username,
    categoria: userForm.categoria,
    departamento: userForm.departamento,
    email: userForm.email,
  }
  emit('submitForm', obj)
  resetform()
}

const errorDuplicateUser = () => {
  addToast({
    message: {
      title: "¡Error!",
      message: "El usuario ya exite en los registros.",
      type: "error",
      component: "create - onSubmit()"
    },
  })
}

const goBack = () => {
  router.go(-1)
}

watch(() => userForm.username, () => {
  const userFinded = usuarios.value.find(t => t.username === userForm.username)
  if (userFinded) {
    existUser.value = true
  }
  else {
    existUser.value = false
  }
})

</script>

<template>
  <form class="w-8/12 xl:w-6/12" @submit.prevent="handleSubmit">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="nombre"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="userForm.nombre" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre
        Completo</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="id"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="userForm.username" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usuario</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input type="email" name="email"
        class="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required v-model="userForm.email" />
      <label
        class="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <label for="tipos" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona una
        Categoría</label>
      <select required id="tipo" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5" v-model="userForm.categoria">
        <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
      </select>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <label for="tipos" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un
        Departamento</label>
      <select required id="tipo" class="bg-gray-50
          border border-gray-300
          text-dark text-base
          font-semibold
          rounded-lg
          focus:ring-black focus:border-dark
          block
          w-full
          p-2.5" v-model="userForm.departamento">
        <option v-for="d in departamentos" :key="d.id" :value="d.id">{{ d.nombre }}</option>
      </select>
    </div>
    <div class="flex items-center mb-6 md:justify-end">
      <button type="button"
        class="text-dark bg-gray-200 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2"
        @click="goBack">Cancelar
      </button>
      <button type="submit"
        class="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mx-2"
        :class="isDisabled ? 'bg-blue-300 hover:bg-blue-400 focus:ring-blue-100' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300'"
        :disabled="isDisabled">
          Guardar
      </button>
    </div>
  </form>
</template>

