<script setup>
defineProps({
    label:{
        type:String,
        default:'Label'
    },
    value:{
        require:false,
    },
    labelClass:{
        type:String,
        require:false
    },
    valueClass:{
        type:String,
        require:false
    },
    Lname: {
        type: String,
        default: 'LCardListItem',
    },
})
</script>
<template>
    <li class="py-1">
        <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300" v-html="label" :class="labelClass"></p>
            </div>
            <div class="inline-flex items-center text-sm font-semibold text-slate-900 dark:text-white" :class="valueClass">
                {{ value }}
                <slot/>
            </div>
        </div>
    </li>
</template>