<template>
  <div class="max-w-sm p-1 mt-5 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
    <div class="p-2 border border-solid border-slate-300">
      <legend class="text-base font-medium text-slate-900 dark:text-white">Menú de Asignación de AT'S</legend>
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        <LCardListItem label="Número de autotanque" value="10" />
        <LCardListItem label="Tipo de autotanque" :value="setTipo(data.atTipo)" />
        <LCardListItem label="Volumen programado" :value="data.capacidad" />
        <LCardListItem label="Tipo de conector" :value="setConector(data.conector)" />

        <LCardListItem label="Llenadera disponible">
          <span v-if="obtenerLlenadera">{{ llenadera }}</span>
          <div class="flex justify-between mx-2 text-sm font-semibold text-red-500" v-else>
            <span>Error</span>
            <IconArrowsRotate class="w-4 h-4 ml-2 cursor-pointer text-slate-400 "
              :class="loaderLlenadera ? 'animate-spin' : ''" @click="currentFiller" v-tippy="'Actualizar información'" />
          </div>
        </LCardListItem>
        <LCardListItem value-class="uppercase" label="Lista de despacho"
          :value="estado.estado === 0 ? 'Liberada' : 'Detenida'" />
      </ul>
    </div>
  </div>
  <div class="max-w-sm mt-5 bg-transparent">
    <div class="p-2 border border-solid border-slate-300">
      <div class="py-1">
        <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300">Barrera de verificación</p>
          </div>
          <div class="flex items-center justify-center mx-2">
           
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="p-2 m-2 max-w-xs min-w-[20rem] bg-white rounded-lg border border-gray-200 shadow-md flex flex-col">
    <div class="grid grid-cols-4 mt-1 mb-1 text-gray-400">
      <div class="flex justify-center col-span-1">
        <svg xmlns="http://www.w3.org/2000/svg" @click="showMenu = !showMenu" class="w-4 h-4 mt-1 cursor-pointer "
          fill="currentColor" viewBox="0 0 448 512">
          <path v-if="!showMenu"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          <path v-else
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
      <div class="col-span-3">
        <span class="ml-10 text-xl font-bold text-center">Asignación</span>
      </div>
    </div>
    <div class="grid duration-300 ease-in" :class="[showMenu ? 'grid-cols-4 ' : 'grid-cols-1']">
      <div class="col-span-1 transition delay-200" v-if="showMenu">
        <div class="flex flex-col items-center space-y-1">
          <button @click="$emit('siguienteAsignacion')" v-tippy="{ content: 'Siguiente llenadera' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-blue-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconArrowsTurnRight />
          </button>
          <button @click="$emit('aceptarAsignacion')" v-tippy="{ content: 'Aceptar asignación' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-green-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconCheckToSlot />
          </button>
          <button @click="$emit('cancelarAsignacion')" v-tippy="{ content: 'Cancela asignación' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-red-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconBan />
          </button>
          <button @click="$emit('reasignarAsignacion')" v-tippy="{ content: 'Reasignar llenadera' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-indigo-900 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconArrowsTurnToDots />
          </button>
          <button v-tippy="{ content: 'Detenener despacho' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-red-800 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconCircleStop />
          </button>
          <button v-tippy="{ content: 'Liberar despacho' }" type="button"
            class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-lime-500 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 focus:outline-none ">
            <IconPlay />
          </button>

        </div>
      </div>
      <div class="col-span-3">
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-start justify-start w-10/12 space-y-1">
            <div class="flex items-start justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Llenadera:</span>
              <span class="mx-2 text-sm font-semibold text-dark" v-if="obtenerLlenadera">{{ llenadera }}</span>
              <div class="flex justify-between mx-2 text-sm font-semibold text-red-500" v-else>
                <span>Error</span>
                <IconArrowsRotate class="w-4 h-4 ml-3 cursor-pointer text-slate-400 "
                  :class="loaderLlenadera ? 'animate-spin' : ''" @click="currentFiller"
                  v-tippy="'Actualizar información'" />
              </div>
            </div>
            <div class="flex items-start justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Estado:</span>
              <span class="mx-2 text-sm font-semibold text-dark">{{ estado.estado === 0 ? 'Liberada' : 'Detenida'
              }}</span>
            </div>
            <div class="flex items-start justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Num. AT:</span>
              <span class="mx-2 text-sm font-semibold text-dark">{{ data.atName }}</span>
            </div>
            <div class="flex items-center justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Vol Prog.:</span>
              <span class="mx-2 text-sm font-semibold text-dark">{{ data.capacidad }}</span>
            </div>
            <div class="flex items-center justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Tipo:</span>
              <span class="mx-2 text-sm font-semibold text-dark">{{ setTipo(data.atTipo) }}</span>
            </div>
            <div class="flex items-center justify-between w-full">
              <span class="mx-2 text-sm font-semibold text-dark">Conector:</span>
              <span class="mx-2 text-sm font-semibold text-dark">{{ setConector(data.conector) }}</span>
            </div>
          </div>
          <div class="flex flex-row items-center self-stretch my-4 border whitespace-nowrap border-slate-300"></div>
          <div class="flex items-center justify-center">
            <div class="flex items-center justify-center mx-2">
              Barrera de Verificación
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
              }" @change="$emit('toggleChange', toggle)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import Toggle from '@vueform/toggle'
