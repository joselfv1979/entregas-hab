<!-- VISTA QUE CONTIENE EL FORMULARIO PARA REGISTRAR UN ESPACIO NUEVO-->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Espacios" />
    <h3>Crea tu nuevo espacio</h3>
    <div class="form">
      <div class="filter">
        <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
        <div class="data">
          <input type="text" v-model="hotel" class="field" placeholder="Nombre del hotel" />
          <br />
          <input type="text" v-model="city" class="field" placeholder="Ciudad" />
          <br />
          <input type="text" v-model="address" class="field" placeholder="Dirección" />
          <br />
          <input type="text" v-model="name" class="field" placeholder="Nombre del espacio" />
          <br />
          <input type="number" v-model="price" class="field" placeholder="Precio por hora" />
        </div>
        <br />
        <div class="group">
          <div class="options">
            <h4>Disposición</h4>
            <label for="uLayout">
              <input type="checkbox" v-model="uLayout" true-value="1"
  false-value="0"/>En U
            </label>
            <br />
            <label for="classLayout">
              <input type="checkbox" v-model="classLayout" />En escuela
            </label>
            <br />
            <label for="theaterLayout">
              <input type="checkbox" v-model="theaterLayout" />En teatro
            </label>
          </div>
          <div class="options">
            <h4>Tipo</h4>
            <label for="meetingType">
              <input type="checkbox" v-model="meetingType" />Reuniones
            </label>
            <br />
            <label for="hallType">
              <input type="checkbox" v-model="hallType" />Eventos
            </label>
          </div>
        </div>
        <div class="group">
          <div class="options">
            <h4>Apertura</h4>
            <input type="time" v-model="openTime" />
            <h4>Cierre</h4>
            <input type="time" v-model="closeTime" />
          </div>
          <div class="options">
            <h4>Equipamiento</h4>
            <br />
            <label for="furniture">
              <input type="checkbox" v-model="furniture" />Muebles
            </label>
            <br />
            <label for="wifi">
              <input type="checkbox" v-model="wifi" />WI-FI
            </label>
            <br />
            <label for="projector">
              <input type="checkbox" v-model="projector" />Proyector
            </label>
            <br />
            <label for="screen">
              <input type="checkbox" v-model="screen" />Pantalla
            </label>
          </div>
        </div>
        <br />
        <div class="data">
          <input type="text" v-model="image1" class="field" placeholder="Imagen 1 (URL)" />
          <br />
          <input type="text" v-model="image2" class="field" placeholder="Imagen 2 (URL)" />
          <br />
          <label for>Descripción de la sala</label>
          <br />
          <textarea v-model="description" class="field" rows="5" cols="30">Descripción del espacio</textarea>
          <p class="center">
            <!-- BOTÓN PARA ENVIAR LOS DATOS -->
            <input class="button" @click="addSpace()" type="button" value="Enviar Datos" />
            <input class="button" @click="cancel()" type="button" value="Cancelar" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTACIÓN DE FUNCIONES Y LIBRERÍAS EXTERNAS
import axios from "axios";
import Swal from "sweetalert2";
import { getId, getAuthToken } from "./../../../backend/utils/user";
import { validateSpace } from "./../../../backend/utils/space";

export default {
  name: "AddSpace",
  components: {},
  data() {
    return {
      hotel: "", // VARIABLES DE LA VISTA
      city: "",
      address: "",
      name: "",
      price: "",
      openTime: "",
      closeTime: "",
      uLayout: 0,
      classLayout: 0,
      theaterLayout: 0,
      meetingType: 0,
      hallType: 0,
      furniture: 0,
      wifi: 0,
      projector: 0,
      screen: 0,
      image1: "",
      image2: "",
      description: "",
    };
  },
  methods: {
    // FUNCIÓN PARA CREAR UN ESPACIO NUEVO
    async addSpace() {
      var self = this;
      let userId = getId();
      let token = getAuthToken();
      let open = this.openTime.slice(0, 2);
      let close = this.closeTime.slice(0, 2);
      let space = {
        hotel: this.hotel,
        city: this.city,
        address: this.address,
        name: this.name,
        price: this.price,
        open,
        close,
        uLayout: this.uLayout,
        classLayout: this.classLayout,
        theaterLayout: this.theaterLayout,
        meetingType: this.meetingType,
        hallType: this.hallType,
        furniture: this.furniture,
        wifi: this.wifi,
        projector: this.projector,
        screen: this.screen,
        image1: this.image1,
        image2: this.image2,
        description: this.description,
      };
      if (await validateSpace(token, userId, space)) {
        Swal.fire("Espacio creado");
        this.hotel = "";
        this.name = "";
        this.city = "";
        this.address = "";
        this.price = "";
        this.openTime = "";
        this.closeTime = "";
        this.uLayout = "";
        this.classLayout = "";
        this.theaterLayout = "";
        this.meetingType = "";
        this.hallType = "";
        this.furniture = "";
        this.wifi = "";
        this.projector = "";
        this.screen = "";
        this.image1 = "";
        this.image2 = "";
        this.description = "";
      }
    },
    // REDIRECCIÓN AL ÁREA PERSONAL
    cancel() {
      this.$router.push("/users");
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
}

.filter {
  width: 500px;
  text-align: justify;
  border: 2px solid #3b83bd;
}

.group {
  padding-top: 15px;
  height: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.data {
  text-align: center;
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

button {
  width: 100px;
}
</style>