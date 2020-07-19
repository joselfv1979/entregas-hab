<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE CANCIONES Y LOS MUESTRA EN UNA TABLA -->
<template>
  <div class="tracks">    
    <table>
      <caption><h2>TOP TRACKS</h2></caption>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Artist</th>
        <th>Duration</th>
        <th>Listeners</th>
        <th>Url</th>
      </tr>
      <!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO-->
      <tr v-for="track in tracks" :key="track.id">
        <!-- V-BIND: PARA ENLAZAR LA RUTA DE LA IMAGEN -->
        <img :src="track.image[2]['#text']">
        <td>{{ track.name }}</td>
        <td>{{ track.artist.name }}</td>
        <td>{{ track.duration }}</td>
        <td>{{ track.listeners }}</td>
        <!-- V-BIND: PARA ENLAZAR LA URL DEL CANCIÓN -->
        <td><a :href="track.url">{{ track.url }}</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TrackCard", // EXPORTACIÓN DEL COMPONENTE
  props: {
    tracks: Array // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  },
}
</script>

<style scoped>

a{
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  border-bottom: 1px solid;     
  background: #42b983;
}

.tracks table {
  margin: 0 auto;
}

table {
   width: 70%;
   font-size: 0.8em;
}

table th:nth-child(2) {
  text-align: left;
}

table td:nth-child(2) {
  text-align: left;
}

table th:nth-child(3) {
  text-align: left;
}

table td:nth-child(3) {
  text-align: left;
}
table th:nth-child(6) {
  text-align: left;
}

table td:nth-child(6) {
  text-align: left;
}

th, td {
   width: 15%;
   padding: 5px 10px;
   white-space: nowrap;
   text-align: center; 
}

th {
  font-size: 1.2em;
}

caption {
  margin: 30px;
}

img {
  width: 15px;
  height: 15px;
}

</style>