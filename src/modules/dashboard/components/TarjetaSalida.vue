<template>
  <div 
  class="flex flex-col max-w-sm p-2 m-2 bg-white border border-gray-200 rounded-lg shadow-md "
  >
    <h5 class="flex items-center justify-center mt-1 mb-1 text-xl font-bold text-gray-400 ">
      Antena Salida
    </h5>
    <div class="flex flex-row items-start justify-around">
      <span class="flex items-center justify-center mt-1 mb-1 text-sm font-bold text-gray-400 ">Num AT. </span>
      <span  class="flex items-center justify-center mt-1 mb-1 text-sm font-bold text-gray-700 "> {{ data.numAT }}</span>
    </div>
      <p></p>
    <div class="flex flex-row items-start justify-around">
      <span class="flex items-center justify-center mt-1 mb-1 text-sm font-bold text-gray-400 ">Tipo AT: </span>
      <span  class="flex items-center justify-center mt-1 mb-1 text-sm font-bold text-gray-700 "> {{ setTipo(data.tipoAT) }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data'],
  setup() {

    const setTipo = (tipo) => {
      switch (tipo) {
        case 0:
          return 'Sencillo'
        case 1:
          return 'FULL A'
        case 2:
          return 'FULL B'
      }
    }

    return {
      setTipo,
    }
  }

}
</script>