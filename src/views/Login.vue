<template>
  <div class="container mx-auto h-full flex justify-center items-center">
    <div class="w-3/12">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-dark">Usuario</span>
          <input
            type="text"
            class="
              mt-1
              block
              w-full
              rounded-md
              border-dark
              shadow-sm
              focus:border-black focus:ring focus:dark focus:ring-opacity-50
            "
            placeholder=""
          />
        </label>
        <label class="block">
          <span class="text-dark">Contraseña</span>
          <input
            type="email"
            class="
              mt-1
              block
              w-full
              rounded-md
              border-dark
              shadow-sm
              focus:border-black focus:ring focus:dark focus:ring-opacity-50
            "
            placeholder="usuario@example.com"
          />
        </label>
        <button
          type="button"
          class="
            text-white
            bg-dark
            hover:bg-black
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            mr-2
            mb-2
          "
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  </div>
</template>