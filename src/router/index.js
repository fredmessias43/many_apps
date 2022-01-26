import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('../pages/Test.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/Search.vue')
  },
  {
    path: '/json-csv',
    name: 'convert-json-csv',
    component: () => import('../pages/JSON_CSV.vue')
  },
  {
    path: '/csv-json',
    name: 'convert-csv-json',
    component: () => import('../pages/CSV_JSON.vue')
  },
  {
    path: '/perfil-generator',
    name: 'perfil-generator',
    component: () => import('../pages/PerfilGenerator.vue')
  },
  {
    path: '/elevator',
    name: 'elevator',
    component: () => import('../pages/Elevator.vue')
  },
  {
    path: '/first-db',
    name: 'first-db',
    component: () => import('../pages/DB')
  },
  {
    path: '/bash',
    name: 'bash',
    component: () => import('../pages/Bash')
  },
  {
    path: '/cdi-simulator',
    name: 'cdi-simulator',
    component: () => import('../pages/CDI')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
