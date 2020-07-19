<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMusic | TopTracks" />
    <!-- DECLARACIÓN DEL COMPONENTE PARA MOSTRAR LAS CANCIONES -->
    <trackcard :tracks="tracks" />
  </div>
</template>

<script>
// IMPORTANDO LA API
import api from "@/api/index.js";
// IMPORTANDO MI COMPONENTE DE ARTISTAS
import trackcard from "@/components/TrackCard.vue";

export default {
  name: "TopTracks", // EXPORTACIÓN DE LA VISTA Y SUS COMPONENTES
  components: {
      trackcard
  }, 
  data() {
    return {
      tracks: [] // ARRAY DE CANCIONES QUE RECIBE LA VISTA
    };
  },
  created() {
    api  // LLAMADA A LA PETICIÓN A LA API
      .getTopTracks()
      .then(response => (this.tracks = response.data.tracks.track));
  }
};
</script>

<style scoped>
</style>