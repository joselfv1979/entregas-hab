<!-- COMPONENTE ESTÁTICO QUE CONTIENE EL MENU DE NAVEGACIÓN --> 
<template>
  <div class="menu">
    <div id="nav">
      <!-- MENÚ DE NAVEGACIÓN CON LAS RUTAS DE CADA VISTA DECLARADAS EN ROUTER/INDEX.JS. LINKS DINÁMICOS-->
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Space' }"></router-link>
      <router-link :to="{ name: 'Book' }"></router-link>
      <router-link :to="{ name: 'User' }">Área Personal</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <router-link :to="{ name: 'Register' }">Register</router-link>
      <span id="logout" v-show="logged" @click="logout()"> | Logout</span>
    </div>
      <span id="name" v-show="logged">Bienvenido, {{ username }}</span><br>
      <!-- BOTÓN PARA DESLOGUEARSE -->
  </div>
</template>

<script>
import { logout, getRole } from "./../../../backend/utils/user";

export default {
  name: "MenuCustom",
  props: {
    username: String,
    logged: Boolean
  },

  methods: {
    logout(){
      this.$emit('logout')
    }
  },
};
</script>

<style scoped>
.menu {
  background-color: #3b83bd;
  width: 100%;
  height: 100px;
  align-self: flex-start;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

span {
  font-weight: bold;
}

#logout {
  cursor: pointer;
}
</style>