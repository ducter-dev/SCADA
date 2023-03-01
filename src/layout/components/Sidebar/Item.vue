<script setup>
import { computed } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "Dropdown sidebar item",
    required: false,
  },
  toRoute: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const { active, label, toRoute } = props;
const baseClasses = [
  "group flex items-center pl-5 pr-4 py-2 mt-1 border-l-4 text-sm font-medium focus:outline-none",
];
const variantClasses = (active) => ({
  "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700":
    !active,
  "border-blue-700 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800":
    active,
});
const classes = computed(() => [...baseClasses, variantClasses(active)]);
</script>
<template>
  <a :href="toRoute" :class="classes">
    <slot name="icon" />
    <span class="truncate">{{ label }}</span>
  </a>
</template>