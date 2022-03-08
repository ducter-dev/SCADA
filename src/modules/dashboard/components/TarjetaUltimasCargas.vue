<template>
  <div class="m-2
      max-w-sm
      p-2
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      flex flex-col">
    <div class="flex justify-center items-center mt-1 mb-1">
      <h5 class="
        text-gray-400 text-xl
        font-bold
      ">
        Últimas Salidas
      </h5>
    </div>
    <div class="p-1
            m-1
            max-w-sm
            bg-white
            rounded-lg
            border border-gray-200
            shadow-md">
      <table>
        <thead >
          <tr>
            <th
              scope="col"
              class="
                py-3
                px-3
                text-xs
                font-sm
                tracking-wider
                text-center text-gray-400
                uppercase
              "
            >
              No.
            </th>
            <th
              scope="col"
              class="
                py-3
                px-3
                text-xs
                font-sm
                tracking-wider
                text-center text-gray-400
                uppercase
              "
            >
              Llen
            </th>
            <th
              scope="col"
              class="
                py-3
                px-9
                text-xs
                font-sm
                tracking-wider
                text-center text-gray-400
              "
            >
              AT
            </th>
            <th
              scope="col"
              class="
                py-3
                px-5
                text-xs
                font-sm
                tracking-wider
                text-center text-gray-400
                uppercase
              "
            >
              Tons.
            </th>
            <th
              scope="col"
              class="
                py-3
                px-6
                text-xs
                font-sm
                tracking-wider
                text-center text-gray-400
                uppercase
              "
            >
              Dens.
            </th>
          </tr>
        </thead>
        <tbody class="text-xs text-dark font-semibold text-center">
          <tr v-for="(s, index) in salidas" :key="s.id">
            <td
              class="py-1 px-5 whitespace-nowrap"
            >
              {{ index + 1}}
            </td>
            <td
              class="py-1 px-5 whitespace-nowrap"
            >
              {{ s.llenadera }}
            </td>
            <td
              class="py-1 px-5 whitespace-nowrap"
            >
              {{ s.atName }}
            </td>
            <td
              class="py-1 px-5 whitespace-nowrap"
            >
              {{ s.masaTons }}
            </td>
            <td
              class="py-1 px-5 whitespace-nowrap"
            >
              {{ s.densidadCor }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>

<script>
export default {
  props: ["salidas"],
};
</script>