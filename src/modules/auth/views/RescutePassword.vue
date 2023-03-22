<template>
    <h1 class="font-bold text-center text-2xl mb-5">Recuperar Contraseña</h1>
    <form class="bg-white shadow w-full rounded-lg divide-y divide-gray-200" @submit.prevent="onSubmit">
        <div class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Correo</label>
            <input type="email" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
            <div class="mx-2">
                <button class="inline-flex disabled:opacity-25 disabled:cursor-not-allowed items-center justify-center w-full p-2 bg-gradient-to-r from-primary bg-link text-white hover:bg-logo scale-105 duration-300">
                    Guardar
                </button>
            </div>
        </div>
        
    </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const correo = ref('')
        const onSubmit = () => {
            console.log("recuperar")
        }
        return {
            correo,
            onSubmit,
        }
    }
}
</script>