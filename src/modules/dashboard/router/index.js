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
      path: 'registro',
      name: 'Registro',
      component: () => import('../../usuarios/views/Register.vue')
    },
    {
      path: 'tanques/espera',
      name: 'TanquesEspera',
      component: () => import('../../tanques/views/Espera.vue')
    },
    {
      path: 'tanques/servicio',
      name: 'TanquesServicio',
      component: () => import('../../tanques/views/Servicio.vue')
    },
  ]
}