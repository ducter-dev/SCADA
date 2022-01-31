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
      path: 'usuarios',
      name: 'Usuarios',
      component: () => import('../../usuarios/views/Usuarios.vue')
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
  ]
}