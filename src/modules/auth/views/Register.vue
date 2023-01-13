<template>
  <div class="w-3/12">
    <div class="flex justify-center items-center content-center my-8">
      <h2 class="text-xl font-bold">Registro</h2>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="user" class="block mb-2 text-base font-bold text-dark"
          >Nombre</label
        >
        <input
          type="text"
          v-model="userForm.usuario"
          class="
            bg-gray-50
            border border-gray-300
            text-dark text-base
            font-normal
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
      <div class="mb-6">
        <label for="categories" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona una Categoría</label>
        <select id="categories" class="bg-gray-50
            border border-gray-300
            text-dark text-base
            font-semibold
            rounded-lg
            focus:ring-black focus:border-dark
            block
            w-full
            p-2.5"
            v-model="userForm.categoria">
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="departaments" class="block mb-2 text-base font-bold text-dark dark:text-gray-400">Selecciona un Departamento</label>
        <select id="departaments" class="bg-gray-50
            border border-gray-300
            text-dark text-base
            font-semibold
            rounded-lg
            focus:ring-black focus:border-dark
            block
            w-full
            p-2.5"
            v-model="userForm.departamento">
          <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
        </select>
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
        Registrar
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useUsuario from '../../usuarios/composables/useUser'

export default {
  setup () {

    const { insertUsuario } = useUsuario()

    const categorias = [
      { id: 1, nombre: 'Administrador'},
      { id: 2, nombre: 'Supervisor'},
      { id: 3, nombre: 'Operador'},
      { id: 4, nombre: 'Auditor Fiscal'},
    ]

    const departamentos = [
      { id: 1, nombre: 'Administración'},
      { id: 2, nombre: 'Cuarto de Control'},
      { id: 3, nombre: 'Acceso'},
      { id: 4, nombre: 'Báscula'},
      { id: 5, nombre: 'Exterior'},
    ]

    const userForm = ref({
      usuario: '',
      password: '',
      categoria: null,
      departamento: null,
    })

    const onSubmit = async() => {
      const { ok }  = await insertUsuario(userForm.value)
    }

    return {
      userForm,
      onSubmit,
      categorias,
      departamentos,
    }
  }
}



</script>