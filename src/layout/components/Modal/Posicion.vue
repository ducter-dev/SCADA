<script>
import { ref } from'vue'
import LFloatInput from "../Form/FloatInput.vue"

export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  components: { LFloatInput },
  setup(props, context) {
    const posicion = ref(1)
    const cancelModal = () => {
      console.log('cancelando modal')
      const obj = {
        action: false,
      }
      context.emit('submitModal', obj)
    }
    const successModal = () => {
      console.log('acepttando modal')
      const obj = {
        action: true,
        destino: posicion.value
      }
      context.emit('submitModal', obj)
    }
    return {
      cancelModal,
      successModal,
      posicion,
    }
  },
}
</script>

<template>
  <div id="popup-modal" tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-full overflow-x-hidden overflow-y-scroll md:inset-0 bg-dark"
  >
    <div class="relative items-center justify-center w-full max-w-md p-4 md:h-auto">
      <div class="relative bg-white rounded-lg shadow opacity-100">
        <button type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="popup-modal"
          @click="cancelModal"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
        <div class="p-6 text-center">
          <svg class="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 
            class="mb-5 text-lg font-normal text-gray-500"
          >{{ config.text }}
          </h3>
          <div class="">
            <LFloatInput v-model.number="posicion" min="1" label="Nueva Posición" square />
          </div>
          <button data-modal-toggle="popup-modal" type="button"
            class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            @click="successModal"
          >
            {{ config.okText }}
          </button>
          <button data-modal-toggle="popup-modal" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            @click="cancelModal"
          >
            {{ config.cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

