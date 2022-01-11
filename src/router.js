import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

const routes = [
  { 
    path: '/',
    name: 'Index',
    component: () => import('./views/Login.vue')
  },
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./views/Dashboard.vue')
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router