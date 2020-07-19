<template>
  <div id="app">  <!-- DECLARACIÓN DE LOS COMPONENTE PARA MOSTRAR LAS VISTAS Y COMPONENTES -->
    <menucustom/>  
    <router-view/>
    <footercustom/>
  </div>
</template>

<script> // IMPORTACIÓN DE COMPONENTES
  import menucustom from '@/components/MenuCustom.vue';
  import footercustom from '@/components/FooterCustom.vue';

  export default {
  name: 'App',
  // EXPORTACION DE LA PÁGINA PRINCIPAL Y SUS COMPONENTES
  components: {
     menucustom,
     footercustom
  }
}
</script>

<style>

*{
  margin: 0;
  padding :0;  
}

#app {
  background-color: #497e76;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  flex-direction: column;
}

</style>
