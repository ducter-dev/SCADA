<script setup>
import { computed } from 'vue'
const props = defineProps({
    value: {
        default: 'Columna Th'
    },
    center: {
        type: Boolean,
        default: false,
    },
    right: {
        type: Boolean,
        default: false,
    },
    left: {
        type: Boolean,
        default: false,
    },
    Lname: {
        type: String,
        default: 'LHeaderTh',
    },

})

const { value, right, left, center } = props

const baseClasses = [
    'px-2 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold',
]

const classes = computed(() => [
    ...baseClasses,
    {
        'text-center': center,
        'text-right': right,
        'text-left': left,
    }
])
</script>
<template>
    <th :class="classes">{{ value }}</th>
</template>