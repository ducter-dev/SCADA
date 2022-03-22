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
      Asignación
    </h5>
    <div class="flex flex-col justify-center items-center">
      <div class="w-10/12 flex justify-between items-center">
        <div class="w-6/12 flex justify-start items-center">
          <label for="llenaderas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Llenadera</label>
        </div>
        <div class="w-6/12 flex justify-end items-center">
          <select id="llenaderas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5">
            <option v-for="llen in llenaderasFilter" :key="llen.id">{{ llen.numero }}</option>
          </select>
        </div>
      </div>
      <div class="w-8/12 flex justify-center items-center">
        <p class="font-semibold text-dark">Estado: {{ barrera.estado ? 'Libre' : 'Detenida'}}</p>
      </div>
      <div class="w-10/12 flex flex-col justify-start items-start">
        <div class="w-full flex justify-between items-start">
          <span class="font-semibold text-dark text-sm mx-2">Num. AT:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ data.atName }}</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="font-semibold text-dark text-sm mx-2">Vol Prog.:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ data.capacidad }}</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="font-semibold text-dark text-sm mx-2">Tipo:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ data.atTipo }}</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="font-semibold text-dark text-sm mx-2">Conector:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ data.conector }}</span>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center">
          <span class="text-dark font-semibold text-sm pb-1">Despacho</span>
        </div>
        <div class="flex justify-between items-center">
          <button 
            type="button"
            class="text-dark bg-white hover:bg-gray-200 focus:ring-2 focus:ring-gray-300/50 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center mx-1 mb-2"
            @click="$emit('despachar', 1)"
            >
            <IconPause class="mr-2 -ml-1 w-4 h-4" />
            Detener
          </button>
        </div>
        <div class="flex justify-between items-center">
          <button
            type="button"
            class="text-dark bg-white hover:bg-gray-200 focus:ring-2 focus:ring-gray-300/50 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center mx-1 mb-2"
            @click="$emit('despachar', 0)"
            >
            <IconTimes class="mr-2 -ml-1 w-4 h-4" />
            Liberar
          </button>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center mx-2">
          Barrera de Verificación
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
import IconPause from '../../../assets/icons/pause.svg'
import IconTimes from '../../../assets/icons/xmark-solid.svg'

export default {
  props: ['llenaderas', 'data', 'barrera'],
  components: {
    Toggle,
    IconPause,
    IconTimes,
  },
  setup(props){
    console.log(props)
    const toggle = ref(props.barrera.estado)
    const llenaderasFilter = ref([])

    if (props.data.conector == 3) {
      llenaderasFilter.value = props.llenaderas
    } else {
      llenaderasFilter.value = props.llenaderas.filter( llen => llen.conector == data.conector)
    }
    console.log(llenaderasFilter.value)
    return {
      toggle,
      llenaderasFilter,
    }
  }
}
</script>
