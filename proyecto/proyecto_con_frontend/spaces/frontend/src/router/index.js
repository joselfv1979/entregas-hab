import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isLoggedIn } from "./../../../backend/utils/user";

Vue.use(VueRouter)
  // ARRAY CON LAS RUTAS A LAS VISTAS DEL PROYECTO
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { // RUTA ABIERTA A TODOS LOS USUARIOS
        allowAnon: true
      }
    },
    {
      path: '/about',
      name: 'About', // RUTA ABIERTA A TODOS LOS USUARIOS
      component: () => import('../views/About.vue'),
      meta: {
        allowAnon: true
      }
    },
    {
      path: '/add-spaces',
      name: 'AddSpace', // RUTA RESTRINIDA A LOS USUARIOS AUTENTICADOS
      component: () => import('../views/AddSpace.vue'),
      meta: {
        allowAnon: false
      }
    },
    {
      path: '/spaces',
      name: 'Space', // RUTA ABIERTA A TODOS LOS USUARIOS
      component: () => import('../views/Space.vue'),
      meta: {
        allowAnon: true
      }
    },
    {
      path: '/books',
      name: 'Book', // RUTA RESTRINIDA A LOS USUARIOS AUTENTICADOS
      component: () => import('../views/Book.vue'),
      meta: {
        allowAnon: false
      }
    },
    {
      path: '/add-books',
      name: 'AddBook', // RUTA RESTRINIDA A LOS USUARIOS AUTENTICADOS
      component: () => import('../views/AddBook.vue'),
      meta: {
        allowAnon: false
      }
    },
    {
      path: '/users',
      name: 'User', // RUTA RESTRINIDA A LOS USUARIOS AUTENTICADOS
      component: () => import('../views/User.vue'),
      meta: {
        allowAnon: false
      }
    },
    {
      path: '/register',
      name: 'Register', // RUTA ABIERTA A TODOS LOS USUARIOS
      component: () => import('../views/Register.vue'),
      meta: {
        allowAnon: true
      }
    },
    {
      path: '/login', // RUTA ABIERTA A TODOS LOS USUARIOS
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        allowAnon: true
      }
    },
    {
      path: '/update-user',
      name: 'UpdateUser', // RUTA RESTRINIDA A LOS USUARIOS AUTENTICADOS
      component: () => import('../views/UpdateUser.vue'),
      meta: {
        allowAnon: false
      }
    },
    {
      path: '*',
      name: 'Error',
      component: () => import('../views/Error.vue'),
      meta: {
        allowAnon: true
      }
    }
]

const router = new VueRouter({
  routes
})
// FUNCIÓN DE COMPROBACIÓN DE RESTRICCIÓN DE RUTA Y AUTENTICACIÓN DE USUARIO
router.beforeEach((to, from, next) => {
  if(!to.meta.allowAnon && !isLoggedIn()){
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
