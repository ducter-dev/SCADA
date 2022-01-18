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
      path: 'registro',
      name: 'Dashboard',
      component: () => import('../views/Register.vue')
    },
  ]
}