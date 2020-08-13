<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE RESERVAS Y LOS MUESTRA EN UNA LISTA -->
<template>
  <div>
    <h1>Lista de reservas:</h1>
    <ul> <!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO -->
      <li v-for="(book, index) in books" :key="book.id">
        <p>{{ book.hotel }}</p>
        <br />
        <p>{{ book.end }}</p> <br>
        <p><span :class=" { green: book.status === 'Reserva pendiente'}">{{ book.status }}</span></p> <br>
         <!-- BOTÓN QUE LLAMA A LA FUNCIÓN PARA ENVIAR EL ÍNDICE DE LA RESERVA Y LANZA EL EVENTO DE VALORAR -->
        <button @click="enviarIndiceReserva(index)" :class=" { hidden: book.status === 'Reserva pendiente'}">Valorar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookList", // EXPORTACIÓN DEL COMPONENTE
  props: {
    books: Array, // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  },
  data() {
    return {

    };
  },
  methods: { // FUNCIÓN QUE LANZA UN EVENTO Y ACTIVA UNA FUNCIONES EN LA VISTA, ENVIÁNDOLE UN ÍNDICE COMO PARÁMETRO 
    enviarIndiceReserva(index) {
        let indiceReserva = this.books[index].id
        this.$emit('valorar', indiceReserva)
    },
  },

};
</script>

<style scoped>
.hidden {
  display: none;
}

.green {
  color: greenyellow;
}
</style>