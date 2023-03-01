<script setup>
import { computed } from 'vue'
const props = defineProps({
    value: {
        required: false
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
        default: 'LBodyTd',
    },
})

const { value, right, left, center } = props
const baseClasses = [
    'border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm text-slate-800 dark:text-white whitespace-nowrap py-1',
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
    <td :class="classes"> {{ value }}
        <slot />
    </td>
</template>