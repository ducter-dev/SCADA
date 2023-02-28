<script setup>
import { onMounted, computed } from "vue";
import IconCircleCheck from '@/assets/icons/circle-check.svg'
import IconCircleXmarK from '@/assets/icons/circle-xmark.svg'
import IconCircleInfo from '@/assets/icons/circle-info.svg'
import IconXmarK from '@/assets/icons/xmark.svg'
const props = defineProps({
  message: {
    type: Object
  },
  duration: {
    type: Number,
    default: 5000,
  },
});
onMounted(() => {
  setTimeout(() => emit("remove"), props.duration);
});
const emit = defineEmits(["remove"]);
const baseClasses = [
  "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center ",
];
const variantClasses = (variant) => ({
  "bg-green-100 text-green-500":
    variant == "success",
  "bg-red-100 text-red-500":
    variant == "error",
  "bg-blue-100 text-blue-500":
    variant == "info",
});
const classes = computed(() => [
  ...baseClasses,
  variantClasses(props.message.type),
]);
</script>
<template>

  <div id="toast-interactive"
    class="w-full max-w-xs p-4 text-slate-500 bg-white shadow " role="alert">
    <div class="flex">
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8" :class="classes">
        <IconCircleCheck class="h-5 w-5" v-if="props.message.type === 'success'" />
        <IconCircleXmarK class="h-5 w-5" v-else-if="props.message.type === 'error'" />
        <IconCircleInfo class="h-5 w-5" v-else-if="props.message.type === 'info'" />
      </div>
      <div class="ml-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900" v-html="props.message.title"></span>
            <div class="mb-2 text-sm font-normal" v-html="props.message.message"></div> 
        </div>
      <button type="button" @click="emit('remove')"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8" aria-label="Close">
        <IconXmarK class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>