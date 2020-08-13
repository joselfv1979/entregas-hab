<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE VALORACIONES Y LOS MUESTRA EN UNA LISTA -->
<template>
  <div>
      <ul><!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO -->
          <li v-for="score in scores" :key="score.id">
              <p>Fecha: {{ score.scoreDate }}</p><br>
              <p>Usuario: {{ score.user }}</p><br>
              <p>Puntuación: {{ score.rating }}</p><br>
              <p>Reseña: {{ score.review }}</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'ScoresList', // EXPORTACIÓN DEL COMPONENTE
    props: { // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
        scores: Array
    }
}
</script>

<style scoped>

</style>