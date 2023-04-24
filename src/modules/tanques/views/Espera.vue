<template>
  <div class="flex flex-col w-full m-4 sm:m-12">
    <div class="flex flex-row items-center justify-between w-full h-20">
      <div class="flex flex-row items-center justify-center">
        <div class="flex items-center justify-center mr-2">Lista de Espera</div>
      </div>
      <div class="flex flex-row items-center justify-end">
        <!-- <div class="flex flex-row items-center justify-center">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-full text-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300"
          >
            <ArrowsIcon class="w-3 h-3" />
            <span class="ml-2"> Mover ATs</span>
          </button>
        </div> -->
        <div class="flex flex-row items-center justify-center">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-full text-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300"
          >
            <AlarmIcon class="w-3 h-3" />
            <span class="ml-2"> Alarmar ATs</span>
          </button>
        </div>
      </div>
      <!-- <div class="items-center justify-center flex-flex-row">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-full text-dark hover:bg-dark hover:text-white focus:ring-4 focus:ring-blue-300"
        >
          <FilterIcon class="w-3 h-3" />
          <span class="ml-2">Filrar</span>
        </button>
      </div> -->
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <TableEspera :tanques="tanks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import useTanqueEspera from '../composables/useTanqueEspera'
import TableEspera from '../components/TableEspera.vue'
import UpdateIcon from '../../../assets/icons/update.svg'
import DeleteIcon from '../../../assets/icons/trash-can-solid.svg'
import ArrowsIcon from '../../../assets/icons/arrows.svg'
import AlarmIcon from '../../../assets/icons/alarm.svg'
import FilterIcon from '../../../assets/icons/filter.svg'

export default {
  components: {
    TableEspera,
    UpdateIcon,
    DeleteIcon,
    ArrowsIcon,
    AlarmIcon,
    FilterIcon,
  },
  setup() {
    const { getTanquesInEspera } = useTanqueEspera()
    const tanques = computed(() => getTanquesInEspera())
    let tanks = ref(tanques.value)
    return {
      tanks
    }
  },
}
</script>