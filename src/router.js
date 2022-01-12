import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'

const routes = [
  {
    path: '/auth',
    ...authRouter
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router