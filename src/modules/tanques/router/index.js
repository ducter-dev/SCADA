export default {
  name: 'tanques',
  component: () => import('../../dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'tanques.home',
      component: () => import('../views/Index.vue')
    },
  ]
}