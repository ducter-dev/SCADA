
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
  "group flex items-center pl-12 pr-4 py-2 mt-1 text-sm font-medium focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800",
];
const variantClasses = (active) => ({
  "text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white":
    !active,
  "text-blue-700 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-500":
    active,
});
const classes = computed(() => [
  ...baseClasses,
  variantClasses(active)
]);
</script>
<template>
  <li>
    <a :href="toRoute" :class="classes">{{ label }}</a>
  </li>
</template>