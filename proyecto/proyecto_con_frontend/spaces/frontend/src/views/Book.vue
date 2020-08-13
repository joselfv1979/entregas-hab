<!-- VISTA QUE MUESTRA INFORMACIÓN DETALLADA DE CADA RESERVA -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Reservas" />
    <!-- DECLARACIÓN DEL COMPONENTE QUE MUESTRA LAS RESERVAS -->
    <booklist v-on:valorar="getIndex" :books="books" />
    <!-- MODAL PARA REALIZAR LA VALORACIÓN DE UNA RESERVA --> 
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Añade tu valoración:</h3>
        <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
        <input type="number" placeholder="Puntuación de 1-5" v-model="score" />
        <br />
        <input type="text" placeholder="Añade un comentario" v-model="comment" />
        <br />
        <!-- BOTÓN PARA CANCELAR LA OPERACIÓN Y OCULTAR EL MODAL --> 
        <button @click="seeModal =! seeModal">Cancelar</button>
        <!-- BOTÓN PARA ENVIAR LA VALORACIÓN --> 
        <button @click="enviar()">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTACIÓN DE COMPONENTES, FUNCIONES Y LIBRERÍAS EXTERNAS
import axios from "axios";
import moment from 'moment';
import { getBooks, addScore } from "./../../../backend/utils/book";
import { getAuthToken } from "./../../../backend/utils/user";
import booklist from "@/components/BookList.vue";

export default {
  name: "Book",
  components: {
    // REGISTRO DE COMPONENTES
    booklist,
  },
  data() {
    // VARIABLES DE LA VISTA
    return {
      books: [],
      score: "",
      comment: "",
      seeModal: false,
      bookIndex: "",
    };
  },
  methods: {
    // FUNCIÓN PARA OBTENER EL ÍNDICE DE UNA RESERVA Y MOSTRAR EL MODAL
    getIndex(index) {
      this.seeModal = true;
      this.bookIndex = index;
    },
    // FUNCIÓN QUE OBTIENE LAS RESERVAS DE UN USUARIO
    async getUserBooks() {
      let token = getAuthToken();
      const result = await getBooks(token);
      const now = moment().format('YYYY-MM-DD')
      this.books = (result.data).map(item => {
        item.bookEnd = moment(item.end_time).utcOffset(120).format('DD-MM-YYYY')
        item.end = moment(item.end_time).utcOffset(120).format('YYYY-MM-DD')
        if(moment(item.end).isBefore(now)){
          item.status = 'Reserva consumida'
        } else { item.status = 'Reserva pendiente' }
        return {
          end: item.bookEnd, 
          hotel: item.hotel,
          status: item.status
          }
      })
    },
    // FUNCIÓN PARA ENVIAR LA VALORACIÓN
    async enviar() {
      let token = getAuthToken();
      await addScore(token, this.bookIndex, this.score, this.comment);
      this.seeModal = false;
    },
  },
  created() { // CARGA DE LAS RESERVAS DE UN USUARIO AL CREAR LA VISTA
    this.getUserBooks();
  },
};
</script>

<style scoped>
#main {
  height: 70vh;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: aquamarine; */
}
</style>