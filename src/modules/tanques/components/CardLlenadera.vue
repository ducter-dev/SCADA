<template>
  <div
    class="
      p-2
      m-2
      max-w-sm
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      flex flex-col
    "
  >
    <h5 class="mb-1 text-base font-bold tracking-tight text-gray-900 text-center">
      Llenadera {{ llenadera.llenadera }}
    </h5>
    <div class="flex justify-center items-stretch text-sm font-semibold">
      <span class="mr-1" :class="llenadera.libre ? 'text-blue-600' : 'text-dark'">{{ llenadera.libre ? 'Libre' : 'Ocupada' }}</span>
      <IconGasPump v-if="llenadera.libre" class="w-4 h-4 text-blue-600" />
      <IconClose v-else class="w-4 h-4" />
    </div>
    <div
      class="
        flex
        justify-center
        items-center
        text-dark text-xl
        font-bold
        mt-2
        mb-1
      "
    >
      {{ llenadera.pg }}
    </div>
    <div
      class="flex justify-center items-center font-bold my-1"
    >
      <span class="mr-1 text-dark text-sm">Despacho</span>
      <button
        type="button"
        class="
          text-dark
          bg-white
          border border-gray-300
          hover:bg-dark hover:text-white
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-2
          py-2
          text-center
          m-1
        "
      >
        <IconPause class="w-4 h-4" />
      </button>
      <button
        type="button"
        class="
          text-dark
          bg-white
          border border-gray-300
          hover:bg-dark hover:text-white
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-2
          py-2
          text-center
          m-1
        "
      >
        <IconTimes class="w-4 h-4" />
      </button>
    </div>
    <div
      v-show="!llenadera.libre"
      class="flex justify-center items-center text-sm font-bold my-1"
    >
      <button
        type="button"
        class="
          text-dark
          bg-white
          border border-gray-300
          hover:bg-dark hover:text-white
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-2
          py-2
          text-center
          m-1
        "
      >
        <IconPrint class="w-4 h-4" />
      </button>
      <button
        type="button"
        class="
          text-white
          bg-link
          border border-gray-300
          hover:bg-red-700 hover:text-white
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-2
          py-2
          text-center
          m-1
        "
      >
        Reasignar
      </button>
      <button
        type="button"
        class="
          text-dark
          bg-gray-300
          border border-gray-300
          hover:bg-dark hover:text-white
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-2
          py-2
          text-center
          m-1
        "
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import IconClose from '../../../assets/icons/lock.svg'
import IconPause from '../../../assets/icons/pause.svg'
import IconTimes from '../../../assets/icons/times.svg'
import IconPrint from '../../../assets/icons/print.svg'
import IconGasPump from '../../../assets/icons/gas-pump-solid.svg'

export default {
  components: {
    IconClose,
    IconPause,
    IconTimes,
    IconPrint,
    IconGasPump,
  },
  props: {
    llenadera: {
      type: Object,
      default: {},
    }
  },
  setup() {},
};
</script>