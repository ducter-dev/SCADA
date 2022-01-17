export default {
  name: 'usuarios',
  component: () => import('../layouts/UsersLayout.vue'),
  children: [
    {
      path: '',
      name: 'usuarios',
      component: () => import('../views/Usuarios.vue')
    },
    {
      path: 'editar',
      name: 'editar',
      component: () => import('../views/EditarUser.vue')
    },
  ]
}