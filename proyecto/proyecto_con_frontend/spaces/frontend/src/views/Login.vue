<!-- VISTA QUE CONTIENE EL FORMULARIO DE LOGIN DE USUARIO -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Login" />
    <div class="box">
      <div class="form">
        <h2>Iniciar sesión</h2>
        <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
        <input type="email" v-model="email" placeholder="Tu email" />
        <br />
        <input id="password" type="password" v-model="password" placeholder="Tu contraseña" />
        <!-- BOTÓN PARA MOSTRAR LA PASSWORD EN CLARO -->
        <p id="clear" @click="showPassword()">Ver/ocultar password</p>
        <br />
        <!-- BOTÓN PARA LOGUEARSE -->
        <button @click="loginUser()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTACIÓN DE FUNCIONES Y LIBRERÍAS EXTERNAS
import { setAuthToken, userLogin } from "./../../../backend/utils/user";
import Swal from "sweetalert2";

export default {
  name: "Login",
  props: {},
  data() {
    // VARIABLES DE LA VISTA
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LA PASSWORD EN CLARO
    showPassword() {
      let tipo = document.getElementById("password");
      if (tipo.type == "password") {
        tipo.type = "text";
      } else {
        tipo.type = "password";
      }
    },
    // FUNCIÓN DE LOGIN, SI ES CORRECTO REDIRIGE AL ÁREA PERSONAL
    async loginUser() {
      if (this.email === "" || this.password === "") {
        Swal.fire("Te faltan datos");
      } else {
        const result = await userLogin(this.email, this.password);
        if (result) {
          location.reload()
        } else {
          Swal.fire("Usuario o contraseña incorrectos");
          return
        }
        setTimeout(() => {         
          this.$router.push('/')
        }, 500)
      }
    },
  },
};
</script>

<style scoped>

.box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#clear {
  cursor: pointer;
}

#clear:hover {
  color: #3b83bd;
}
</style>