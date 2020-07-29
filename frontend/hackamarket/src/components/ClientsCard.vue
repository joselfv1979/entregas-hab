<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE CLIENTES Y LOS MUESTRA EN UNA LISTA -->
<template>
  <div>
    <h1>Lista de clientes:</h1>
    <div class="box">
      <ul><!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO-->
        <li v-for="(cliente, index) in clientes" :key="cliente.id">
          <!-- V-BIND: PARA ENLAZAR LA RUTA DE LA IMAGEN -->  
          <img :src="cliente.foto" />
          <br />
          <p>Nombre: {{ cliente.nombre }}</p>
          <br />
          <p>Usuario: {{ cliente.usuario }}</p>
          <br />
          <p>Email: {{ cliente.email }}</p>
          <br />
          <p>Contraseña: {{ cliente.password }}</p>
          <br />
          <!-- BOTÓN QUE LLAMA A LA FUNCIÓN PARA ENVIAR EL ÍNDICE DEL CLIENTE Y LANZA EL EVENTO DE BORRAR -->
          <button @click="enviarIndiceCliente(index)">Borrar</button>
          <!-- BOTÓN QUE LLAMA A LA FUNCIÓN PARA ENVIAR EL ÍNDICE DEL CLIENTE Y LANZA EL EVENTO DE MOSTRAR DATOS -->
          <button @click="enviarDatosCliente(index)">Editar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientsCard", // EXPORTACIÓN DEL COMPONENTE
  props: {
    clientes: Array, // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
  },
  methods: { // FUNCIONES QUE LANZAN EVENTOS Y ACTIVAN FUNCIONES EN LA VISTA, ENVIÁNDOLES LOS ÍNDICES COMO PARÁMETROS 
    enviarDatosCliente(index) {
      let datosCliente = this.clientes[index];
      this.$emit("datos", datosCliente);
    },
    enviarIndiceCliente(index) {
      let indiceCliente = this.clientes[index].id;
      this.$emit("borrar", indiceCliente);
    },
  },
};
</script>

<style scoped>

</style>