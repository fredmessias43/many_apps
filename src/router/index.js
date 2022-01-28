import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'base',
    meta: {
      label: "Base"
    },
    component: () => import('../pages/Test.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      label: "Search users"
    },
    component: () => import('../pages/Search.vue')
  },
  {
    path: '/json-csv',
    name: 'convert-json-csv',
    meta: {
      label: "JSON converter to CSV"
    },
    component: () => import('../pages/JSON_CSV.vue')
  },
  {
    path: '/csv-json',
    name: 'convert-csv-json',
    meta: {
      label: "CSV converter to JSON"
    },
    component: () => import('../pages/CSV_JSON.vue')
  },
  {
    path: '/perfil-generator',
    name: 'perfil-generator',
    meta: {
      label: "Perfil Generator"
    },
    component: () => import('../pages/PerfilGenerator.vue')
  },
  {
    path: '/elevator',
    name: 'elevator',
    meta: {
      label: "Elevator"
    },
    component: () => import('../pages/Elevator.vue')
  },
  // {
  //   path: '/first-db',
  //   name: 'first-db',
  //   component: () => import('../pages/DB')
  // },
  // {
  //   path: '/bash',
  //   name: 'bash',
  //   component: () => import('../pages/Bash')
  // },
  {
    path: '/cdi-simulator',
    name: 'cdi-simulator',
    meta: {
      label: "CDI simulator"
    },
    component: () => import('../pages/CDI')
  },
  {
    path: '/grid',
    name: 'grid',
    meta: {
      label: "Grid Areas"
    },
    component: () => import('../pages/Grid')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
