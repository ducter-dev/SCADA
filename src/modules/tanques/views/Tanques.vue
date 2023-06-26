<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row items-center justify-between w-full h-20">
      <div class="flex flex-row items-center justify-center">
        <div class="flex items-center justify-center mr-2 text-dark dark:text-white">Autotanques</div>
        <router-link to="/dashboard/tanques/nuevo">
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm font-medium text-center border rounded-full text-dark dark:text-white border-dark hover:bg-black hover:text-white focus:ring-4 focus:ring-blue-300"
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
      <div class="items-center justify-end flex-flex-row">Filtro</div>
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <TableTanques :tanques="tanks" @deleteTank="deleteTank" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
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
    const router = useRouter()
    const { fetchTanques, eliminarTanque, getTanques } = useTanque()

    const tanques = computed(() => getTanques())
    let tanks = ref([])

    const obtenerTanques = async () => {
      try {
        const res = await fetchTanques()
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
          tanks.value = getTanques()
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
      if (tanques.value || tanques.value.length < 1) {
        obtenerTanques()
      } else {
        tanks.value = tanques.value
      }
    })


    return {
      tanks,
      deleteTank,
    }
  },
}
</script>