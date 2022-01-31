<template>
  <div class="m-4 sm:m-12 w-full flex flex-col">
    <div class="w-full flex flex-row justify-between items-center h-20">
      <div class="flex flex-row justify-center items-center">
        <div class="flex justify-center items-center mr-2">Lista de Espera</div>
        <router-link to="/dashboard/registro">
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
        </router-link>
        <router-link to="/dashboard/registro">
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
            <DeleteIcon class="-3 h-3" />
          </button>
        </router-link>
      </div>
      <div class="flex flex-row justify-end items-center">
        <div class="flex flex-row justify-center items-center">
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
            <ArrowsIcon class="w-3 h-3" />
            <span class="ml-2"> Mover ATs</span>
          </button>
        </div>
        <div class="flex flex-row justify-center items-center">
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
            <AlarmIcon class="w-3 h-3" />
            <span class="ml-2"> Alarmar ATs</span>
          </button>
        </div>
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
          <TableEspera :tanques="tanks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
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
    const store = useStore()
    const tanques = computed(() => store.state.tanques.tanquesInEspera)
    let tanks = ref(tanques.value)

    return {
      tanks,
    }
  },
};
</script>