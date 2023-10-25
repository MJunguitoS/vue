import Vue from 'vue'
import VueRouter from 'vue-router'
import Artistas from '../views/Artistas.vue'
import Discos from '../views/Discos.vue'
import Axios from '../views/Axios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Artistas',
    component: Artistas
  },
  {
    path: '/discos',
    name: 'Discos',
    component: Discos
  },
  {
    path: '/axios',
    name: 'API Axios',
    component: Axios
  }
]

const router = new VueRouter({
  routes
})

export default router
