<!-- COMPONENTE ESTÁTICO QUE CONTIENE EL MENU DE NAVEGACIÓN --> 
<template>
  <div id="menu">
    <div id="nav">
      <!-- MENÚ DE NAVEGACIÓN CON LAS RUTAS DE CADA VISTA DECLARADAS EN ROUTER/INDEX.JS. LINKS DINÁMICOS-->
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Clients' }">Clientes</router-link> |
      <router-link :to="{ name: 'Register' }">Registro</router-link> |
      <router-link :to="{ name: 'Products' }">Productos</router-link> |
      <router-link :to="{ name: 'AddProduct' }">Nuevo Producto</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> 
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom", // EXPORTACIÓN DEL COMPONENTE
};
</script>

<style scoped>

</style>