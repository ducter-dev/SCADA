<template>
  <div class="w-6/12">
    <div class="flex justify-start items-center content-center my-8">
      <h2 class="text-xl font-bold">Editar autotanque</h2>
    </div>
    <div class="w-full flex justify-center items-center">
      <form class="w-full" @submit.prevent="onSubmit">
        <div class="flex justify-between items-center">
          <div class="w-3/6 mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >Id</label
            >
            <input
              type="text"
              v-model="tankForm.atId"
              class="
                bg-gray-50
                border border-gray-300
                text-dark text-base
                font-normal
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5
              "
              placeholder=""
              required
            />
          </div>
          <div class="w-3/6 mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >Nombre</label
            >
            <input
              type="text"
              v-model="tankForm.atName"
              class="
                bg-gray-50
                border border-gray-300
                text-dark text-base
                font-normal
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5
              "
              placeholder=""
              required
            />
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="w-3/6 mb-6 mx-2">
            <label for="tipoAt" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Tipo</label>
            <select id="tipoAt" class="bg-gray-50
                border border-gray-300
                text-dark text-base
                font-semibold
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5"
                v-model="tankForm.atTipo">
              <option v-for="tipo in tiposTanque" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
            </select>
          </div>
          <div class="w-3/6 mb-6 mx-2">
            <label for="tipoAt" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Conector</label>
            <select id="tipoAt" class="bg-gray-50
                border border-gray-300
                text-dark text-base
                font-semibold
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5"
                v-model="tankForm.conector">
              <option v-for="c in conectorTanque" :key="c.id" :value="c.id">{{ c.nombre }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="w-3/6 mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >Capacidad 90</label
            >
            <input
              type="text"
              v-model="tankForm.capacidad90"
              class="
                bg-gray-50
                border border-gray-300
                text-dark text-base
                font-normal
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5
              "
              placeholder=""
              required
            />
          </div>
          
          <div class="w-3/6 mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >Transportadora</label
            >
            <input
              type="text"
              v-model="tankForm.transportadora"
              class="
                bg-gray-50
                border border-gray-300
                text-dark text-base
                font-normal
                rounded-lg
                focus:ring-black focus:border-dark
                block
                w-full
                p-2.5
              "
              placeholder=""
              required
            />
          </div>
        </div>
        <div class="flex justify-end items-center">
          <div class="flex hustify-center items-center">
            <button
              type="submit"
              class="
                w-full
                text-white
                bg-black
                hover:bg-dark
                focus:ring-4 focus:ring-dark
                font-medium
                rounded-lg
                text-base
                px-5
                py-2
                text-center
                mr-2
                mb-2
              "
            >
              Actualizar
            </button>
          </div>
          <div class="flex hustify-center items-center">
            <button
              type="button"
              class="
                w-full
                text-dark
                bg-slate-300
                hover:bg-gray-700
                hover:text-white
                focus:ring-4 focus:ring-dark
                font-medium
                rounded-lg
                text-base
                px-5
                py-2.5
                text-center
                mr-2
                mb-2
              "
              @click="cancelEdit"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import useTanque from '../composables/useTanque'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useRouter } from 'vue-router'

export default {
  
  setup () {
    const store = useStore()
    const router = useRouter()
    const { editarTanque } = useTanque()

    const tankToEdit = computed(() => store.getters['tanques/currentTanqueSel'])
    const { id, atId, atName, atTipo, capacidad90, conector, transportadora } = tankToEdit.value


    const tiposTanque = [
      { id: 0, nombre: 'Sencillo' },
      { id: 1, nombre: 'Full A' },
      { id: 2, nombre: 'Full B' }
    ]

    const conectorTanque = [
      { id: 0, nombre: 'Izquierdo' },
      { id: 1, nombre: 'Derecho' },
      { id: 2, nombre: 'Ambos' }
    ]

    const tankForm = ref({
      id: id,
      atId: atId,
      atName: atName,
      atTipo: atTipo, 
      capacidad90: capacidad90,
      conector: conector,
      transportadora: transportadora
    })

    async function onSubmit () {
      const { data, status } = await editarTanque(tankForm.value)
      console.log(data)
      if (status == 200) {
        Swal.fire('Tanque Editado', `Se edito al autotanque ${data.atName}`, 'success')
        router.go(-1)
      } else {
        Swal.fire('Error', data, 'error')
      }
    }


    function cancelEdit () {
      router.go(-1)
    }

    return {
      tankForm,
      tiposTanque,
      conectorTanque,
      cancelEdit,
      onSubmit,
    }
  }
}
</script>
