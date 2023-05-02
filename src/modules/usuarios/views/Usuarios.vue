<script>
import { ref, computed, onMounted, watch } from 'vue'
import useUser from '../composables/useUser'
import Table from '../components/Table.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import router from '../../../router'
import CreateUser from "../components/CreateUser.vue"
import useEventsBus from "../../../layout/eventBus"

export default {
  components: {
    Table,
    CreateUser,
  },
  setup() {
    const { bus } = useEventsBus()
    const { fetchUsuarios, getUsuarios } = useUser()

    const usuarios = computed(() => getUsuarios())
    let users = ref(usuarios.value)

    async function getUsers () {
      try {
        const res = await fetchUsuarios()
        const { data, status } = res
        if (status == 200) {
          users.value = data
        } else {
          Swal.fire("Error", data.message, "error");
        }
      } catch (error) {
        Swal.fire('Error', 'Error, revise sus crecenciales', 'error')
        router.push('/auth')
      }
    }

    onMounted(() => {
      if (users.value.length < 1) {
        // No hay usuarios en el store
        getUsers()
      } else {
        console.log('Ya hay usaurios en el store')
      }
    })
  
    watch(() => bus.value.get('successRegistrationUser'), (val) => {
      users.value = []
      users.value = usuarios.value
    })

    return {
      users,
    }
  },
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row items-center justify-between w-full h-20">
      <div class="flex flex-row items-center justify-center">
        <div class="flex items-center justify-center mr-2">Usuarios</div>
        <CreateUser/>    
      </div>
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <Table :usuarios="users" />
        </div>
      </div>
    </div>
  </div>
</template>

