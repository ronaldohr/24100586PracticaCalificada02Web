const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/Login',
    component: () => import("src/components/auth/LoginForm.vue")
  },
  {
    path: '/Digimon',
    component: () => import("src/components/ListCard/CardDigimon.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
