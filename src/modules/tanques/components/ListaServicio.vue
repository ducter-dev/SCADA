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
        <TableServicio :tanques="tanques" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import TableServicio from './TableServicio.vue'
import UpdateIcon from '../../../assets/icons/update.svg'
import DeleteIcon from '../../../assets/icons/trash-can-solid.svg'
import ArrowsIcon from '../../../assets/icons/arrows.svg'
import AlarmIcon from '../../../assets/icons/alarm.svg'
import FilterIcon from '../../../assets/icons/filter.svg'

export default {
  props: {
    tanques: {
      type: Array,
      default: [],
    },
  },
  components: {
    TableServicio,
    UpdateIcon,
    DeleteIcon,
    ArrowsIcon,
    AlarmIcon,
    FilterIcon,
  },
  setup() {
    const date = ref(new Date())
    const formatPicker = () => {
      return format(date.value, 'dd-MM-yyyy')
    }

    return {
      date,
      es,
      formatPicker,
    }
  },
}
</script>