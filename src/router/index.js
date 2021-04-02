import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/Search.vue')
  },
  {
    path: '/json-csv',
    name: 'Convert',
    component: () => import('../pages/JSON_CSV.vue')
  },
  {
    path: '/csv-json',
    name: 'Convert',
    component: () => import('../pages/CSV_JSON.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
