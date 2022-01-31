<template>
  <table class="min-w-full">
    <thead class="text-dark border border-b-dark">
      <tr>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            uppercase
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
            text-center text-gray-700
            uppercase
          "
        >
          AT
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            dark:text-gray-400
          "
        >
          Tipo
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            uppercase
          "
        >
          Capacidad
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            uppercase
          "
        >
          Llenadera
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            uppercase
          "
        >
          Hora
        </th>
        <th
          scope="col"
          class="
            py-3
            px-6
            text-xs
            font-medium
            tracking-wider
            text-center text-gray-700
            uppercase
          "
        >
          Fecha
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="odd:bg-white even:bg-gray-50 border-b"
        v-for="(tanque, index) in tanques"
        :key="tanque.id"
      >
        <td
          class="
            py-4
            px-4
            text-sm text-center
            font-medium
            text-gray-500
            whitespace-nowrap
          "
        >
          {{ index + 1 }}
        </td>
        <td class="py-2 px-6 text-sm text-gray-500 text-center whitespace-nowrap">
          {{ tanque.numAt }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ setTipo(tanque.tipo) }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.capacidad }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.llenadera }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.hora }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.fecha }}
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
    tanques: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    function setTipo(categoria) {
      switch (categoria) {
        case 1:
          return "Sencillo"
        case 2:
          return "Full A"
        case 3:
          return "Full B"
      }
    }

    return {
      setTipo,
    }
  },
}
</script>
