<!-- VISTA QUE MUESTRA INFORMACIÓN DETALLADA DE CADA ESPACIO -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Espacios" />
    <div>
      <!-- DECLARACIÓN DEL COMPONENTE QUE MUESTRA LA FICHA DE UN ESPACIO --> 
      <spacedetail :space="space" />
      <!-- BOTÓN PARA REGRESAR A LA VISTA ANTERIOR -->
      <button @click="back()">Volver</button>
      <!-- BOTÓN PARA RESERVAR -->
      <button @click="book()">Reservar</button>
      <!-- BOTÓN PARA VER LAS VALORACIONES -->
      <button @click="getScores()">Ver valoraciones</button>
      <!-- DECLARACIÓN DEL COMPONENTE QUE MUESTRA LAS VALORACIONES--> 
      <scorelist v-show="seeScores" :scores="scores" />
      <p v-show="noScores">No existen valoraciones</p>
    </div>
  </div>
</template>

<script>
// IMPORTACIÓN DE COMPONENTES, FUNCIONES Y LIBRERÍAS EXTERNAS
import Swal from "sweetalert2";
import moment from 'moment';
import {
  getSpace, getSpaceId, listScores, removeSpaceId, removeSpace } from "./../../../backend/utils/space";
import { getAuthToken } from "./../../../backend/utils/user";
import spacedetail from "@/components/SpaceDetail.vue";
import scorelist from "@/components/ScoresList.vue";

export default {
  name: "Space",
  components: { // REGISTRO DE COMPONENTES
    spacedetail,
    scorelist
  },
  data() { // VARIABLES DE LA VISTA
    return {
      space: {},
      scores: [],
      seeScores: false,
      noScores: false
    };
  },
  methods: {
    // FUNCIÓN QUE OBTIENE EL ESPACIO SOLICITADO
    getDetailSpace() {
      this.space = getSpace();
    },
    // FUNCIÓN QUE RECUPERA LAS VALORACIONES DE UN ESPACIO Y DESCUBRE EL COMPONENTE QUE LAS MUESTRA
    async getScores() {
      let id = getSpaceId()
      let result = await listScores(id)
      if(result.data.length > 0) {
        this.scores = (result.data).map(item => {
          item.bookDate = moment(item.book_Date).utcOffset(120).format('DD-MM-YYYY')
          return {
            user: item.user,
            rating: item.rating,
            review: item.review,
            scoreDate: item.bookDate
          }
        })
        
        this.seeScores = true
      } else {
        this.noScores = true
      }      
    },

    // FUNCIÓN QUE COMPRUEBA LA AUTENTICACIÓN Y REDIRIGE AL USUARIO A LA VISTA DE RESERVA NUEVA O AL LOGIN
    book() {
      if (getAuthToken()) {
        this.$router.push("/add-books");
      } else {
        Swal.fire({
          text: "Tienes que loguearte",
          onClose: this.goLogin()
        });        
      }
    },

    // REDIRECCIÓN AL LOGIN
    goLogin(){
      removeSpaceId();
      removeSpace();
      this.$router.push("/login");
    },

    // REDIRECCIÓN AL HOME 
    back() {
      removeSpaceId();
      removeSpace();
      this.$router.push("/");
    },
  },

  // CARGAMOS EL ESPACIO AL INICIAR LA VISTA
  created() {
    this.getDetailSpace()
  }
  
};
</script>

<style scoped>

</style>