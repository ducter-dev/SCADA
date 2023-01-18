export default {
  name: 'dashboard',
  component: () => import('../layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: 'configuracion',
      name: 'configuracion',
      component: () => import('../../dashboard/views/Configuracion.vue')
    },
    {
      path: 'usuarios/editar',
      name: 'EditarUsuarios',
      component: () => import('../../usuarios/views/EditarUser.vue')
    },
    {
      path: 'entrada/registro',
      name: 'Registro',
      component: () => import('../../usuarios/views/Register.vue')
    },
    {
      path: 'entradas',
      name: 'ListaEntrada',
      component: () => import('../../dashboard/views/Configuracion.vue')
    },
    {
      path: 'espera',
      name: 'ListaEspera',
      component: () => import('../../tanques/views/Espera.vue')
    },
    {
      path: 'servicio',
      name: 'ListaServicio',
      component: () => import('../../tanques/views/Servicio.vue')
    },
    {
      path: 'tanques/editar',
      name: 'TanquesEditar',
      component: () => import('../../tanques/views/Editar.vue')
    },
    {
      path: 'tanques/nuevo',
      name: 'TanquesNuevo',
      component: () => import('../../tanques/views/Nuevo.vue')
    },
    {
      path: 'entrada/manual',
      name: 'entradaManual',
      component: () => import('../../tanques/views/EntradaManual.vue')
    },
    {
      path: 'salidas',
      name: 'salidas',
      component: () => import('../../dashboard/views/Configuracion.vue')
    },
    {
      path: 'reportes',
      name: 'reportes',
      component: () => import('../../dashboard/views/Configuracion.vue')
    },
  ]
}