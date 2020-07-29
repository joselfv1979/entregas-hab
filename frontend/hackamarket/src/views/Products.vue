<!-- VISTA PRODUCTS, ES LA PÁGINA PARA LISTAR PRODUCTOS-->
<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMarket | Productos" />
    <!-- DECLARACIÓN DEL COMPONENTE PRODUTCSCARD, PARA LISTAR LOS PRODUCTOS -->
    <productscard v-on:comprar="comprarProducto" v-on:reservar="reservarProducto" :productos="productos" />
  </div>
</template>

<script>
// IMPORTANDO AXIOS, SWEETALERT Y EL COMPONENTE QUE CARGA LA VISTA
import Swal from "sweetalert2";
import axios from "axios";
import productscard from "@/components/ProductsCard.vue";

export default { // EXPORTACIÓN DE LA VISTA, COMPONENTE, DATOS Y FUNCIONES
  name: "Products",
  components: {
    productscard,
  },
  data() {
    return {
      productos: [] // ARRAY DE PRODUCTOS QUE RECIBE LA VISTA
    }
  },
  methods: {
    comprarProducto(){
      Swal.fire("¡Gracias por comprar el producto!");
    },
    reservarProducto(){
      Swal.fire("¡Gracias por reservar el producto!");
    },
    getProducts() {
      var self = this;
      // LLAMADA DE AXIOS A LA API
      axios
        .get("http://localhost:3050/products")
        .then((response) => { // VARIABLE QUE GUARDA LOS PRODUCTOS
          self.productos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() { // HOOK QUE EJECUTA LA FUNCIÓN PARA OBTENER LOS PRODUCTOS
    this.getProducts();
  },
};
</script>

<style scoped>


</style>