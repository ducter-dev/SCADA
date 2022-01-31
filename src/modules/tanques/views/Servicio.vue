<template>
  <div class="m-4 sm:m-12 w-full flex flex-col">
    <ListaLlenaderas />
    <ListaServicio :tanques="tanks" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ListaLlenaderas from '../components/ListaLlenaderas.vue'
import ListaServicio from '../components/ListaServicio.vue'

export default {
  components: {
    ListaLlenaderas,
    ListaServicio,
  },
  setup() {
    const store = useStore()
    const tanques = computed(() => store.state.tanques.tanquesInServicio)
    let tanks = ref(tanques.value)

    return {
      tanks,
    }
  },
};
</script>