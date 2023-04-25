<template>
  <table class="min-w-full">
    <thead class="border text-dark border-b-dark">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          No.
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          AT
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400"
        >
          Tipo
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Capacidad
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Llenadera
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Hora
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Fecha
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b odd:bg-white even:bg-gray-50"
        v-for="(tanque, index) in tanques"
        :key="tanque.id"
      >
        <td
          class="px-4 py-4 text-sm font-medium text-center text-gray-500  whitespace-nowrap"
        >
          {{ index + 1 }}
        </td>
        <td class="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap">
          {{ tanque.atName }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ setTipo(tanque.atTipo) }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.capacidad }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.llenadera }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.horaEntrada }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.fechaEntrada }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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

    function setTipo(categoria) {
      switch (categoria) {
        case 0:
          return "Sencillo"
        case 1:
          return "Full A"
        case 2:
          return "Full B"
      }
    }

    return {
      setTipo,
    }
  },
}
</script>
