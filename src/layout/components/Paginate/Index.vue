<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['changePaginate'])

const props = defineProps({
  pagination: Object,
  offset: Number
})

const isCurrentPage = (page) => {
  return props.pagination.current_page === page
}

const changePage = (page) => {
  if (page > props.pagination.last_page) {
    page = props.pagination.last_page
  }
  props.pagination.current_page = page
  emit('changePaginate')
}

const pages = computed(() => {
  let pages = []

  let from = props.pagination.current_page - Math.floor(props.offset / 2)

  if (from < 1) {
    from = 1
  }

  let to = from + props.offset - 1

  if (to > props.pagination.last_page) {
    to = props.pagination.last_page
  }

  while (from <= to) {
    pages.push(from)
    from++
  }

  return pages
})
</script>



<template>
  <!--Pagination-->
  <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
    aria-label="Table navigation" v-if="pagination.links">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Mostrando
      <span class="font-semibold text-gray-900 dark:text-white"> {{ pagination.from }} - {{ pagination.to }}</span>
      de
      <span class="font-semibold text-gray-900 dark:text-white"> {{ pagination.total }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px" v-if="pagination.links.length > 1">
      <li>
        <button @click.prevent="changePage(1)" :disabled="pagination.current_page <= 1"
          class="rounded-l-lg  flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white text-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed ">
          Primer página
        </button>
      </li>
      <li>
        <button @click.prevent="changePage(pagination.current_page - 1)" :disabled="pagination.current_page <= 1"
          class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white text-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clip-rule="evenodd" />
          </svg>

        </button>
      </li>

      <li v-for="page in pages" :key="page">
        <button @click.prevent="changePage(page)"
          :class="isCurrentPage(page) ? 'z-10 text-white bg-gray-500' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
          class="flex items-center justify-center px-3 py-2 text-sm leading-tight border ">{{ page }}
        </button>
      </li>


      <li>
        <button @click.prevent="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page >= pagination.last_page"
          class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white text-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clip-rule="evenodd" />
          </svg>

        </button>
      </li>
      <li>
        <button @click.prevent="changePage(pagination.last_page)"
          :disabled="pagination.current_page >= pagination.last_page"
          class="rounded-r-lg flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white text-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed ">
          Última página
        </button>
      </li>

    </ul>
  </nav>
</template>

