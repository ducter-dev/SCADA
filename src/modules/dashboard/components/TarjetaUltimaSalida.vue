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
      Última Salida
    </h5>
    <div class="flex justify-center items-center">
      <pre class="text-sm text-dark">
        {{ data }}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>
