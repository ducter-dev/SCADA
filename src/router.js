import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'
import dashboardRouter from './modules/dashboard/router'

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
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router