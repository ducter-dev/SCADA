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
          Utilerías
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
        <td class="py-2 px-6 text-sm text-gray-500 whitespace-nowrap">
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
          {{ tanque.clave }}
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
          {{ tanque.hora }}
        </td>
        <td
          class="py-2 px-4 text-sm text-gray-500 text-center whitespace-nowrap"
        >
          {{ tanque.fecha }}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill w-3 h-3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
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
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="trash-can"
                class="w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"
                ></path>
              </svg>
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
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="microphone-lines"
                class="svg-inline--fa fa-microphone-lines w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M192 352c53.03 0 96-42.97 96-96h-80C199.2 256 192 248.8 192 240S199.2 224 208 224H288V192h-80C199.2 192 192 184.8 192 176S199.2 160 208 160H288V127.1h-80c-8.836 0-16-7.164-16-16s7.164-16 16-16L288 96c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z"
                ></path>
              </svg>
            </button>
          </div>
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
    const router = useRouter();
    const store = useStore();

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
          return "Sencillo";
        case 2:
          return "Full A";
        case 3:
          return "Full B";
      }
    }

    function setConector(conector) {
      switch (conector) {
        case 1:
          return "Izquiero";
        case 2:
          return "Derecho";
        case 3:
          return "Ambos";
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
