<script setup>
import IconLoaderSpinn from "../../../assets/icons/loader.svg"
defineProps({
  loader: {
    type: Boolean
  },
  Lname: {
    type: String,
    default: 'LTable',
  },
})
</script>
<template>
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse ">
      <thead>
        <slot name="head" />
      </thead>
      <tbody class="divide-y divide-slate-200">
        <template v-if="!loader">
          <slot name="body" />
        </template>
        <template v-else>
          <tr>
            <LBodyTh colspan="10" center>
              <IconLoaderSpinn class="inline w-4 h-4 mr-2 animate-spin" />
              Cargando
            </LBodyTh>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>