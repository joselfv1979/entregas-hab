<!-- VISTA QUE CONTIENE EL FORMULARIO DE EDICIÓN DE PERFIL DE USUARIO -->
<template>
  <div id="main">
      <div class="modal">
      <div class="modalBox">
        <h3>Edita tu perfil:</h3>
        <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
        <input type="text" placeholder="Nombre del usuario" v-model="nombreActualizado" />
        <br />
        <input type="text" placeholder="Apellidos del usuario" v-model="apellidoActualizado" />
        <br />
        <input type="text" placeholder="Email del usuario" v-model="emailActualizado" />
        <br />
        <!-- BOTÓN PARA ACTUALIZAR PERFIL -->
        <button @click="updateProfile()">Guardar</button>
        <!-- BOTÓN PARA CANCELAR LA OPERACIÓN -->
        <button @click="cancel()">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
// IIMPORTACIÓN DE FUNCIONES Y LIBRERÍAS EXTERNAS
import axios from "axios";
import Swal from "sweetalert2";
import { getId, getAuthToken, updateUser, getUser, logout } from './../../../backend/utils/user'

export default {
  name: 'UpdateUser',
  data() { // VARIABLES DE LA VISTA
    return {
      users: [],
      userId: "",
      nombreActualizado: "",
      apellidoActualizado: "",
      emailActualizado: "",
    };
  },
  methods: {
    // FUNCIÓN QUE OBTIENE EL PERFIL DE USUARIO
    async getDataClient(){
      var self = this;
      let userId = getId()
      let token = getAuthToken()
      const user = await getUser(userId, token)
      this.showUserData(user)
    },
    // FUNCIÓN QUE CARGA EL PERFIL DE USUARIO
    showUserData(user) {
      this.nombreActualizado = user.name;
      this.apellidoActualizado = user.surname;
      this.emailActualizado = user.email;
    },
    // FUNCIÓN PARA ACTUALIZAR EL PERFIL DE USUARIO
    async updateProfile() {
      var self = this;
      let userId = getId()
      let token = getAuthToken()
      let name = self.nombreActualizado
      let surname = self.apellidoActualizado
      let email = self.emailActualizado
      await updateUser(userId, name, surname, email, token)
      Swal.fire({
        text: 'Perfil actualizado',
        onClose: () => {
          location.reload();
        }
      })
      this.$router.push('/users') 
    },   
    // FUNCIÓN QUE CANCELA LA OPERACIÓN
    cancel(){
        this.$router.push('/users')
    }
  },
  created(){
    // LLAMADA A LA FUNCIÓN PARA OBTENER EL PERFIL DE USUARIO AL CREAR LA VISTA
      this.getDataClient()
  }
}
</script>

<style scoped>

</style>