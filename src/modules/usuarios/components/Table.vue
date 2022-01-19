<template>
  <table class="min-w-full">
    <thead class="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-left text-gray-700
            uppercase
            dark:text-gray-400
          "
        >
          No.
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-left text-gray-700
            uppercase
            dark:text-gray-400
          "
        >
          Nombre
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-left text-gray-700
            uppercase
            dark:text-gray-400
          "
        >
          Categoria
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-left text-gray-700
            uppercase
            dark:text-gray-400
          "
        >
          Departamento
        </th>
        <th scope="col" class="relative py-3 px-6">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="odd:bg-white even:bg-gray-50 border-b"
        v-for="(user, index) in usuarios"
        :key="user.id"
      >
        <td
          class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
        >
          {{ index + 1 }}
        </td>
        <td
          class="
            py-4
            px-6
            text-sm text-gray-500
            whitespace-nowrap
            dark:text-gray-400
          "
        >
          {{ user.username }}
        </td>
        <td
          class="
            py-4
            px-6
            text-sm text-gray-500
            whitespace-nowrap
            dark:text-gray-400
          "
        >
          {{ setCategoria(user.categoria) }}
        </td>
        <td
          class="
            py-4
            px-6
            text-sm text-gray-500
            whitespace-nowrap
            dark:text-gray-400
          "
        >
          {{ setDepartamento(user.departamento) }}
        </td>
        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
          <button
            type="button"
            class="
              text-white
              bg-black
              hover:bg-dark
              focus:ring-4 focus:ring-gray-300
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              text-center
              mr-2
              mb-2
            "
            @click="submitUser(user)"
          >
            Editar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  props: {
    usuarios: {
      type: Array,
      default: []
    },
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    function submitUser(user) {
      store.dispatch("user/selectUser", user)
      router.push('/dashboard/usuarios/editar')
    }

    function setCategoria(categoria) {
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

    function setDepartamento(departamento) {
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
      submitUser,
      setCategoria,
      setDepartamento,
    }
  },
}
</script>
