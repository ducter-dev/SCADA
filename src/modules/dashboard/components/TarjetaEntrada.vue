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
    <h5 class="
        flex
        justify-center
        items-center
        text-gray-400 text-xl
        font-bold
        mt-1
        mb-1
      ">
      Antena Entrada
    </h5>
    <div class="flex flex-row justify-around items-start">
      <span class="
        flex
        justify-center
        items-center
        text-gray-400 text-sm
        font-bold
        mt-1
        mb-1
      ">Num AT. </span>
      <span  class="
        flex
        justify-center
        items-center
        text-gray-700 text-sm
        font-bold
        mt-1
        mb-1
      "> {{ data.numAT }}</span>
    </div>
      <p></p>
    <div class="flex flex-row justify-around items-start">
      <span class="
        flex
        justify-center
        items-center
        text-gray-400 text-sm
        font-bold
        mt-1
        mb-1
      ">Tipo AT: </span>
      <span  class="
        flex
        justify-center
        items-center
        text-gray-700 text-sm
        font-bold
        mt-1
        mb-1
      "> {{ setTipo(data.tipoAT) }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data'],
  setup() {

    const setTipo = (tipo) => {
      switch (tipo) {
        case 1:
          return 'FULL A'
        case 2:
          return 'FULL B'
        case 3:
          return 'Sencillo'
      }
    }

    return {
      setTipo,
    }
  }

}
</script>