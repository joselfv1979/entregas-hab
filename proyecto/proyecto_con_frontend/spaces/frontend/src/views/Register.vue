<!-- VISTA QUE CONTIENE EL FORMULARIO DE REGISTRO DE USUARIO -->
<template>
  <div id="main">
    <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
    <vue-headful title="Registro" />
    <div class="box">
      <div>
        <h2>Registro</h2>
        <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
        <input type="email" v-model="email" placeholder="Tu email" />
        <br />
        <input type="text" v-model="name" placeholder="Tu nombre de usuario/a" />
        <br />
        <input type="text" v-model="surname" placeholder="Tus apellidos" />
        <br />
        <input id="password" type="password" v-model="password" placeholder="Tu contraseña" />
        <p id="clear" @click="showPassword()">Ver/ocultar password</p>
        <br />
        <label for="provider">
          <input type="radio" id="provider" v-model="role" name="role" value="provider" />Proveedor
        </label>
        <br />
        <label for="seeker">
          <input type="radio" id="seeker" v-model="role" name="role" value="seeker" />Buscador
        </label>
        <br />
        <!-- BOTÓN PARA ENVIAR LOS DATOS DE REGISTRO -->
        <button @click="register()">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
// IIMPORTACIÓN DE FUNCIONES Y LIBRERÍAS EXTERNAS
import { register, validateUser } from "./../../../backend/utils/user";
import Swal from "sweetalert2";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
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
    // FUNCIÓN DE REGISTRO
    async register() {
      let user = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      if (await validateUser(user)) {
        Swal.fire(
          `Registro completado. Se enviará un email de confirmación a la cuenta: ${this.email}`
        );
        this.name = "";
        this.surname = "";
        this.email = "";
        this.password = "";
        this.role = "";
        this.$router.push("/login");
      } else {
        alert('non hai');
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