<template>
  <div id="app"> <!-- DECLARACIÓN DE LOS COMPONENTES PARA MOSTRAR LAS VISTAS Y COMPONENTES -->
    <menucustom />
    <router-view/>
    <footercustom />
  </div>
</template>

<script> // IMPORTACIÓN DE COMPONENTES
import menucustom from '@/components/MenuCustom.vue'
import footercustom from '@/components/FooterCustom.vue'
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
  padding: 0;  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: .9rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
}

#menu {
  width: 100%;
  align-self: flex-start;
  background-color: lightcoral;
}

#foot{
  background-color: lightcoral;
  width:100%;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  align-self: flex-end;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: crimson;
}

h1 {
  margin-top: 20px;
}

button {
  border-radius: 15px;
  background: crimson;
  color: wheat;
  padding: 0.5rem;
  margin: 1.2rem;
  border: none;
  display: inline-block;
  transition: all .4s;
}

button:hover {
  cursor: pointer;
  transform: translateY(-6px);
}

img {
  margin-top: 20px;
  width: 150px;
  height: 100px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
}

ul li {
  border: 2px solid crimson;
  border-radius: 15px;
  margin: 0.667rem;
  list-style: none;
}

ul li p {
  display: inline-block;
  padding: 0.667rem;
}

input {
  padding: 0.3rem;
  margin: 0.3rem;
  border: none;
  border-bottom: 2px solid crimson;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-left: 2px solid transparent;
  transition: all .4s;
}

input:hover {
  border: 2px solid crimson;
  cursor: pointer;
}

.box {
  display: flex;
}

</style>
