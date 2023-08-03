export default {
  name: 'usuarios',
  component: () => import('../../dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'usuarios.home',
      component: () => import('../views/Index.vue')
    },
  ]
}