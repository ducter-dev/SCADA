<template>
  <div class="w-full flex flex-row justify-between items-center h-20">
    <div class="flex flex-row justify-center items-center">
      <div class="flex justify-center items-center mr-2">
        Tanques en Servicio
      </div>
      <div>
        <Datepicker 
          v-model="date"
          :format-locale="es"
          locale="es"
          cancelText="Cancelar"
          selectText="Seleccionar"
          placeholder="Seleccione una fecha"
          :enableTimePicker="false"
          :format="formatPicker"
          autoApply
        />
      </div>
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
        @click="updateTanks"
      >
        <UpdateIcon class="w-3 h-3" />
      </button>
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
        <FilterIcon class="w-3 h-3" />
        <span class="ml-2">Filrar</span>
      </button>
    </div>
  </div>
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden shadow-md sm:rounded-lg">
        <TableServicio :tanques="tanks" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref,computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import useTanqueServicio from '../../tanques/composables/useTanqueServicio'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import TableServicio from './TableServicio.vue'
import UpdateIcon from '../../../assets/icons/update.svg'
import DeleteIcon from '../../../assets/icons/trash-can-solid.svg'
import ArrowsIcon from '../../../assets/icons/arrows.svg'
import AlarmIcon from '../../../assets/icons/alarm.svg'
import FilterIcon from '../../../assets/icons/filter.svg'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


export default {
  components: {
    TableServicio,
    UpdateIcon,
    DeleteIcon,
    ArrowsIcon,
    AlarmIcon,
    FilterIcon,
  },
  setup() {
    const router = useRouter()
    const { fetchTanksInServicio, getTanquesInServicio } = useTanqueServicio()
    const date = ref(new Date())
    const tanques = computed(() => getTanquesInServicio())
    const fecha = computed(() => format(date.value, 'yyyy-MM-dd'))
    let tanks = ref(tanques.value)

    const getTanquesServicio = async(fecha) => {
      try {
        console.log(fecha)
        const res = await fetchTanksInServicio(fecha)
        const { data, status } = res
        if (status == 200) {
          tanks.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', `Error: ${error.message}`, 'error')
        router.push('/auth')
      }
    }

    const formatPicker = () => {
      return format(date.value, 'dd-MM-yyyy')
    }

    const updateTanks = () => {
      getTanquesServicio(fecha.value)
    }

    watch(date, () => {
      getTanquesServicio(fecha.value)
    })

    onMounted(() => {
      if (tanks.value.length == 0) {
        getTanquesServicio(fecha.value)
      }
    })

    return {
      date,
      es,
      formatPicker,
      tanks,
      updateTanks,
    }
  },
}
</script>