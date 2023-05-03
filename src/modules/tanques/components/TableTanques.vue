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
          Autotanque
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Tipo
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Conector
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Capacidad 90
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Transportadora
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-700 uppercase "
        >
          Acciones
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
          {{ setConector(tanque.conector) }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.capacidad90 }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          {{ tanque.transportadora }}
        </td>
        <td
          class="px-4 py-2 text-sm text-center text-gray-500 whitespace-nowrap"
        >
          <div class="flex items-center justify-center">
            <button
              type="button"
              class="
                text-white
                bg-yellow-500
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
            <button
              type="button"
              class="
                text-white
                bg-link
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
              @click="$emit('deleteTank', tanque)"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRouter } from 'vue-router'
import useTanque from '../composables/useTanque'

export default {
  props: {
    tanques: {
      type: Array,
      default: [],
    },
  },
  setup () {
    const router = useRouter()
    const { setSelectTank } = useTanque()
    
    function setTipo(tipo) {
      switch (tipo) {
        case 0:
          return "Sencillo"
        case 1:
          return "Full A"
        case 2:
          return "Full B"
      }
    }

    function setConector(conector) {
      switch (conector) {
        case 1:
          return "Derecho"
        case 2:
          return "Izquierdo"
        case 3:
          return "Ambos"
      }
    }
    
    function updateTanque(tanque) {
      setSelectTank(tanque)
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