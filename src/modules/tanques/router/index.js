export default {
  name: 'tanques',
  component: () => import('../../dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'tanques.home',
      component: () => import('../views/Index.vue')
    },
    {
      path: '',
      name: 'tanques.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '',
      name: 'tanques.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}