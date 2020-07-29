<!-- VISTA REGISTER, ES LA PÁGINA DE REGISTRO DE NUEVOS CLIENTES -->
<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMarket | Registro" />
    <div class="register">
      <h1>Registro</h1>
      <!-- INPUTS CON LOS CAMPOS DE REGISTRO ENLAZADOS CON V-MODEL AL DATA -->
      <input type="text" v-model="nombre" placeholder="Enter your name" />
      <br />
      <input type="text" v-model="usuario" placeholder="Enter your username" />
      <br />
      <input type="email" v-model="email" placeholder="Enter your email" />
      <br />
      <input type="password" v-model="password" placeholder="Enter your password" />
      <br />
      <input type="text" v-model="foto" placeholder="Enter your photo (URL)" />
      <br />
      <!-- BOTÓN QUE LLAMA A LA FUNCIÓN DE VALIDAR DATOS ANTES DE GUARDARLOS-->
      <button @click="validatingData()">Guardar</button>
    </div>
  </div>
</template>

<script>
// IMPORTANDO AXIOS Y SWEETALERT
import axios from "axios";
import Swal from "sweetalert2";

export default {
  // EXPORTACIÓN DE LA VISTA, DATOS Y FUNCIONES
  name: "Register",
  data() {
    return {
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      foto: "",
      createClient: false, // VARIABLE BOOLEANA QUE CONTROLA LA VALIDACIÓN
    };
  },
  methods: {
    validatingData() {
      // FUNCIÓN QUE VALIDA QUE NINGÚN CAMPO ESTÁ VACÍO
      if (
        this.nombre === "" ||
        this.usuario === "" ||
        this.password === "" ||
        this.email === "" ||
        this.foto === ""
      ) {
        Swal.fire("No puedes dejar campos vacíos");
        this.createClient = false;
      } else {
        this.createClient = true;
        this.addNewClient(); // LLAMADA A LA FUNCIÓN PARA REGISTRAR CLIENTES
        Swal.fire({
          text: "Registro correcto",
          confirmButtonText: "OK",
          onClose: () => {
            location.reload();
          },
        });
      }
    },
    addNewClient() {
      if (this.createClient === true) {
        // COMPROBACIÓN DE QUE PASA LA VALIDACIÓN
        var self = this;
        axios // PETICIÓN PARA CREAR UN NUEVO CLIENTE EN LA BBDD
          .post("http://localhost:3050/clients/register", {
            nombre: self.nombre,
            usuario: self.usuario,
            password: self.password,
            email: self.email,
            foto: self.foto,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        this.createClient = false;
        (this.nombre = ""),
          (this.usuario = ""), // VACIAMOS LOS CAMPOS DESPUÉS GUARDAR EL CLIENTE
          (this.email = ""),
          (this.password = "");
        this.foto = "";
      } else {
        console.log("No se ha podido realizar el registro");
      }
    },
  },
};
</script>

<style scoped>
</style>