<!-- VISTA CLIENTS, ES LA PÁGINA PARA LISTAR, BORRAR Y ACTUALIZAR CLIENTES-->
<template>
  <div>
    <!-- DECLARACIÓN DEL COMPONENTE VUE-HEADFUL, PARA PERSONALIZAR LOS TÍTULOS DE LAS VISTAS -->
    <vue-headful title="HackaMarket | Clientes" />
    <!-- DECLARACIÓN DEL COMPONENTE CLIENTSCARD, PARA LISTAR LOS CLIENTES, LOS V-ON ENLAZAN EVENTOS DEL COMPONENTE CON FUNCIONES DEL AVIST-->
    <clientscard 
      v-on:datos="mostrarInfoCliente"
      v-on:borrar="borrandoCliente"
      :clientes="clientes"
    />

    <!-- MODAL PARA ACTUALIZAR CLIENTES -->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Actualiza los datos de tu cliente:</h3>
        <input type="text" placeholder="Nombre del cliente" v-model="nombreActualizado" />
        <br />
        <input type="text" placeholder="Nombre de usuario" v-model="usuarioActualizado" />
        <br />
        <input type="text" placeholder="Contraseña del cliente" v-model="passwordActualizada" />
        <br />
        <input type="text" placeholder="Email del cliente" v-model="emailActualizado" />
        <br />
        <input type="text" placeholder="Foto del cliente (URL)" v-model="fotoActualizada" />
        <br />
        <!-- BOTÓN PARA ESCONDER EL MODAL -->
        <button @click="seeModal =! seeModal">Cancelar</button>
        <!-- BOTÓN PARA ACTUALIZAR LOS CLIENTES -->
        <button @click="actualizarCliente()">Actualizar cliente</button>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTANDO AXIOS, SWEETALERT Y EL COMPONENTE QUE CARGA LA VISTA
import Swal from "sweetalert2";
import axios from "axios";
import clientscard from "@/components/ClientsCard.vue";

export default { // EXPORTACIÓN DE LA VISTA, COMPONENTE, DATOS Y FUNCIONES
  name: "Clients",
  components: {
    clientscard,
  },
  data() {
    return {
      clientes: [],
      id: "",
      nombreActualizado: "",
      usuarioActualizado: "",
      passwordActualizada: "",
      emailActualizado: "",
      fotoActualizada: "",
      seeModal: false,
    };
  },
  methods: { // FUNCIÓN PARA BORRAR CLIENTES EN LA BBDD
    borrandoCliente(indiceCliente) {
      var self = this;
      axios
        .delete("http://localhost:3050/clients/delete/" + indiceCliente)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.sweetalertDelete()
    },
    sweetalertDelete(){ 
      Swal.fire({
        text: 'Cliente borrado',
        confirmButtonText: 'OK',
        onClose: () => {
          location.reload()
        }
      })
    },
    actualizarCliente() { // FUNCIÓN PARA ACTUALIZAR CLIENTES EN LA BBDD
      var self = this;
      axios
        .put("http://localhost:3050/clients/update/" + self.id, {
          nombre: self.nombreActualizado,
          usuario: self.usuarioActualizado,
          password: self.passwordActualizada,
          email: self.emailActualizado,
          foto: self.fotoActualizada,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.sweetalertEdit()
    },
    sweetalertEdit(){ 
      Swal.fire({
        title: 'SUCCESS',
        text: 'Perfil actualizado',
        confirmButtonText: 'OK',
        onClose: () => {
          location.reload()
        }
      })
    },
    mostrarInfoCliente(datosCliente) { // FUNCIÓN PARA CARGAR LOS DATOS DEL CLIENTE
      this.nombreActualizado = datosCliente.nombre;
      this.usuarioActualizado = datosCliente.usuario;
      this.passwordActualizada = datosCliente.password;
      this.emailActualizado = datosCliente.email;
      this.fotoActualizada = datosCliente.foto;
      this.id = datosCliente.id;
      this.seeModal = true;
    },
    // FUNCIÓN PARA CONSEGUIR MIS CLIENTES
    getClients() {
      var self = this;
      // LLAMADA DE AXIOS A LA API
      axios
        .get("http://localhost:3050/clients")
        .then((response) => { // VARIABLE QUE GUARDA LOS CLIENTES
          self.clientes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() { // HOOK QUE EJECUTA LA FUNCIÓN PARA OBTENER LOS CLIENTES
    this.getClients();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modalBox {
  background-color: whitesmoke;
  margin: 2% auto;
  padding: 3rem;
  width: 400px;
  border: 4px solid black;
  border-radius: 3px;
}
</style>