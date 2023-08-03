<script>
import { ref } from 'vue'
import EditIcon from "../../../assets/icons/edit.svg"
import DeleteIcon from "../../../assets/icons/trash-can-solid.svg"
import EditUser from '../components/EditUser.vue'
import ModalDelete from '../../../layout/components/Modal/Delete.vue'
import useUsuario from '../composables/useUser'
import useEventsBus from "../../../layout/eventBus"
import useToast from "@/modules/dashboard/composables/useToast"


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
    ModalDelete,
  },
  setup() {
    const { addToast } = useToast()
    const { emit } = useEventsBus()
    const showModal = ref(false)
    const configModalDelete = ref({})
    const usuarioSelected = ref({})

    const { deleteUsuario } = useUsuario()

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

    const openModalDelete = (item) => {
    showModal.value = true
    configModalDelete.value = {
      text: `¿Desea eliminar el usuario ${item.username}?`,
      okText: 'Eliminar',
      cancelText: 'Cancelar'
    }
      usuarioSelected.value = item
    }

    const deleteUserFromList = async (result) => {
      console.log("🚀 ~ file: Table.vue:66 ~ deleteUserFromList ~ result:", result)
      try {

        if (!result) {
          showModal.value = false
          usuarioSelected.value = {}
          return
        }
        
        const res = await deleteUsuario(usuarioSelected.value)
        console.log("🚀 ~ file: Table.vue:83 ~ deleteUserFromList ~ res:", res)
        return
        const { data, status, message } = res

        // Valida de acuerdo al estatus de la petición
        // Si el código de estatus es diferente de 200 se marcara un error 
        if (status == 200) {
          emit('deleteUser', res)
          addToast({
            message: {
              title: "Éxito!",
              message: `Se elimino ${data.username} de la lista de usuarios.`,
              type: "success"
            },
          })
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: message,
              type: "error"
            },
          })
        }
      } catch (error) {
        // En caso de tener error establece un mensaje de error
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error"
          },
        })
      }

    }

    return {
      setCategoria,
      setDepartamento,
      showModal,
      configModalDelete,
      deleteUserFromList,
      openModalDelete,
    }
  },
}
</script>


<template>
  <ModalDelete :config="configModalDelete" :class="showModal ? '' : 'hidden'" @submitModal="deleteUserFromList" />
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
            <!-- <button type="button" @click="openModalDelete(user)"
              class="px-2 py-1.5 text-sm font-medium text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:bg-red-700">
              <DeleteIcon class="w-3 h-3" />
            </button> -->
          </div>
        </LBodyTd>
      </tr>
    </template>
  </LTable>
</template>

