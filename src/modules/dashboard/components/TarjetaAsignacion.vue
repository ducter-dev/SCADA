<template>
  <div class="p-2 m-2 max-w-xs min-w-[20rem] bg-white rounded-lg border border-gray-200 shadow-md flex flex-col">
    <div class="grid grid-cols-4 text-gray-400  mt-1 mb-1">
      <div class="col-span-1 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" @click="showMenu = !showMenu" class="w-4 h-4 mt-1 cursor-pointer "
          fill="currentColor" viewBox="0 0 448 512">
          <path v-if="!showMenu"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          <path v-else
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
      <div class="col-span-3">
        <span class="text-center text-xl font-bold ml-10">Asignación</span>
      </div>
    </div>
    <div class="grid ease-in duration-300" :class="[showMenu ? 'grid-cols-4 ' : 'grid-cols-1']">
      <div class="col-span-1 transition delay-200" v-if="showMenu">
        <div class="flex flex-col items-center space-y-1">
          <button v-tippy="{ content: 'Siguiente llenadera' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-blue-500 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 h-4 -ml-px" fill="currentColor">
              <path
                d="M297.4 9.4c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L338.7 160H128c-35.3 0-64 28.7-64 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V224C0 153.3 57.3 96 128 96H338.7L297.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm-96 256c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 416H96c-17.7 0-32 14.3-32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448c0-53 43-96 96-96H242.7l-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3z" />
            </svg>
            <span class="sr-only">Siguiente llenadera</span>
          </button>
          <button v-tippy="{ content: 'Acepatar asignación' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-green-500 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 -ml-px" fill="currentColor">
              <path
                d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z" />
            </svg>
            <span class="sr-only">Acepatar asignación</span>
          </button>
          <button v-tippy="{ content: 'Cancela asignación' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-red-500 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -ml-px" fill="currentColor" viewBox="0 0 512 512">
              <path
                d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
            <span class="sr-only">Cancela asignación</span>
          </button>
          <button v-tippy="{ content: 'Reasignar llenadera' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-indigo-900 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -ml-px" fill="currentColor" viewBox="0 0 512 512">
              <path
                d="M249.4 25.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 96 416 96c53 0 96 43 96 96v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7-14.3-32-32-32l-146.7 0 25.4 25.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-80-80c-12.5-12.5-12.5-32.8 0-45.3l80-80zm13.3 256l80 80c12.5 12.5 12.5 32.8 0 45.3l-80 80c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 416 96 416c-17.7 0-32 14.3-32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448c0-53 43-96 96-96l146.7 0-25.4-25.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0zM384 384a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM64 192A64 64 0 1 1 64 64a64 64 0 1 1 0 128z" />
            </svg>
            <span class="sr-only">Reasignar llenadera</span>
          </button>
          <button v-tippy="{ content: 'Detenener despacho' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-red-800 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 -ml-px" fill="currentColor">
              <path
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" />
            </svg>
            <span class="sr-only">Detenener despacho</span>
          </button>
          <button v-tippy="{ content: 'Liberar despacho' }" type="button" data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            class="flex justify-center items-center w-8 h-8 text-gray-500 hover:text-lime-500 bg-white rounded-lg border border-gray-200  shadow-sm hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none ">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4 h-4 -ml-px" fill="currentColor">
              <path
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
            <span class="sr-only">Liberar despacho</span>
          </button>

        </div>
      </div>
      <div class="col-span-3">
        <div class="flex flex-col justify-center items-center">
          <div class="w-10/12 flex flex-col justify-start items-start space-y-1">
            <div class="w-full flex justify-between items-start">
              <span class="font-semibold text-dark text-sm mx-2">Llenadera:</span>
              <span class="font-semibold text-dark text-sm mx-2">{{ llenadera }}</span>
            </div>
            <div class="w-full flex justify-between items-start">
              <span class="font-semibold text-dark text-sm mx-2">Estado:</span>
              <span class="font-semibold text-dark text-sm mx-2">{{ estado.estado === 0 ? 'Liberada' : 'Detenida'
              }}</span>
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
          <div class="flex flex-row items-center self-stretch my-4  whitespace-nowrap border border-slate-300"></div>
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
              }" @change="$emit('toggleChange', toggle)" />
            </div>
          </div>
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
  setup(props, context) {
    const toggle = ref(props.barrera.estado)
    const llenaderasFilter = ref([])
    const llenaderaSel = ref({})
    const showMenu = ref(false)
    const llenadera = ref(8)

    /* 1. Obtener llenaderas por conector */
    const filterLlenaderas = () => {
      console.log('filterLlenaderas')
      if (Object.keys(props.data).length == 0) {
        console.log('No hay tanque en la lista de espera')
        llenaderasFilter.value = props.llenaderas.filter(llen => llen.estado == 1)
      } else {
        if (props.data.conector == 3) {
          llenaderasFilter.value = props.llenaderas.filter(llen => llen.estado == 1)
        } else {
          llenaderasFilter.value = props.llenaderas.filter(llen => llen.conector == props.data.conector && llen.estado == 1)
        }
      }

      /* 2. Seleccionar la primera llenadera de la lista */
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

    watch(() => props.llenaderas, () => {
      console.log('Cambio en llenaderas')
      if (props.data) {
        filterLlenaderas()
      }
      return
    })

    watch(() => props.data, () => {
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
      showMenu,
      llenadera
    }
  }
}
</script>
