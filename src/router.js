import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'
import dashboardRouter from './modules/dashboard/router'
import userRouter from './modules/usuarios/router'
import tanqueRouter from './modules/tanques/router'

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
    path: '/dashboard',
    ...dashboardRouter
  },
  {
    path: '/usuarios',
    ...userRouter
  },
  {
    path: '/tanques',
    ...tanqueRouter
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router