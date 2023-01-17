<template>
  <div class="w-6/12">
    <div class="flex justify-start items-center content-center my-8">
      <h2 class="text-xl font-bold">Entrada Manual</h2>
    </div>
    <div class="w-full flex justify-center items-center">
      <form class="w-3/6" @submit.prevent="onSubmit">
        <div class="flex flex-col justify-center items-center">
          <div class="w-full mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >PG</label
            >
            <input
              type="text"
              v-model.number="tankForm.atId"
              maxlength="4"
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
          
          <div class="w-full mb-6 mx-2">
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
                v-model.number="tankForm.atTipo">
              <option v-for="tipo in tiposTanque" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
            </select>
          </div>
          <div class="w-full mb-6 mx-2">
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
              placeholder="PG-"
              required
            />
          </div>
          <div class="w-full mb-6 mx-2">
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
          <div class="w-full mb-6 mx-2">
            <label for="user" class="block mb-2 text-base font-bold text-dark"
              >Volumen</label
            >
            <input
              type="text"
              v-model.number="tankForm.capacidad"
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
              placeholder="0"
              required
            />
          </div>
          <div class="w-full flex justify-center items-center">
            <div class="flex justify-center items-center">
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
                  py-2.5
                  text-center
                  mr-2
                  mb-2
                "
              >
                Guardar
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
                @click="cancelSave"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import useTanqueEspera from '../composables/useTanqueEspera'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useRouter } from 'vue-router'

export default {

  setup() {
    const router = useRouter()
    const { agregarTanqueEspera, getCountTanquesEspera } = useTanqueEspera()

    const tiposTanque = [
      { id: 1, nombre: 'Sencillo', sufijo: '' },
      { id: 2, nombre: 'Full A', sufijo: 'A' },
      { id: 3, nombre: 'Full B', sufijo: 'B' }
    ]

    const conectorTanque = [
      { id: 1, nombre: 'Izquierdo' },
      { id: 2, nombre: 'Derecho' },
      { id: 3, nombre: 'Ambos' }
    ]

    const tankForm = reactive({
      posicion: 0,
      atId: 0,
      atTipo: 3, 
      atName: '',
      capacidad: 0,
      conector: 3,
    })

    watch(
      () => tankForm.atId, (id) => {
        console.log("🚀 ~ file: EntradaManual.vue:197 ~ setup ~ id", id)
        const { sufijo } = tiposTanque.find( t => t.id == tankForm.atTipo)
        tankForm.atName = `PG-${id}${sufijo}`
      },
    )
    watch(
      () => tankForm.atTipo, (tipo) => {
        console.log("🚀 ~ file: EntradaManual.vue:197 ~ setup ~ tipo", tipo)
        const { sufijo } = tiposTanque.find( t => t.id == tipo)
        tankForm.atName = `PG-${tankForm.atId}${sufijo}`
      }

    ) 

    async function onSubmit () {
      tankForm.posicion = getCountTanquesEspera()
      const { data, status } = await agregarTanqueEspera(tankForm)
      if (status == 200) {
        Swal.fire('Tanque Agregado', `Se agregó el tanque ${data.atName} a la lista de espera.`, 'success')
        router.go(-1)
      } else {
        Swal.fire('Error', data, 'error')
      }
    }

    function cancelSave () {
      router.go(-1)
    }

    return {
      tiposTanque,
      conectorTanque,
      onSubmit,
      tankForm,
      cancelSave,
    }
  }
}
</script>