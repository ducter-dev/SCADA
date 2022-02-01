<template>
  <div class="w-full flex flex-wrap justify-between items-stretch">
    <CardLlenadera v-for="llenadera in llenaders" :key="llenadera.id" :llenadera="llenadera" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CardLlenadera from './CardLlenadera.vue'
export default {
  components: {
    CardLlenadera
  },
  setup() {
    const store = useStore()

    const llenaderas = computed(() => store.state.tanques.llenaderas)
    let llenaders = ref(llenaderas.value)

    return {
      llenaders
    }
  },
}
</script>