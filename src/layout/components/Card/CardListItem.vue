<script>
export default {
    name: 'LCardListItem'
}
</script>
<script setup>
defineProps({
    label:{
        type:String,
        default:'Label'
    },
    value:{
        type:String,
        default:'Value'
    }
})
</script>
<template>
    <li class="py-1">
        <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate text-slate-700 dark:text-slate-300" v-html="label"></p>
            </div>
            <div class="inline-flex items-center text-sm font-semibold text-slate-900 dark:text-white" v-html="value"></div>
        </div>
    </li>
</template>