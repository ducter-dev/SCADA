<script setup>
import { onMounted, computed, ref } from "vue";
import IconChevronDown from "../../../assets/icons/chevron-down.svg"
import { useToggle } from "@vueuse/core";
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: "Menu dropdown",
  },
});
const isOpen = ref(false);
const toggleDropdown = useToggle(isOpen);
onMounted(() => {
  if(props.active){
    toggleDropdown()
  }
})
const baseClasses = [
  "cursor-pointer group flex items-center pl-5 pr-4 py-2 mt-1 border-l-4 text-sm font-medium focus:outline-none",
];
const { active, label} = props
const variantClasses = (active) => ({
  "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700":
  !active,
  "text-slate-600 dark:text-white bg-slate-50 dark:bg-slate-800 border-blue-700 hover:border-blue-700":
    active,
});
const classes = computed(() => [
  ...baseClasses,
  variantClasses(active)
]);
</script>
<template>
  <div :class="isOpen ? 'bg-slate-50 dark:bg-slate-800' : ''">
    <div @click="toggleDropdown()">
      <span :class="classes">
        <slot name="icon" />
        <span class="truncate flex-1" v-html="label"></span>
        <IconChevronDown class="w-4 h-4 transtition duration-200" :class="isOpen ? 'rotate-180' : ''"></IconChevronDown>
      </span>
    </div>
    <ul
      v-if="isOpen"
      class="space-y-1 bg-slate-50 dark:bg-slate-800 animate__animated animate__fadeIn">
      <slot name="content" />
    </ul>
  </div>
</template>