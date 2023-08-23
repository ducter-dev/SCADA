import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './modules/auth/router'
import dashboardRouter from './modules/dashboard/router'
import userRouter from './modules/usuarios/router'
import tanqueRouter from './modules/tanques/router'
import useAuth from './modules/auth/composables/useAuth'

import { computed } from 'vue'
import { useLoginStore } from './modules/auth/store/login'

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
    meta: { requiresUserAuth: true },
    path: '/dashboard',
    ...dashboardRouter
  },
  {
    meta: { requiresUserAuth: true },

    path: '/usuarios',
    ...userRouter
  },
  {
    meta: { requiresUserAuth: true },
    path: '/tanques',
    ...tanqueRouter
  },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  if (to.matched.some(r => r.meta.requiresUserAuth)) {
    // esta ruta requiere autenticación, verifica si inició sesión
    // si no, redirigir a la página de inicio de sesión.
    console.log(loginStore)
    if (!loginStore.user) { 
      next({
        name: 'auth.login',
      })
    } else {
      next()
    }
  } else {
    next() // siempre llamar next()!
  }
})

export default router