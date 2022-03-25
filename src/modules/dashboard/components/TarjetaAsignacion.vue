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
        <div class="w-7/12 flex justify-start items-center">
          <label for="llenaderas" class="block mb-2 text-sm mx-2 font-semibold text-dark">Llenadera</label>
        </div>
        <div class="w-5/12 flex justify-end items-center">
          <select id="llenaderas" v-model="llenaderaSel" class="bg-gray-50 border border-gray-300 text-dark text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2 py-1">
            <option v-for="llen in llenaderasFilter" :key="llen.id" :value="llen">{{ llen.numero }}</option>
          </select>
        </div>
      </div>
      <div class="w-10/12 flex flex-col justify-start items-start mt-1">
        <div class="w-full flex justify-between items-start">
          <span class="font-semibold text-dark text-sm mx-2">Estado:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ estado.estado === 0 ? 'Liberada' : 'Detenida'}}</span>
        </div>
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
          <span class="font-semibold text-dark text-sm mx-2">{{ setTipo(data.atTipo) }}</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="font-semibold text-dark text-sm mx-2">Conector:</span>
          <span class="font-semibold text-dark text-sm mx-2">{{ setConector(data.conector) }}</span>
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
        <button
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
          @click="asignarTanque"
        >Asignar
        </button>
      </div>
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center mx-2">
          Barrera de Verificación
        </div>
        <div class="flex justify-center items-center mx-2">
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
import { ref, watch } from 'vue'
import Toggle from '@vueform/toggle'
import IconPause from '../../../assets/icons/pause.svg'
import IconTimes from '../../../assets/icons/xmark-solid.svg'

export default {
  props: ['llenaderas', 'data', 'barrera', 'estado'],
  components: {
    Toggle,
    IconPause,
    IconTimes,
  },
  setup(props, context){
    const toggle = ref(props.barrera.estado)
    const llenaderasFilter = ref([])
    const llenaderaSel = ref({})

    const filterLlenaderas = () => {
      console.log('filterLlenaderas')
      if (Object.keys(props.data).length == 0) {
        console.log('No hay tanque en la lista de espera')
        llenaderasFilter.value = props.llenaderas.filter( llen => llen.estado == 1)
      } else {
        if (props.data.conector == 3) {
          llenaderasFilter.value = props.llenaderas.filter( llen => llen.estado == 1)
        } else {
          llenaderasFilter.value = props.llenaderas.filter( llen => llen.conector == props.data.conector && llen.estado == 1)
        }
      }
      llenaderaSel.value = llenaderasFilter.value[0]
      console.log(llenaderaSel.value)
    }
    
    const setTipo = (tipo) => {
      switch (tipo) {
        case 1:
          return 'Sencillo'
        case 2:
          return 'Full A'
        case 3:
          return 'Full B'
      }
    }

    const setConector = (conector) => {
      switch (conector) {
        case 1:
          return 'Izq.'
        case 2:
          return 'Der.'
        case 3:
          return 'Ambos'
      }
    }
    const asignarTanque = () => {
      console.log('Asignar tanque')
      if (Object.keys(props.data).length == 0) {
        context.emit('asignar', 'noData')
        return
      }
      const objAsign = {
        llenaderaSelected: llenaderaSel.value,
        tanque: props.data,
        assignated: true
      }
      context.emit('asignar', objAsign)
    }

    watch(() => props.llenaderas,() => {
      console.log('Cambio en llenaderas')
      if (props.data) {
        filterLlenaderas()
      }
      return
    })

    watch(() => props.data,() => {
      console.log('Cambio en primero de la lista de espera')
      if (props.llenaderas) {
        filterLlenaderas()
      }
      return
    })

    return {
      toggle,
      llenaderasFilter,
      llenaderaSel,
      setConector,
      setTipo,
      asignarTanque,
    }
  }
}
</script>
