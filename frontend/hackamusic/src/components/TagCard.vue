<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE CANCIONES Y LOS MUESTRA EN UNA TABLA -->
<template>
  <div class="tags">   
    <table>
      <caption><h2>TOP TAGS</h2></caption>
      <tr>
        <th>Name</th>
        <th>Streamable</th>
        <th>Reach</th>
        <th>Taggings</th>
        <th>Url</th>
      </tr>
      <!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO-->
      <tr v-for="tag in tags" :key="tag.id">
        <td>{{ tag.name }}</td>
        <td>{{ tag.streamable }}</td>
        <td>{{ tag.reach }}</td>
        <td>{{ tag.taggings }}</td>
        <!-- V-BIND: PARA ENLAZAR LA URL DEL TAG -->
        <td><a :href="tag.url">{{ tag.url }}</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TagCard", // EXPORTACIÓN DEL COMPONENTE
  props: {
    tags: Array // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  }
};
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

.tags table {
  margin: 0 auto;
}

table {
   width: 70%;
   font-size: 0.8em;
}

table th:nth-child(1) {
  text-align: left;
}

table td:nth-child(1) {
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
   text-align: center;
   padding: 5px 10px;
}

th {
  font-size: 1.2em;
}

caption {
  margin: 30px;
}

</style>