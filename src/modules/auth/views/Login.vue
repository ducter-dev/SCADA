<template>
  <h1 class="font-bold text-center text-2xl mb-5">Acceso</h1>
  <form @submit.prevent="onSubmit" class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
    <div class="px-5 py-7">
      <label class="font-semibold text-sm text-gray-600 pb-1 block">Usuario</label>
      <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" v-model="userForm.usuario" />
      <label class="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
      <input type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" v-model="userForm.password" />
      <div class=" mx-2">
        <button
          class="inline-flex disabled:opacity-25 disabled:cursor-not-allowed items-center justify-center w-full p-2 bg-gradient-to-r from-primary bg-link text-white hover:bg-logo scale-105 duration-300"
          :disabled="submit" type="submit">
          <template v-if="submit">
            <svg class="inline mr-2 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg>

            Accediendo
          </template>
          <template v-else> Acceder </template>
        </button>
      </div>
    </div>
  </form>
  <div class="py-5">
    <div class="flex flex-row-reverse">
      <div class="text-center sm:text-left whitespace-nowrap">
        <router-link :to="{ name: 'Landing' }"
          class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="w-4 h-4 inline-block align-text-top">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="inline-block ml-1">volver</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'
import useToast from "../../dashboard/composables/useToast";

const { addToast } = useToast()

export default {
  setup() {
    const USERDB = import.meta.env.VITE_USERDB
    const PASSDB = import.meta.env.VITE_PASSDB
    const { login } = useAuth()
    const router = useRouter()

    const submit = ref(false)

    const userForm = ref({
      usuario: USERDB,
      password: PASSDB
    })

    const onSubmit = async () => {
      submit.value = true
      const { ok, detail, status } = await login(userForm.value)

      if (!ok) {

        addToast({
          message: {
            title: "¡Error!",
            message: detail,
            type: "error"
          },
        });
        submit.value = false
      } else {
        addToast({
          message: {
            title: "¡Login Correcto!",
            message: "Entrando a la aplicación.",
            type: "info"
          },
        });
        submit.value = false
        router.push('/dashboard')
      }
    }

    return {
      userForm,
      submit,
      onSubmit,
    }
  }
}
</script>