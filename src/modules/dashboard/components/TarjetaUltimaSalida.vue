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
    <h5
      class="
        flex
        justify-center
        items-center
        text-gray-400 text-xl
        font-bold
        mt-1
        mb-1
      "
    >
      Última Salida
    </h5>
    <div class="flex flex-col justify-center items-center">
      <div class="flex justify-center items-center">
        <pre class="text-sm text-dark">
          {{ data }}
        </pre>
      </div>
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center mx-2">
          Barrera de Salida
        </div>
        <div class="flex justify-center items-center mx-2">
          <Toggle v-model="toggle" offLabel="Cerrada" onLabel="Abierta" :classes="{
            toggle: 'flex w-14 h-8 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
            toggleOn: 'bg-dark border-gray-500 justify-start text-white',
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
import Toggle from '@vueform/toggle'
export default {
  props: ['data', 'barrera'],
  components: {
    Toggle,
  },
  setup(props){
    console.log(props.barrera.estado)
    const toggle = ref(props.barrera.estado)
    return {
      toggle,
    }
  }
}
</script>
