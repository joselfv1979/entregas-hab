import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// ARRAY CON LAS RUTAS A LAS VISTAS DEL PROYECTO
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
  {
    path: '/artist',
    name: 'Artist',
    component: () => import('../views/TopArtists.vue')
  },
  {
    path: '/track',
    name: 'Track',
    component: () => import('../views/TopTracks.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
