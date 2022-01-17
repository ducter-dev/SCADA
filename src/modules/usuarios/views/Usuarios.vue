<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <Table :usuarios="usuarios" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../components/Table.vue'
export default {
  components: {
    Table,
  },
  setup () {
    
    const usuarios = [
      { id: 1, nombre: 'Administrador', categoria: 1, departamento: 1 },
      { id: 2, nombre: 'Alejandra Lara Hernandez', categoria: 2, departamento: 2 },
      { id: 3, nombre: 'Vianey Calva Zenil', categoria: 2, departamento: 3 },
      { id: 4, nombre: 'Usuario Cuarto Control', categoria: 3, departamento: 3 },
      { id: 5, nombre: 'Auditor Fiscal', categoria: 4, departamento: 4 },
    ]
    return {
      usuarios,
    }
  }
}
</script>