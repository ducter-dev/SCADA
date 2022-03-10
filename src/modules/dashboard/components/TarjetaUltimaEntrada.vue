<template>
  <div
    class="
      p-2
      m-2
      max-w-sm
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      flex flex-col
    "
  >
    <h5
      class="
        flex
        justify-center
        items-center
        text-gray-400 text-xl
        font-bold
        mt-1
        mb-1
      "
    >
      Última Entrada
    </h5>
    <div class="flex flex-col justify-center items-center">
      <div class="flex justify-center items-center">
        <pre class="text-sm text-dark">
          {{ data }}
        </pre>
      </div>
      <div class="flex justify-center items-center">
        <button
          type="button"
          class="
            text-dark
            bg-white
            hover:bg-gray-200
            focus:ring-2 focus:ring-dark
            font-medium
            rounded-lg
            text-base
            px-5
            py-2
            text-center
          "
          @click="$emit('openForm')"
        >
          <IconPlus class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconPlus from '../../../assets/icons/plus-solid.svg'
export default {
  props: ['data'],
  components: {
    IconPlus,
  }
}
</script>
