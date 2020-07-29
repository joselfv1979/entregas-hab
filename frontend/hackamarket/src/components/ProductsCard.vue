<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE PRODUCTOS Y LOS MUESTRA EN UNA LISTA -->
<template>
  <div>
    <h1>Lista de productos</h1>
    <div class="box">
      <ul><!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO-->
        <li v-for="producto in productos" :key="producto.id">
          <!-- V-BIND: PARA ENLAZAR LA RUTA DE LA IMAGEN -->  
          <img :src="producto.imagen" />
          <br />
          <p>Nombre: {{ producto.nombre }}</p>
          <br />
          <p>Stock: {{ producto.stock }}</p>
          <br />
          <p>Disponibilidad: <span :class="{ green: producto.stock > 0, red: producto.stock === 0 }">{{ producto.disponibilidad }}</span> </p>
          <br />
          <!-- BOTONES QUE LLAMAN A FUNCIONES QUE LANZAN UN SWEETALERT -->
          <!-- CLASES DINÁMICAS PARA MOSTRAR U OCULTAR ELEMENTOS -->
          <button @click="comprar()" :class=" { hidden: producto.stock === 0 }">Comprar</button>
          <button @click="reservar()" :class=" { hidden: producto.stock === 0 }">Reservar</button>
          <p :class=" { hidden: producto.stock > 0 }">Sin fecha de entrada</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script> 

export default {
  name: "ProductsCard", // EXPORTACIÓN DEL COMPONENTE
  props: {
    productos: Array, // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  },
  methods: { // FUNCIONES QUE LANZAN EVENTOS PARA ACTIVAR FUCIONES EN LA VISTA
    comprar() {
      this.$emit('comprar')
    },
    reservar() {
      this.$emit('reservar')
    },
  },
};
</script>

<style scoped>

img {
  margin-top: 20px;
  width: 150px;
  height: 100px;
}

.box {
  display: flex;
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
}

ul {
  list-style: none;
}

ul li {
  border: 2px solid crimson;
  border-radius: 15px;
  margin: 0.667rem;
}

ul li p {
  display: inline-block;
  padding: 0.667rem;
}

.green {
    color: yellowgreen;
}

.red {
    color: brown;
}

.hidden {
  display: none;
}

</style>