<script setup>
import { computed } from "vue";
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
  href: {
    type: String,
    required: true,
  }
});
const baseClasses = [
  "inline-flex items-center p-2 text-base leading-6 font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-900 transition ease-in-out duration-150",
];
const classes = computed(() => [
  ...baseClasses,
  {
    "bg-blue-900": props.active,
  },
]);
</script>
<template>
  <li :class="classes">
    <a :href="href">
      <slot></slot>
    </a>
  </li>
</template>