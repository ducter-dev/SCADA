export default {
  name: 'auth',
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: 'registro',
      name: 'registro',
      component: () => import('../views/Register.vue')
    },
  ]
}