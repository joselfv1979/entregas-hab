<!-- VISTA HOME, ES LA PÁGINA QUE SE MUESTRA POR DEFECTO -->
<template>
  <div class="home">
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMusic | Home" />
    <!-- BOTÓN QUE LLAMA A UNA FUNCIÓN AL APRETARLO -->
    <button @click="sweetalertOn()">
      HACKAMUSIC
    </button>
    <!-- DECLARACIÓN DEL COMPONENTE PARA MOSTRAR LOS TAGS -->
    <tagcard :tags="tags" />
  </div>
</template>

<script>
// IMPORTANDO LA API
import api from "@/api/index.js";
// IMPORTANDO MI COMPONENTE DE TAGS
import tagcard from "@/components/TagCard.vue";
// IMPORTANDO MI COMPONENTE SWEETALERT PARA CREAR ALERTAS PERSONALIZADAS
import Swal from 'sweetalert2'

// @ is an alias to /src

export default {
  name: "Home", // EXPORTACIÓN DE LA VISTA Y SUS COMPONENTES
  components: {
    tagcard 
  },
  data() {
    return {
      tags: [] // ARRAY DE TAGS QUE RECIBE LA VISTA
    };
  },
    methods: {
    sweetalertOn(){ // FUNCIÓN QUE MUESTRA UN ALERT
      Swal.fire({
        title: 'Bienvenido',
        text: 'Web sobre música con los artistas, canciones y géneros más escuchados del momento',
        confirmButtonText: 'OK'
      })
    }
  },
  created() { // LLAMADA A LA PETICIÓN A LA API
    api.getTopTags().then(response => (this.tags = response.data.tags.tag));
  }
};
</script>

<style scoped>

button {
  width: 150px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  background-color: #2c3e50;
  color: #42b983;
  border-radius: 12px;
  cursor: pointer;
}

</style>
