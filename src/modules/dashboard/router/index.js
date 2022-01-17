export default {
  name: 'dashboard',
  component: () => import('../layouts/DashboardLayouts.vue'),
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
  ]
}