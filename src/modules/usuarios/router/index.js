export default {
  name: 'usuarios',
  component: () => import('../../dashboard/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'usuarios.home',
      component: () => import('../views/Index.vue')
    },
    {
      path: '',
      name: 'usuarios.create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '',
      name: 'usuarios.edit',
      component: () => import('../views/Edit.vue')
    },
  ]
}