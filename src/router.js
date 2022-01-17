import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'
import userRouter from './modules/usuarios/router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./views/Landing.vue')
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: '/usuarios',
    ...userRouter
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router