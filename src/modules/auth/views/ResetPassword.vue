<template>
    <h1 class="font-bold text-center text-2xl mb-5">Actualizar Contraseña</h1>
    <form class="bg-white shadow w-full rounded-lg divide-y divide-gray-200" @submit.prevent="onSubmit">
        <div class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
            <input v-model="contrasena" type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" :class="classInput"/>
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Confirmar Contraseña</label>
            <input v-model="contrasenaConf" type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" :class="classInput"/>
            <div v-show="showNotificacion" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span class="font-medium">Error!</span> {{ message }}
            </div>
            <div class="mx-2">
                <button class="inline-flex disabled:opacity-25 disabled:cursor-not-allowed items-center justify-center w-full p-2 bg-gradient-to-r from-primary bg-link text-white hover:bg-logo scale-105 duration-300">
                    Guardar
                </button>
            </div>
        </div>
        
    </form>
</template>

<script>
import { ref, watch,computed } from 'vue'
import useAuth from '../composables/useAuth'

export default {
    setup(props, context) {
        const contrasena = ref('')
        const contrasenaConf = ref('')
        const classInput = ref('')
        const showNotificacion = ref(false)
        const message = ref('')
        const isEqualsPass = ref(false)
        const isDisabled = ref(true)

        const { getUserName } = useAuth()
        const userName = computed(() => getUserName())

        const onSubmit = () => {
            console.log(userName.value)
        }
        const checkPassword = () => {
            console.log('check pass')
            if (contrasena.value === contrasenaConf.value) {
                message.value = ''
                isEqualsPass.value = true
                const isLong = contrasena.value.length > 7
                const myRegExpMayus = /[A-Z]/
                const myRegSimbolos = /\W/
                const mayusTest = myRegExpMayus.test(contrasenaConf.value)
                const simbolTest = myRegSimbolos.test(contrasenaConf.value)
                if (!isLong || !mayusTest || !simbolTest) {
                    isDisabled.value = true
                    classInput.value = 'border-primary'
                    message.value = `${isLong ? '' : 'La contraseña debe tener al menos 8 caracteres. '}${mayusTest ? '' : 'La contraseña debe tener una letra MAYÚSCULA. '}${simbolTest ? '' : 'La contraseña debe tener al menos un símbolo.'}`
                    showNotificacion.value = true
                } else {
                    classInput.value = 'border-blue-700'
                    showNotificacion.value = false
                }
            } else {
                message.value = 'Las contraseñas no coinciden.'
                isEqualsPass.value = false
                isDisabled.value = true
                classInput.value = 'border-red-700'
                showNotificacion.value = true
            }
        }

        watch(contrasena, () => {
            checkPassword()
        })
        watch(contrasenaConf, () => {
            checkPassword()
        })
        return {
            contrasena,
            contrasenaConf,
            isEqualsPass,
            onSubmit,
            showNotificacion,
            classInput,
            message,
        }
    }
}
</script>