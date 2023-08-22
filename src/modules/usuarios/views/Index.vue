<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Paginate from '@/layout/components/Paginate/Index.vue'
import useToast from "@/modules/dashboard/composables/useToast"
import IconPlus from '@/assets/icons/plus-solid.svg'
import IconSearch from '@/assets/icons/search.svg'
import RefreshIcon from "@/assets/icons/update.svg"
import EditIcon from "@/assets/icons/pencil.svg"
import useUsuario from '../composables/useUser'

const router = useRouter()
const { fetchUsuarios, fetchUsersFilter, setSelectedUsuario } = useUsuario()
const { addToast } = useToast()

let users = ref([])
let loading = ref(false)
let query = ref('')

const links = ref([])
let pagination = reactive({
  current_page: 1,
  size: 15,
})

const obtenerUsuarios = async () => {
  console.log('2')
  try {
    loading.value = true
    const params = { page: pagination.current_page, size: pagination.size }
    const res = await fetchUsuarios(params)
    const { data, status, message, paginacion } = res

    if (status == 200) {
      const { first, last, next, prev, self } = paginacion.links
      links.value.push(first)
      links.value.push(last)
      links.value.push(next)
      links.value.push(prev)
      links.value.push(self)
      pagination = paginacion
      pagination.from = (paginacion.size * (paginacion.page - 1)) + 1
      pagination.to = paginacion.size * paginacion.page
      pagination.current_page = paginacion.page
      pagination.last_page = paginacion.pages
      pagination.links = links.value
      users.value = data
      loading.value = false
    } else {
      loading.value = false
      addToast({
        message: {
          title: "¡Error!",
          message: message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: error,
        type: "error"
      },
    })
    router.push('/auth')
  }
}

const goToInsert = () => {
  router.push({ name: 'usuarios.create' })
}

const goToEdit = (item) => {
  setSelectedUsuario(item)
  router.push({ name: 'usuarios.edit' })
}

const search = async () => {
  
  try {
    if (query.value.length < 3) {
      if (query.value.length == 0) {
        pagination.current_page = 1
        pagination.size = 15
        obtenerUsuarios()
      }
      return
    }
    loading.value = true
    const res = await fetchUsersFilter(query.value)
    const { data, status, message, paginacion } = res

    if (status == 200) {
      const { first, last, next, prev, self } = paginacion.links
      links.value.push(first)
      links.value.push(last)
      links.value.push(next)
      links.value.push(prev)
      links.value.push(self)
      pagination = paginacion
      pagination.from = (paginacion.size * (paginacion.page - 1)) + 1
      pagination.to = paginacion.size * paginacion.page
      pagination.current_page = paginacion.page
      pagination.last_page = paginacion.pages
      pagination.links = links.value
      users.value = data
      loading.value = false
    } else {
      loading.value = false
      addToast({
        message: {
          title: "¡Error!",
          message: message,
          type: "error"
        },
      })
    }
  } catch (error) {
    addToast({
      message: {
        title: "¡Error!",
        message: error,
        type: "error"
      },
    })
    router.push('/auth')
  }
}

const setCategoria = (categoria) => {
  switch (categoria) {
    case 1:
      return 'Administrador'
    case 2:
      return 'Supervisor'
    case 3:
      return 'Operador'
    case 4:
      return 'Auditor Fiscal'
  }
}

const setDepartamento = (departamento) => {
  switch (departamento) {
    case 1:
      return 'Administración'
    case 2:
      return 'Cuarto de Control'
    case 3:
      return 'Acceso'
    case 4:
      return 'Báscula'
    case 5:
      return 'Exterior'
  }
}

onMounted(() => {
  obtenerUsuarios()
})
</script>


<template>
  <LBreadcrumb :back-route="{ name: 'dashboard.home' }">
    <ol role="list" class="flex items-center space-x-1">
      <li>
        <div>
          <router-link :to="{ name: 'usuarios.home' }" class="text-slate-400 hover:text-slate-500">
            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="sr-only">Inicio</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <router-link :to="{ name: 'usuarios.home' }"
            class="ml-2 text-sm font-medium text-slate-500 hover:text-slate-700">Usuarios</router-link>
        </div>
      </li>
    </ol>
  </LBreadcrumb>
  <div
    class="py-3 space-y-3 border-b border-slate-200 dark:border-slate-700 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
    <h2 class="py-1 text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-3xl sm:leading-9 sm:truncate">
      Usuarios
    </h2>
  </div>
  <div class="mt-5 space-y-5">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="border border-solid border-slate-300">
            <div class="flex items-center justify-between">
              <legend class="p-2 text-base font-medium text-slate-900 dark:text-white">Lista de usuarios
              </legend>
              <div class="flex flex-row items-center justify-center my-4">

                <button class="p-2" @click="goToInsert()">
                  <span v-tippy="'Ingresar'">
                    <IconPlus
                      class="w-4 h-4 transform text-slate-600 hover:scale-110 dark:text-slate-300 hover:fill-current hover:text-primary"
                      fill="currentColor" />
                  </span>
                </button>
                <button class="p-2" @click="obtenerUsuarios()">
                  <span v-tippy="'Actualizar'">
                    <RefreshIcon
                      class="w-4 h-4 transform text-slate-600 hover:scale-110 dark:text-slate-300 hover:fill-current hover:text-primary"
                      :class="loading ? 'animate-spin' : ''" fill="currentColor" />
                  </span>
                </button>
                <div class="flex flex-col items-center">
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconSearch class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="currentColor" />
                    </div>
                    <input @input="search" v-model="query" type="text" id="simple-search"
                      class="block w-full p-2 pl-10 text-sm border rounded-lg text-slate-600 border-slate-300 bg-slate-50 focus:ring-slate-600 focus:border-slate-600 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
                      placeholder="Buscar..." required="" />
                  </div>
                </div>
              </div>
            </div>
            <LTable :loader="loading">
              <template #head>
                <tr>
                  <LHeaderTh value="No." center />
                  <LHeaderTh value="Nombre" center />
                  <LHeaderTh value="Email" center />
                  <LHeaderTh value="Categoría" center />
                  <LHeaderTh value="Departamento" center />
                  <LHeaderTh value="Acciones" center />
                </tr>
              </template>
              <template #body>
                <tr v-for="(user, index) in users" v-if="users.length > 0" :key="user.id">
                  <LBodyTh :value="index + 1" center />
                  <LBodyTd :value="user.username" center />
                  <LBodyTd :value="user.email" center />
                  <LBodyTd :value="setCategoria(user.categoria)" center />
                  <LBodyTd :value="setDepartamento(user.departamento)" center />
                  <LBodyTd center>
                    <div class="inline-flex shadow-sm" role="group">
                      <span class="mr-2 transform cursor-pointer hover:scale-110" v-tippy="'Editar'"
                        @click="goToEdit(user)">
                        <EditIcon class="w-4 h-4 hover:fill-current hover:text-primary" />
                      </span>
                      <!-- <DeleteUser :model="item" :id="item.id" @successSubmit="fetchDataUsuarios()" /> -->
                    </div>
                  </LBodyTd>
                </tr>
                <tr v-else>
                  <LBodyTh value="Sin información" colspan="7" center />
                </tr>
              </template>
            </LTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Paginate v-if="pagination.last_page > 1" :pagination="pagination" :offset="7" @changePaginate="obtenerUsuarios()" />
</template>