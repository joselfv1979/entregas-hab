<!-- COMPONENTE ESTÁTICO QUE CONTIENE EL MENU DE NAVEGACIÓN --> 
<template>
  <div>
      <div id="nav">
      <!-- MENÚ DE NAVEGACIÓN CON LAS RUTAS DE CADA VISTA DECLARADAS EN ROUTER/INDEX.JS-->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/artist">Artists</router-link> |
      <router-link to="/track">Tracks</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "Menu" // EXPORTACIÓN DEL COMPONENTE
}
</script>

<style scoped>

#nav {
  flex: 1;
  box-sizing: content-box;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>