<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMarket | New Product" />
    <div class="register">
      <h1>Añadir Producto</h1>
      <!-- INPUTS CON LOS CAMPOS DE REGISTRO ENLAZADOS CON V-MODEL AL DATA -->
      <input type="text" v-model="nombre" placeholder="Enter product name" />
      <br />
      <input type="text" v-model="stock" placeholder="Enter product stock" />
      <br />
      <input type="email" v-model="disponibilidad" placeholder="Enter disponibility" />
      <br />
      <input type="text" v-model="imagen" placeholder="Enter product image (URL)" />
      <br />
      <!-- BOTÓN QUE LLAMA A LA FUNCIÓN DE VALIDAR DATOS ANTES DE GUARDARLOS-->
      <button @click="validatingData()">Guardar</button>
      <!-- CSS SPINNER SE MUESTRA DURANTE 1 SEGUNDO AL CARGAR UN NUEVO PRODUCTO EN LA BBDD -->
      <span class="spinner" v-show="ver"></span>
    </div>
  </div>
</template>

<script>
// IMPORTANDO AXIOS Y SWEETALERT
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddProduct",
  data() {
    return {
      nombre: "",
      stock: "",
      disponibilidad: "",
      imagen: "",
      createProduct: false, // VARIABLE BOOLEANA QUE CONTROLA LA VALIDACIÓN
      ver: false // VARIABLE BOOLEANA QUE CONTROLA LA APARICIÓN DEL SPINNER
    };
  },
  methods: {
    validatingData() {
      // FUNCIÓN QUE VALIDA QUE NINGÚN CAMPO ESTÁ VACÍO
      if (
        this.nombre === "" ||
        this.stock === "" ||
        this.disponibilidad === "" ||
        this.imagen === ""
      ) {
        Swal.fire("No puedes dejar campos vacíos");
        this.createProduct = false;
      } else {
        this.createProduct = true;
        this.addNewProduct(); // LLAMADA A LA FUNCIÓN PARA AÑADIR PRODUCTOS
        Swal.fire({
          text: "Producto creado correctamente",
          confirmButtonText: "OK",
          onClose: () => {
            location.reload();
            this.ver = true
          },
        });
      }
    },
    addNewProduct() {
      if (this.createProduct === true) {
        // COMPROBACIÓN DE QUE PASA LA VALIDACIÓN
        var self = this;
        axios // PETICIÓN PARA CREAR UN NUEVO PRODUCTO EN LA BBDD
          .post("http://localhost:3050/products/add", {
            nombre: self.nombre,
            stock: self.stock,
            disponibilidad: self.disponibilidad,
            imagen: self.imagen,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        this.createProduct = false;
        (this.nombre = ""),
          (this.stock = ""), // VACIAMOS LOS CAMPOS DESPUÉS GUARDAR EL PRODUCTO
          (this.disponibilidad = ""),
          (this.imagen = "");
      } else {
        console.log("No se ha podido registrar el producto");
      }
    },
  },
};
</script>

<style scoped>

.spinner,.spinner:after{
    width: 64px;
    height: 64px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    z-index: 2
 }
.spinner {
    background-color: transparent;
    border-top: 10px solid rgb(66,139,202);
    border-right: 10px solid rgb(66,139,202);
    border-bottom: 10px solid rgb(66,139,202);
    border-left: 10px solid rgba(66,139,202,.2);
    transform: translateZ(0);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 1s;
    animation-name: spinner-loading
 }
@keyframes spinner-loading{
  0% {
      transform: rotate(0deg)
  } to {
      transform: rotate(1turn)
  }
}
</style>