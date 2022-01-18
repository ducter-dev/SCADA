export default {
  name: 'dashboard',
  component: () => import('../layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: 'usuarios',
      name: 'usuarios',
      component: () => import('../../usuarios/views/Usuarios.vue')
    },
    {
      path: 'registro',
      name: 'Dashboard',
      component: () => import('../../usuarios/views/Register.vue')
    },
  ]
}