import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Home.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  {
    path: '/favorites',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Favorites.vue') }],
  },

  {
    path: '/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Categories.vue') }],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/About.vue') }],
  },
];

export default routes;
