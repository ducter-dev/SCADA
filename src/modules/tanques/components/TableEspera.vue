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
          Posición
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
            uppercase
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
          Clave
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
          Embarque
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
        v-for="tanque in tanques"
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
          {{ tanque.posicion }}
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
          {{ tanque.atId }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.embarque }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.capacidad }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ setConector(tanque.conector) }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.horaEntrada }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.fechaEntrada }}
        </td>
        <td class="py-2 px-6 text-sm font-medium text-right whitespace-nowrap">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="
                bg-warning
                text-dark
                focus:ring-4 focus:ring-blue-300
                font-medium
                rounded-full
                text-sm
                p-2
                text-center
                inline-flex
                items-center
              "
              @click="editTanque(tanque)"
            >
              <EditIcon class="w-3 h-3" />
            </button>
            <button
              type="button"
              class="
                bg-link
                text-white
                focus:ring-4 focus:ring-blue-300
                font-medium
                rounded-full
                text-sm
                p-2
                text-center
                inline-flex
                items-center
              "
              @click="deleteTanque(tanque)"
            >
              <DeleteIcon class="-3 h-3" />
            </button>
            <button
              type="button"
              class="
                bg-dark
                text-white
                focus:ring-4 focus:ring-blue-300
                font-medium
                rounded-full
                text-sm
                p-2
                text-center
                inline-flex
                items-center
              "
              @click="callTanque(tanque)"
            >
              <CallIcon class="w-3 h-3" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRouter } from 'vue-router'
import EditIcon from '../../../assets/icons/edit.svg'
import DeleteIcon from '../../../assets/icons/trash-can-solid.svg'
import CallIcon from '../../../assets/icons/call.svg'

export default {
  props: {
    tanques: {
      type: Array,
      default: [],
    },
  },
  components: {
    EditIcon,
    DeleteIcon,
    CallIcon,
  },
  setup() {
    const router = useRouter();

    function editTanque(tanque) {
      // editar tanque
      console.log(`Editar tanque: ${tanque.numAt}`)
    }

    function deleteTanque(tanque) {
      // editar tanque
      console.log(`Eliminar tanque: ${tanque.numAt}`)
    }

    function callTanque(tanque) {
      // editar tanque
      console.log(`Llamar tanque: ${tanque.numAt}`)
    }

    function setTipo(categoria) {
      switch (categoria) {
        case 1:
          return "Sencillo"
        case 2:
          return "Full A"
        case 3:
          return "Full B"
        case 4:
          return ""
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
        case 4:
          return "Ambos"
      }
    }

    return {
      editTanque,
      setTipo,
      setConector,
      deleteTanque,
      callTanque,
    };
  },
};
</script>
