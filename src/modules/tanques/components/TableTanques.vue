<template>
  <LTable>
    <template #head>
      <tr>
        <LHeaderTh value="No." center />
        <LHeaderTh value="Autotanque" center />
        <LHeaderTh value="Tipo" center />
        <LHeaderTh value="Conector" center />
        <LHeaderTh value="Capacidad" center />
        <LHeaderTh value="Acciones" center />
      </tr>
    </template>
    <template #body>
      <tr v-for="(tanque, index) in tanques" :key="tanque.id">
        <LBodyTh :value="index + 1" center />
        <LBodyTd :value="tanque.atName" center />
        <LBodyTd :value="setTipo(tanque.atTipo)" center />
        <LBodyTd :value="setConector(tanque.conector)" center />
        <LBodyTd :value="tanque.capacidad90" center />
        <LBodyTd center>
          <div class="inline-flex shadow-sm" role="group">
            <button
              type="button"
              class="
                text-white
                bg-yellow-500
                hover:bg-dark
                focus:ring-4 focus:ring-gray-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                mr-2
                mb-2
              "
              @click="updateTanque(tanque)"
            >
              Editar
            </button>
            <button
              type="button"
              class="
                text-white
                bg-link
                hover:bg-dark
                focus:ring-4 focus:ring-gray-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                mr-2
                mb-2
              "
              @click="$emit('deleteTank', tanque)"
            >
              Eliminar
            </button>
          </div>
        </LBodyTd>
      </tr>
    </template>
  </LTable>
</template>

<script>
import { useRouter } from 'vue-router'
import useTanque from '../composables/useTanque'

export default {
  props: {
    tanques: {
      type: Array,
      default: [],
    },
  },
  setup () {
    const router = useRouter()
    const { setSelectTank } = useTanque()
    
    function setTipo(tipo) {
      switch (tipo) {
        case 0:
          return "Sencillo"
        case 1:
          return "Full A"
        case 2:
          return "Full B"
      }
    }

    function setConector(conector) {
      switch (conector) {
        case 1:
          return "Derecho"
        case 2:
          return "Izquierdo"
        case 3:
          return "Ambos"
      }
    }
    
    function updateTanque(tanque) {
      setSelectTank(tanque)
      router.push('/dashboard/tanques/editar')
    }

    return {
      setTipo,
      setConector,
      updateTanque,
    }
  }
}
</script>