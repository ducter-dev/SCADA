<script>
import { useRouter } from 'vue-router'
import EditIcon from "../../../assets/icons/edit.svg"
import DeleteIcon from "../../../assets/icons/trash-can-solid.svg"
import EditUser from '../components/EditUser.vue'

export default {
  props: {
    usuarios: {
      type: Array,
      default: []
    },
  },
  components: {
    EditIcon,
    DeleteIcon,
    EditUser,
  },
  setup(context) {
    const router = useRouter()

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

    return {
      setCategoria,
      setDepartamento,
    }
  },
}
</script>


<template>
  <LTable>
    <template #head>
      <tr>
        <LHeaderTh value="No." center />
        <LHeaderTh value="Nombre" center />
        <LHeaderTh value="Categoría" center />
        <LHeaderTh value="Departamento" center />
        <LHeaderTh value="Acciones" center />
      </tr>
    </template>
    <template #body>
      <tr v-for="(user, index) in usuarios" :key="user.id">
        <LBodyTh :value="index + 1" center />
        <LBodyTd :value="user.username" center />
        <LBodyTd :value="setCategoria(user.categoria)" center />
        <LBodyTd :value="setDepartamento(user.departamento)" center />
        <LBodyTd center>
          <div class="inline-flex shadow-sm" role="group">
            <EditUser :user="user" />
            <button type="button" @click="openModalDelete(user)"
              class="px-2 py-1.5 text-sm font-medium text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:bg-red-700">
              <DeleteIcon class="w-3 h-3" />
            </button>
          </div>
        </LBodyTd>
      </tr>
    </template>
  </LTable>
</template>

