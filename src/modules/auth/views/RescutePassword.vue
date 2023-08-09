<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import useToast from "../../dashboard/composables/useToast"

const { addToast } = useToast()
const { recoveryPassword } = useAuth()

const correo = ref('')
const router = useRouter()
const onSubmit = async() => {
	try {
		const { data, status } = await recoveryPassword(correo.value)
		console.log("🚀 ~ file: RescutePassword.vue:15 ~ onSubmit ~ status:", status)
		console.log("🚀 ~ file: RescutePassword.vue:15 ~ onSubmit ~ data:", data)
		if (status == 200) {
			addToast({
          message: {
            title: "¡Éxito!",
            message: data.message,
            type: "info"
          },
        })
		} else {
			addToast({
          message: {
            title: "¡Error!",
            message: data,
            type: "error"
          },
        })
		}
	} catch (error) {
		console.log("🚀 ~ file: RescutePassword.vue:35 ~ onSubmit ~ error:", error)
		addToast({
			message: {
				title: "¡Error!",
				message: error,
				type: "error"
			},
		})
	}
}

</script>

<template>
	<h1 class="mb-5 text-2xl font-bold text-center">Recuperar Contraseña</h1>
	<form @submit.prevent="onSubmit" class="w-full bg-white divide-y divide-gray-200 rounded-lg shadow">
		<div class="px-5 py-7">
			<label class="block pb-1 text-sm font-semibold text-gray-600">Correo</label>
			<input type="email" class="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg" v-model="correo"/>
			<div class="mx-2">
				<button type="submit"
					class="inline-flex items-center justify-center w-full p-2 text-white duration-300 scale-105 disabled:opacity-25 disabled:cursor-not-allowed bg-gradient-to-r from-primary bg-link hover:bg-logo">
					Enviar
				</button>
			</div>
		</div>
	</form>
	<div class="py-5">
		<div class="flex flex-row-reverse">
			<div class="text-center sm:text-left whitespace-nowrap">
				<router-link :to="{ name: 'login' }"
					class="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						class="inline-block w-4 h-4 align-text-top">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span class="inline-block ml-1">volver</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

