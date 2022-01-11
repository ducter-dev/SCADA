<template>
  <div class="container mx-auto h-full flex justify-center items-center">
    <div class="w-3/12">
        <form>
          <div class="mb-6">
            <label for="user" class="block mb-2 text-base font-bold text-dark">Usuario</label>
            <input type="text" id="user" class="bg-gray-50 border border-gray-300 text-dark text-base font-semibold rounded-lg focus:ring-black focus:border-dark block w-full p-2.5" placeholder="" required>
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-base font-bold text-dark">Contraseña</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-dark text-base font-semibold rounded-lg focus:ring-black focus:border-dark block w-full p-2.5" placeholder="" required>
          </div>
          <button
            type="button"
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
  </div>
</template>