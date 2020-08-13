<!-- VISTA DEL ÁREA PERSONAL CON DIVERSAS FUNCIONALIDADES SEGÚN EL ROL DEL USUARIO -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Área personal" />
    <h1>Área personal</h1>
    <!-- <p>Hola, {{ name }}</p> -->
    <div>
      <!-- BOTÓN PARA ACTUALIZAR EL PERFIL DE USUARIO -->
      <button @click="edit()">Editar perfil</button>
      <!-- BOTÓN PARA ELIMINAR EL PERFIL DE USUARIO -->
      <button @click="drop()">Eliminar cuenta</button>
      <!-- BOTONES CON V-SHOWS ENLAZADOS SE MUESTRAN SEGÚN EL ROL DE USUARIO -->
      <!-- BOTÓN PARA MOSTRAR LOS ESPACIOS DE UN PROVEEDOR -->
      <button v-show="provider" @click="getSpaces()">Mis espacios</button>
      <!-- BOTÓN PARA QUE UN PROVEEDOR CREE UN ESPACIO -->
      <button v-show="provider" @click="addSpace()">Añadir espacio</button>
      <!-- BOTÓN PARA MOSTAR LAS RESERVAS DE UN USUARIO BUSCADOR -->
      <button v-show="seeker" @click="listBooks()">Mis reservas</button>
    </div>
    <!-- DECLARACIÓN DEL COMPONENTE PARA LISTAR ESPACOS -->
    <spacelist v-show="listSpace" :spaces="spaces" />
  </div>
</template>

<script>
// IMPORTACIÓN DE COMPONENTES, FUNCIONES Y LIBRERÍAS EXTERNOS
import axios from "axios";
import Swal from "sweetalert2";
import {
  getUserName,
  getId,
  getAuthToken,
  getRole,
  logout,
  getName,
  dropUser,
} from "./../../../backend/utils/user";
import { getPlaces } from "./../../../backend/utils/space";
import spacelist from "@/components/SpaceList.vue";

export default {
  name: "User",
  components: { // DECLARACIÓN DEL COMPONENTE
    spacelist,
  },
  data() { // VARIABLES DE LA VISTA
    return {
      spaces: [],
      name: "",
      listSpace: false,
      provider: false,
      seeker: false,
      today: "",
    };
  },
  methods: {
    // FUNCIÓN DE DESLOGUEO
    userLogout() {
      logout();
      this.$router.push("/");
    },
    // FUNCIÓN DE REDIRECCIÓN A LA VISTA DE EDICIÓN DE PERFIL
    edit() {
      this.$router.push("/update-user");
    },
    // FUNCIÓN PARA BORRAR EL PERFIL DE USUARIO
    drop() {
      Swal.fire({
        text: "Estás seguro de eliminar la cuenta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            text: "La cuenta ha sido eliminada.",
            onClose: () => {
              dropUser();
              this.userLogout();
            },
          });
        }
      });
    },
    // FUNCIÓN QUE OBTIENE LOS ESPACIOS DE UN PROVEEDOR
    async getSpaces() {
      let token = getAuthToken();
      const result = await getPlaces(token);
      this.listSpace = true;
      this.spaces = result.data;
    },
    // FUNCIÓN DE REDIRECCIÓN A LA VISTA DE RESERVAS DE USUARIO
    listBooks() {
      this.$router.push("/books");
    },
    // FUNCIÓN DE REDIRECCIÓN A LA VISTA DE CREACIÓN DE ESPACIOS
    addSpace() {
      this.$router.push("/add-spaces");
    },
    // FUNCIÓN QUE COMPRUEBA EL ROL DE USUARIO 
    checkRole() {
      let rol = getRole();
      if (rol === "provider") {
        this.provider = true;
      } else if (rol === "seeker") {
        this.seeker = true;
      }
    },
  },
  created() {
    // LLAMADA A LA FUNCIÓN QUE COMPRUEBA EL ROL DE USUARIO AL CREAR LA VISTA
    this.checkRole();
  },
};
</script>

<style scoped>
</style>