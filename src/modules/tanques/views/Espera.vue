<template>
  <div class="m-4 sm:m-12 w-full flex flex-col">
    <div class="w-full flex flex-row justify-between items-center h-20">
      <div class="flex flex-row justify-center items-center">
        <div class="flex justify-center items-center mr-2">Lista de Espera</div>
        <router-link to="/dashboard/registro">
          <button
            type="button"
            class="
              text-dark
              hover:bg-dark hover:text-white
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-full
              text-sm
              p-2
              text-center
              inline-flex
              items-center
            "
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="rotate"
              class="w-3 h-3"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
              ></path>
            </svg>
          </button>
        </router-link>
        <router-link to="/dashboard/registro">
          <button
            type="button"
            class="
              text-dark
              hover:bg-dark hover:text-white
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-full
              text-sm
              p-2
              text-center
              inline-flex
              items-center
            "
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
        </router-link>
      </div>
      <div class="flex flex-row justify-end items-center">
        <div class="flex flex-row justify-center items-center">
          <button
            type="button"
            class="
              text-dark
              hover:bg-dark hover:text-white
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-full
              text-sm
              py-2
              px-4
              text-center
              inline-flex
              items-center
            "
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="arrows-up-down-left-right"
              class="svg-inline--fa fa-arrows-up-down-left-right w-3 h-3"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 255.1c0 8.188-3.125 16.41-9.375 22.66l-72 72C424.4 356.9 416.2 360 408 360c-18.28 0-32-14.95-32-32c0-8.188 3.125-16.38 9.375-22.62L402.8 288H288v114.8l17.38-17.38C311.6 379.1 319.8 376 328 376c18.28 0 32 14.95 32 32c0 8.188-3.125 16.38-9.375 22.62l-72 72C272.4 508.9 264.2 512 256 512s-16.38-3.125-22.62-9.375l-72-72C155.1 424.4 152 416.2 152 408c0-17.05 13.73-32 32-32c8.188 0 16.38 3.125 22.62 9.375L224 402.8V288H109.3l17.38 17.38C132.9 311.6 136 319.8 136 328c0 17.05-13.73 32-32 32c-8.188 0-16.38-3.125-22.62-9.375l-72-72C3.125 272.4 0 264.2 0 255.1s3.125-16.34 9.375-22.59l72-72C87.63 155.1 95.81 152 104 152c18.28 0 32 14.95 32 32c0 8.188-3.125 16.38-9.375 22.62L109.3 224H224V109.3L206.6 126.6C200.4 132.9 192.2 136 184 136c-18.28 0-32-14.95-32-32c0-8.188 3.125-16.38 9.375-22.62l72-72C239.6 3.125 247.8 0 256 0s16.38 3.125 22.62 9.375l72 72C356.9 87.63 360 95.81 360 104c0 17.05-13.73 32-32 32c-8.188 0-16.38-3.125-22.62-9.375L288 109.3V224h114.8l-17.38-17.38C379.1 200.4 376 192.2 376 184c0-17.05 13.73-32 32-32c8.188 0 16.38 3.125 22.62 9.375l72 72C508.9 239.6 512 247.8 512 255.1z"
              ></path>
            </svg>
            <span class="ml-2"> Mover ATs</span>
          </button>
        </div>
        <div class="flex flex-row justify-center items-center">
          <button
            type="button"
            class="
              text-dark
              hover:bg-dark hover:text-white
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-full
              text-sm
              py-2
              px-4
              text-center
              inline-flex
              items-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-alarm-fill w-3 h-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"
              />
            </svg>
            <span class="ml-2"> Alarmar ATs</span>
          </button>
        </div>
      </div>
      <div class="flex-flex-row justify-center items-center">
        <button
          type="button"
          class="
            text-dark
            hover:bg-dark hover:text-white
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-full
            text-sm
            py-2
              px-4
            text-center
            inline-flex
            items-center
          "
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="filter"
            class="svg-inline--fa fa-filter w-3 h-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504.6 84.19L320 306.8v149.2c0 19.52-21.97 30.7-37.75 19.66l-80-55.98C195.8 415.2 192 407.8 192 400V306.8L7.375 84.19C-9.965 63.28 5.213 32 32.7 32h446.6C506.8 32 521.1 63.28 504.6 84.19z"
            ></path>
          </svg>
          <span class="ml-2">Filrar</span>
        </button>
      </div>
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <Table :tanques="tanks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Table from '../components/Table.vue'
export default {
  components: {
    Table,
  },
  setup() {
    const store = useStore()
    const tanques = computed(() => store.state.tanques.tanquesInEspera)
    let tanks = ref(tanques.value)

    return {
      tanks,
    }
  },
};
</script>