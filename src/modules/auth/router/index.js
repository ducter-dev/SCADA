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
    {
      path: 'resetpassword',
      name: 'resetpassword',
      component: () => import('../views/ResetPassword.vue')
    },    
    {
      path: 'rescutepassword',
      name: 'rescutepassword',
      component: () => import('../views/RescutePassword.vue')
    },
  ]
}