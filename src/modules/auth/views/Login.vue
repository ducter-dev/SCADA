<template>
  <div class="w-3/12">
    <div class="flex justify-center items-center content-center my-8">
      <h2 class="text-xl font-bold">Login</h2>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="user" class="block mb-2 text-base font-bold text-dark"
          >Usuario</label
        >
        <input
          type="text"
          v-model="userForm.usuario"
          class="
            bg-gray-50
            border border-gray-300
            text-dark text-base
            font-semibold
            rounded-lg
            focus:ring-black focus:border-dark
            block
            w-full
            p-2.5
          "
          placeholder=""
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-base font-bold text-dark"
          >Contraseña</label
        >
        <input
          type="password"
          v-model="userForm.password"
          class="
            bg-gray-50
            border border-gray-300
            text-dark text-base
            font-semibold
            rounded-lg
            focus:ring-black focus:border-dark
            block
            w-full
            p-2.5
          "
          placeholder=""
          required
        />
      </div>
      <button
        type="submit"
        class="
          w-full
          text-white
          bg-dark
          hover:bg-black
          focus:ring-4 focus:ring-dark
          font-medium
          rounded-lg
          text-base
          px-5
          py-2.5
          text-center
          mr-2
          mb-2
        "
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default {
  setup () {
    const USERDB = import.meta.env.VITE_USERDB
    const PASSDB = import.meta.env.VITE_PASSDB
    const { signIn } = useAuth()
    const router = useRouter()

    const userForm = ref({
      usuario: USERDB,
      password: PASSDB
    })

    const onSubmit = async() => {
      const { ok, detail } = await signIn(userForm.value)
      
      if ( !ok ) {
        Swal.fire('Error', detail, 'error')
      } else {
        Swal.fire('Login Correcto', 'Entrando a la aplicacion', 'success')
        router.push('/dashboard')
      }
    }

    return {
      userForm,
      onSubmit, 
    }
  }
}



</script>