import IconPause from '../../../assets/icons/pause.svg'
import IconTimes from '../../../assets/icons/xmark-solid.svg'
import IconArrowsTurnRight from '../../../assets/icons/arrows-turn-right.svg'
import IconCheckToSlot from '../../../assets/icons/check-to-slot.svg'
import IconBan from '../../../assets/icons/ban.svg'
import IconArrowsTurnToDots from '../../../assets/icons/arrows-turn-to-dots.svg'
import IconCircleStop from '../../../assets/icons/circle-stop.svg'
import IconPlay from '../../../assets/icons/play.svg'
import IconArrowsRotate from '../../../assets/icons/arrows-rotate.svg'
import useDashboard from '../composables/useDashboard'
import useToast from "../../dashboard/composables/useToast";

const { addToast } = useToast()

export default {
  props: ['llenaderas', 'data', 'barrera', 'estado'],
  components: {
    Toggle,
    IconPause,
    IconTimes,
    IconArrowsTurnRight,
    IconCheckToSlot,
    IconBan,
    IconArrowsTurnToDots,
    IconCircleStop,
    IconPlay,
    IconArrowsRotate
  },
  setup(props, context) {

    const { getCurrentFiller } = useDashboard()


    const toggle = ref(props.barrera.estado)
    const llenaderasFilter = ref([])
    const llenaderaSel = ref({})
    const showMenu = ref(false)
    const llenadera = ref()
    const obtenerLlenadera = ref(false)
    const loaderLlenadera = ref(false)

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
        case 0:
          return 'Sencillo'
        case 1:
          return 'Full A'
        case 2:
          return 'Full B'
      }
    }

    const setConector = (conector) => {
      switch (conector) {
        case 1:
          return 'Der.'
        case 2:
          return 'Izq.'
        case 3:
          return 'Ambos'
      }
    }
    /** 
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
    */
    const aceptarAsignacion = () => {
      context.emit('aceptarAsignacion', true)
    }

    const siguienteAsignacion = () => {
      context.emit('siguienteAsignacion', true)
    }

    const reasignarAsignacion = () => {
      context.emit('reasignarAsignacion', true)
    }

    const cancelarAsignacion = () => {
      context.emit('cancelarAsignacion', true)
    }

    const currentFiller = async () => {
      loaderLlenadera.value = true
      try {
        const res = await getCurrentFiller()
        const { data, status } = res
        if (status == 201) {
          llenadera.value = data.llenaderaDisponible
          obtenerLlenadera.value = true
        } else {
          addToast({
            message: {
              title: "¡Error!",
              message: res.message,
              type: "error"
            },
          });
        }
        loaderLlenadera.value = false
      } catch (error) {
        loaderLlenadera.value = false
        addToast({
          message: {
            title: "¡Error!",
            message: `Error: ${error.message}`,
            type: "error"
          },
        });
      }
    }

    onMounted(() => {
      currentFiller()
    })

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
      showMenu,
      llenadera,
      aceptarAsignacion,
      siguienteAsignacion,
      reasignarAsignacion,
      cancelarAsignacion,
      obtenerLlenadera,
      loaderLlenadera,
      currentFiller
    }
  }
}
</script>
