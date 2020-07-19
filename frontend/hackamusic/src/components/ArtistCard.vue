<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE ARTISTAS Y LOS MUESTRA EN UNA TABLA -->
<template>
  <div class="artists">   
    <!-- V-MODEL: PARA ENLAZAR DEL INPUT CON LOS DATOS A MOSTRAR-->
    <input type="search" v-model="search" placeholder="Busca por nombre"> 
    <table>
      <caption><h2>TOP ARTISTS</h2></caption>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Listeners</th>
        <th>Streamable</th>       
        <th>Url</th>
      </tr> 
      <!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO-->
      <tr v-for="artist in filtered" :key="artist.id">
        <!-- V-BIND: PARA ENLAZAR LA RUTA DE LA IMAGEN -->
        <img :src="artist.image[2]['#text']">
        <td>{{ artist.name }}</td>
        <td>{{ artist.listeners }}</td>
        <td>{{ artist.streamable }}</td>
        <!-- V-BIND: PARA ENLAZAR LA URL DEL ARTISTA -->
        <td><a :href="artist.url">{{ artist.url }}</a></td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "ArtistCard", // EXPORTACIÓN DEL COMPONENTE
  props: {
    artists: Array // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  },
  data(){
    return {
      search: '' // VARIABLE QUE VA A RECIBIR EL VALOR DEL INPUT
    }
  },
  computed: {
    filtered(){ // FUNCIÓN PARA FILTRAR POR EL VALOR DEL INPUT
      if(!this.search){
        return this.artists
      }
      return this.artists.filter( item => 
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
};
</script>

<style scoped>

input {
  height: 25px;
  background-color: #42b983;
  border-radius: 5px;
}
a {
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  border-bottom: 1px solid;     
  background: #42b983;
}

.artists table {
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

table th:nth-child(5) {
  text-align: left;
}

table td:nth-child(5) {
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