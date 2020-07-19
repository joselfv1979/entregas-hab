<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMusic | TopArtist" />
    <!-- DECLARACIÓN DEL COMPONENTE PARA MOSTRAR LOS ARTISTAS -->
    <artistcard :artists="artists" />
  </div>
</template>

<script>
// IMPORTANDO LA API
import api from "@/api/index.js";
// IMPORTANDO MI COMPONENTE DE ARTISTAS
import artistcard from "@/components/ArtistCard.vue";

export default {
  name: "TopArtists",
  components: {
    artistcard
  },
  data() {
    return {
      artists: [] // ARRAY DE ARTISTAS QUE RECIBE LA VISTA
    };
  },
  created() {
    api  // LLAMADA A LA PETICIÓN A LA API
      .getArtist()
      .then(response => (this.artists = response.data.topartists.artist));
  }
};
</script>

<style scoped>
</style>