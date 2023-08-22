export default {
  name: 'dashboard',
  component: () => import('../layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      name: 'dashboard.home',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: 'configuracion',
      name: 'configuration',
      component: () => import('../../dashboard/views/Configuracion.vue')
    },
    {
      path: 'entradas',
      name: 'entries',
      component: () => import('../../entries/views/index.vue')
    },
    {
      path: 'espera',
      name: 'waitinglist',
      component: () => import('../../tanques/views/Espera.vue')
    },
    {
      path: 'servicio',
      name: 'services',
      component: () => import('../../services/views/index.vue')
    },
    {
      path: 'entrada/manual',
      name: 'entradaManual',
      component: () => import('../../tanques/views/EntradaManual.vue')
    },
    {
      path: 'salidas',
      name: 'exits',
      component: () => import('../../exits/views/index.vue')
    },
    {
      path: 'reportes',
      name: 'reports',
      component: () => import('../../reports/views/index.vue')
    },
    {
      path: 'bitacora',
      name: 'records',
      component: () => import('../../bitacora/views/index.vue')
    },
  ]
}