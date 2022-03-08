<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-row justify-between items-center h-20">
      <div class="flex flex-row justify-center items-center">
        <div class="flex justify-center items-center mr-2">Autotanques</div>
        <router-link to="/dashboard/tanques/nuevo">
          <button
            type="button"
            class="
              text-dark
              border border-dark
              hover:bg-black hover:text-white
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
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </router-link>
      </div>
      <div class="flex-flex-row justify-end items-center">Filtro</div>
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <TableTanques :tanques="tanks" @deleteTank="deleteTank" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import useTanque from '../composables/useTanque'
import TableTanques from '../components/TableTanques.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useRouter } from 'vue-router'

export default {
  components: {
    TableTanques,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { agregarTanques, eliminarTanque } = useTanque()

    const tanques = computed(() => store.state.tanques.tanques)
    let tanks = ref(tanques.value)

    const getTanks = async () => {
      try {
        const res = await agregarTanques()
        const { data, status } = res
        if (status == 200) {
          tanks.value = data
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    const deleteTank = async (tanque) => {
      try {
        const res = await eliminarTanque(tanque)
        const { data, status } = res
        if (status == 200) {
          console.log(data)
          tanks.value = store.state.tanques.tanques
          Swal.fire('Eliminado', 'El autotanque ha sido eliminado', 'success')
        } else {
          Swal.fire("Error", data.message, "error")
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    onMounted(() => {
      if (tanks.value.length < 1) {
        // No hay usuarios en el store
        getTanks()
      } else {
        console.log('Ya hay tanques en el store')
      }
    })


    return {
      tanks,
      deleteTank,
    }
  },
}
</script>