<!-- VISTA DE INICIO DE LA APLICACIÓN CON BUSCADOR DE ESPACIOS -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Inicio" />
    <div id="first">
      <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
      <input type="search" v-model="city" placeholder="Busca por ciudad" />
      <br />
      <input type="search" v-model="hotel" placeholder="Busca por hotel" />
      <br />
      <!-- BOTÓN PARA REALIZAR LA BÚSQUEDA -->
      <button @click="buscar()">Buscar</button>
      <br />
      <!-- BOTÓN PARA MOSTRAR LOS FILTROS DE BÚSQUEDA -->
      <button @click="seeFilter =! seeFilter">Filtros</button>
      <br />
    </div>
    <!-- ELEMENTO QUE CONTIENE LOS FILTROS DE BÚSQUEDA -->
    <div class="form">
      <div v-show="seeFilter" class="filter">
        <div class="meet">
          <div id="date">
            <label><h4>Fecha</h4></label>
             <input class="date" type="date" v-model="date" />
          </div>
          <div id="hour">
            <label><h4>Entrada</h4></label>
          <input class="time" type="time" v-model="startTime" />
          <label><h4>Salida</h4></label>
          <input class="time" type="time" v-model="endTime" />
          </div>
        </div>
        <div class="group">
          <div class="options">
            <label>
              <h4 class="check">Tipo</h4>
            </label>
            <label>
              <input type="radio" v-model="type" name="type" value="2" />Reuniones
            </label>
            <br />
            <label for="hallType">
              <input type="radio" v-model="type" name="type" value="1" />Eventos
            </label>
          </div>
          <div class="options">
            <label>
              <h4 class="check">Disposición</h4>
            </label>
            <label for="uLayout">
              <input type="radio" v-model="layout" value="1" />En U
            </label>
            <br />
            <label for="classLayout">
              <input type="radio" v-model="layout" value="2" />En escuela
            </label>
            <br />
            <label for="theaterLayout">
              <input type="radio" v-model="layout" value="3" checked />En teatro
            </label>
          </div>
        </div>
        <div class="group">
          <div class="options">
            <label for>
              <h4 class="check">Equipamiento</h4>
            </label>
            <label for="furniture">
              <input type="checkbox" v-model="furniture" value="1" />Muebles
            </label>
            <br />
            <label for="wifi">
              <input type="checkbox" v-model="wifi" value="2" />WI-FI
            </label>
            <br />
            <label for="projector">
              <input type="checkbox" v-model="projector" value="3" />Proyector
            </label>
            <br />
            <label for="screen">
              <input type="checkbox" v-model="screen" value="4" />Pantalla
            </label>
          </div>
          <div class="options">
            <label for>
              <h4 class="check">Precio</h4>
            </label>
            <input id="price" type="number" v-model="price" placeholder="Precio máximo" />
          </div>
        </div>
      </div>
    </div>
    <!-- DECLARACIÓN DEL COMPONENTE QUE MUESTRA LOS ESPACIOS-->
    <spacelist :spaces="spaces" v-on:mostrar="mostrarInfo" />
  </div>
</template>

<script>
// IMPORTACIÓN DE COMPONENTES, FUNCIONES Y LIBRERÍAS EXTERNAS
import axios from "axios";
import Swal from "sweetalert2";
import {
  getFilteredSpaces,
  getSpaceById,
  setSpace,
  setSpaceId,
  removeSpaceId,
} from "./../../../backend/utils/space";
import { getAuthToken } from "./../../../backend/utils/user";
import spacelist from "@/components/SpaceList.vue";

export default {
  name: "Home",
  components: {
    // REGISTRO DE COMPONENTES
    spacelist,
  },
  data() {
    // VARIABLES DE LA VISTA
    return {
      seeFilter: false,
      spaces: [],
      city: "",
      hotel: "",
      date: "",
      startTime: "",
      endTime: "",
      price: "",
      type: "",
      layout: "",
      furniture: "",
      wifi: "",
      projector: "",
      screen: "",
    };
  },
  methods: {
    // LLAMADA A LA FUNCIÓN PARA OBTENER LOS ESPACIOS
    buscar() {
      this.getSpaces();
    },
    // FUNCIÓN PARA CONSEGUIR LOS ESPACIOS FILTRADOS
    async getSpaces() {
      let parameters = "";
      let count = 0;
      if (this.city) {
        parameters += "?city=" + this.city;
        count++;
      }
      if (this.hotel) {
        if (count === 0) parameters += "?hotel=" + this.hotel;
        else parameters += "&hotel=" + this.hotel;
        count++;
      }
      if (this.date) {
        console.log(this.date);
        console.log(typeof this.date);
      }
      if (this.startTime) {
        let start = this.startTime.slice(0, 2);
        if (count === 0) parameters += "?startTime=" + start;
        else parameters += "&startTime=" + start;
        count++;
      }
      if (this.endTime) {
        let end = this.endTime.slice(0, 2);
        if (count === 0) parameters += "?endTime=" + end;
        else parameters += "&endTime=" + end;
        count++;
      }

      if (this.price) {
        if (count === 0) parameters += "?price=" + this.price;
        else parameters += "&price=" + this.price;
        count++;
      }
      if (this.type) {
        if (count === 0) parameters += "?type=" + this.type;
        else parameters += "&type=" + this.type;
        count++;
      }
      if (this.layout) {
        if (count === 0) parameters += "?layout=" + this.layout;
        else parameters += "&layout=" + this.layout;
        count++;
      }
      if (this.furniture) {
        if (count === 0) parameters += "?furniture=1";
        else parameters += "&furniture=1";
        count++;
      }
      if (this.wifi) {
        if (count === 0) parameters += "?wifi=1";
        else parameters += "&wifi=1";
        count++;
      }
      if (this.projector) {
        if (count === 0) parameters += "?projector=1";
        else parameters += "&projector=1";
        count++;
      }
      if (this.screen) {
        if (count === 0) parameters += "?screen=1";
        else parameters += "&screen=1";
        count++;
      }

      const response = await getFilteredSpaces(parameters);
      this.spaces = response.data;
    },

    // FUNCIÓN QUE OBTIENE UN ESPACIO DETERMINADO POR SU ID
    async mostrarInfo(spaceId) {
      const response = await getSpaceById(spaceId);
      setSpaceId(spaceId);
      let space = response.data[0];
      setSpace(space);
      this.$router.push("/spaces");
    },
  },
};
</script>

<style scoped>
.meet {
  text-align: center;
  padding-top: 20px;
}

.form {
  display: flex;
  justify-content: center;
}

.group {
  padding-top: 15px;
  height: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.options {
  padding-top: 10px;
  padding-left: 20px;
  border-top: 2px solid #3b83bd;
  display: inline-block;
  width: 200px;
  height: 120px;
  text-align: justify;
}

.filter {
  width: 500px;
  text-align: justify;
  border: 2px solid #3b83bd;
}

#first {
  height: 600px;
  background-image: url("./../assets/sala.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

input {
  border: 2px solid #3b83bd;
}

.check {
  padding-bottom: 10px;
  padding-left: 23px;
}

#price {
  width: 110px;
}
</style>
