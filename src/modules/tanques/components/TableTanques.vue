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
          Autotanque
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
          Conector
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
          Capacidad 90
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
          Transportadora
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
          Acciones
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
          {{ tanque.atName }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ setTipo(tanque.atTipo) }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ setConector(tanque.conector) }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.capacidad90 }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.transportadora }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
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
            @click="updateTanque(tanque)"
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
    tanques: {
      type: Array,
      default: [],
    },
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    
    function setTipo(tipo) {
      switch (tipo) {
        case 1:
          return "Sencillo"
        case 2:
          return "Full A"
        case 3:
          return "Full B"
      }
    }

    function setConector(conector) {
      switch (conector) {
        case 1:
          return "Izquiero"
        case 2:
          return "Derecho"
        case 3:
          return "Ambos"
      }
    }
    
    function updateTanque(tanque) {
      console.log(tanque)
      store.dispatch("tanques/selectTank", tanque)
      router.push('/dashboard/tanques/editar')
    }

    return {
      setTipo,
      setConector,
      updateTanque,
    }
  }
}
</script>