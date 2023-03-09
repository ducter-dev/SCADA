<script setup>
import {computed, onMounted, ref, useSlots} from 'vue';
import {useUUID} from "../../composables"
import { vMaska } from "maska"

const slots = useSlots();
const props = defineProps({
    modelValue:[String, Number],
    Lname: {
        type: String,
        default: 'LFloatInput',
    },
    mask:{
        type:String,
        default:null,
        required:false
    },
    label:{
        type:String,
        default:'',
        required:false
    },
    required:{
        type:Boolean,
        default:false,
    },
    disabled:{
        type:Boolean,
        default:false,
    },
    readonly:{
        type:Boolean,
        default:false,
    },
    placeholder:{
        type:String,
        default:' ',
        required:false
    },
    id:{
        type:[String,Number],
        default: '_input',
        required:false,
    },
    for:{
        type:[String,Number],
        default: '_input',
        required:false
    },
    error:{
        type:Boolean,
        default:false
    },
    errorMessage:{
        type:String,
        default:null
    },
    hint:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:'text'
    },
    autofocus:{
        type:Boolean,
        default:false
    },
    square:{
        type:Boolean,
        default:false
    },
    withPrependIcon:{
        type:Boolean,
        default:false
    },
    withAppendIcon:{
        type:Boolean,
        default:false
    },
    colorInput:{
        type:String,
        default:'blue-600'
    },
    colorInputDark:{
        type:String,
        default:'blue-600'
    },
    colorLabel:{
        type:String,
        default:'blue-600'
    },
    colorLabelDark:{
        type:String,
        default:'blue-600'
    }
});
defineEmits(['update:modelValue']);
const input = ref(null);
const UUID = ref(useUUID());
const baseInputClasses = [
    'block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer',
]
const baseLabelClasses = [
    'absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5',
]
const baseIconErrorClasses = [
    'absolute inset-y-0 right-0 flex items-center pointer-events-none'
]
onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
const classesIconError = computed(() => [
    ...baseIconErrorClasses,
    [
        props.error && props.withAppendIcon ? 'pr-8' : 'pr-3'
    ]
])
const classesInput = computed(() => [
    ...baseInputClasses,
    {
        'dark:border-red-500 border-red-600 focus:border-red-600 dark:focus:border-red-500 pr-10': props.error,
    },
    {
        'focus:border-blue-600 dark:focus:border-blue-500': !props.error,
    },
    {
        'cursor-not-allowed border-dashed': props.disabled,
    },
    {
        'border-dashed': props.readonly,
    },
    {
        'rounded-t-lg':!props.square
    },
    {
        'pl-10': props.withPrependIcon
    },
    {
        'pr-10': props.withAppendIcon
    },
    [
        props.error && props.withAppendIcon ? 'pr-14' : ''
    ],
    [
        props.label ? 'pt-5' :'pt-3'
    ]
])
const classesLabel = computed(() => [
    ...baseLabelClasses,
    {
        'text-red-600 dark:text-red-500': props.error,
    },
    {
        'peer-focus:text-blue-600 peer-focus:dark:text-blue-500': !props.error,
    },
    {
        'text-gray-400 dark:text-gray-500 cursor-not-allowed': props.disabled,
    },
    {
        'text-gray-500 dark:text-gray-400': !props.disabled,
    },
    {
        'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4' : props.placeholder === ' '
    },
    {
        'pl-10': props.withPrependIcon
    }
])
defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <div>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" v-if="withPrependIcon">
                <!-- Heroicon name: solid/mail -->
                <slot name="prepend-icon"></slot>
            </div>
            <input :type="type" v-maska :data-maska="mask"
                   :autofocus="autofocus"
                   :id="`${UUID}${id}`"
                   @input="$emit('update:modelValue', $event.target.value)"
                   ref="input"
                   :value="modelValue"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   :class="classesInput"/>
            <label :for="`${UUID}${id}`"
                   :class="classesLabel" v-if="label">{{label}}&nbsp;<span class="text-red-500" v-if="required">*</span></label>
            <div :class="classesIconError" v-if="error">
                <!-- Heroicon name: solid/exclamation-circle -->
                <svg class="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3" v-if="withAppendIcon">
                <!-- Heroicon name: solid/question-mark-circle -->
               <slot name="append-icon"></slot>
            </div>
        </div>
        <p v-if="error" :id="`${UUID}_error`" class="mt-2 text-xs text-left text-red-600 dark:text-red-400">{{errorMessage}}</p>
        <p v-if="hint" :id="`${UUID}_hint`" class="mt-2 text-xs text-left text-gray-400 dark:text-gray-300">{{hint}}</p>
    </div>
</template>