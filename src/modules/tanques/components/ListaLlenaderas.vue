<template>
  <div class="w-full flex flex-wrap justify-between items-stretch">
    <CardLlenadera v-for="llenadera in llenaders" :key="llenadera.id" :llenadera="llenadera" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import useLlenaderas  from '../composables/useLlenaderas'
import CardLlenadera from './CardLlenadera.vue'
export default {
  components: {
    CardLlenadera
  },
  setup() {
    const { getLlenaderas } = useLlenaderas()

    const llenaderas = computed(() => getLlenaderas())
    const llenaders = ref(llenaderas.value)

    return {
      llenaders
    }
  },
}
</script>