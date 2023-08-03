<template>
  <div
    class="flex flex-col max-w-sm p-2 m-2 bg-white border border-gray-200 rounded-lg shadow-md "
  >
    <div class="flex items-center justify-center">
      <h5
        class="flex items-center justify-center my-1 mr-1 text-xl font-bold text-gray-400 "
      >
        Última Entrada
      </h5>
      <button
          type="button"
          class="px-2 py-2 text-base font-medium text-center bg-white rounded-lg  text-dark hover:bg-gray-200 focus:ring-2 focus:ring-dark"
          @click="$emit('openForm')"
        >
          <IconPlus class="w-4 h-4" />
        </button>
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="flex items-center justify-center">
        <pre class="text-sm text-dark">
          {{ data }}
        </pre>
      </div>
      <div class="flex items-center justify-center">
        <div class="flex items-center justify-center mx-2">
          Barrera de Entrada
        </div>
        <div class="flex items-center justify-center mx-2">
          <Toggle v-model="toggle" offLabel="Cerrada" onLabel="Abierta" :classes="{
            toggle: 'flex w-14 h-8 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
            toggleOn: 'bg-gray-900 border-gray-800 justify-start text-white',
            toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700',
            toggleOnDisabled: 'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
            toggleOffDisabled: 'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
            handle: 'inline-block bg-white w-5 h-5 top-1 rounded-full absolute transition-all',
            handleOn: 'left-full transform -translate-x-full',
            handleOff: 'left-0',
            handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
            handleOffDisabled: 'bg-gray-100 left-0',
            label: 'text-center w-8 border-box whitespace-nowrap select-none',
          }"
          @change="$emit('toggleChange', toggle)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import IconPlus from '../../../assets/icons/plus-solid.svg'
import Toggle from '@vueform/toggle'

export default {
  props: ['data', 'barrera'],
  components: {
    IconPlus,
    Toggle,
  },
  setup(props){
    let toggle = ref(props.barrera.estado) 
    return {
      toggle,
    }
  }
}
</script>
