<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2 rounded">
    <div class="container flex justify-between items-center mx-auto">
      <div class="flex">
        <span class="text-dark font-bold text-base">Home</span>
      </div>
      <div class="flex items-center">
        <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{{ userName }}</span>
        <button
          type="button"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
          @click="exitApp"
          >
          <IconExit class="w-4 h-4" fill="currentColor" />
          <span class="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import IconExit from '../../../assets/icons/door-closed-solid.svg'

export default {
  props: {
    userName: String
  },
  components: {
    IconExit,
  },
  setup(props, ctx) {
    const userName = ref(props.userName)

    const exitApp = () => {
      ctx.emit('exitApp', true)
    }
  
    return {
      userName,
      exitApp,
    }
  }

}
</script>

