<!-- VISTA QUE CONTIENE EL FORMULARIO PARA REALIZAR UNA RESERVA NUEVA-->
<template>
  <div id="main">
    <div>
      <!-- TÍTULO PERSONALIZADO CON VUE-HEADFUL -->
      <vue-headful title="Reservas" />
      <h3>Realiza tu reserva</h3>
      <div class="form">
        <div class="filter">
          <div class="meet">
            <div id="date">
              <h4>Fecha</h4>
              <!-- INPUTS VINCULADOS AL DATA CON V-MODEL -->
              <input type="date" v-model="date" />
              <h4>Entrada</h4>
              <input type="time" v-model="start" />
              <h4>Salida</h4>
              <input type="time" v-model="end" />
            </div>
          </div>
          <div class="group">
            <div class="options">
              <h4 class="check">Tipo</h4>
              <label for="meetingType">
                <input type="radio" id="meetingType" v-model="type" value="reunion" checked />Reuniones
              </label>
              <br>
              <label for="hallType">
                <input type="radio" id="hallType" v-model="type" value="evento" />Eventos
              </label>
            </div>
            <div class="options">
              <label for="uLayout">
                <h4 class="check">Disposición</h4>
                <input type="radio" v-model="layout" value="en U" checked />En U
              </label>
              <br />
              <label for="classLayout">
                <input type="radio" v-model="layout" value="classLayout" />En escuela
              </label>
              <br />
              <label for="theaterLayout">
                <input type="radio" v-model="layout" value="theaterLayout" />En teatro
              </label>
            </div>
          </div>
          <div class="group">
            <div class="options">
              <h4 class="check">Equipamiento</h4>
              <label for="furniture">
                <input type="checkbox" v-model="furniture" value="amueblado" />Muebles
              </label>
              <br />
              <label for="wifi">
                <input type="checkbox" v-model="wifi" value="wifi" />WI-FI
              </label>
              <br />
              <label for="projector">
                <input type="checkbox" v-model="projector" value="proyector" />Proyector
              </label>
              <br />
              <label for="screen">
                <input type="checkbox" v-model="screen" value="pantalla" />Pantalla
              </label>
            </div>
            <div class="options">
              <input id="attendees" type="number" v-model="attendees" placeholder="Número de asistentes" />
            </div>
          </div>
          <div class="buttons">
            <!-- BOTÓN PARA ENVIAR LOS DATOS -->
          <button @click="addBook()">Realizar reserva</button>
          <!-- BOTÓN PARA CANCELAR LA OPERACIÓN -->
          <button @click="cancel()">Cancelar</button>
          </div>
        </div>
      </div>
      <!-- MODAL PARA VER EL RESUMEN DE UNA RESERVA -->
      <div v-show="modal" class="modal">
        <div class="modalBox">
          <!-- DECLARACIÓN DEL COMPONENTE QUE MUESTRA EL RESUMEN DE LA RESERVA -->
          <bookdetail :book="book" />
          <!-- BOTÓN PARA ESCONDER EL MODAL -->
          <button @click="hide()">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTACIÓN DE COMPONENTES, FUNCIONES Y LIBRERÍAS EXTERNAS
import Swal from "sweetalert2";
import moment from "moment";
import { createBook, getBook } from "./../../../backend/utils/book";
import { getAuthToken } from "./../../../backend/utils/user";
import { getSpaceId, removeSpaceId } from "./../../../backend/utils/space";
import bookdetail from "@/components/BookDetail.vue";
export default {
  name: "AddBook",
  components: {
    bookdetail, // REGISTRO DE COMPONENTES
  },
  data() {
    // VARIABLES DE LA VISTA
    return {
      modal: false,
      book: {},
      date: "",
      start: "",
      end: "",
      attendees: "",
      type: "",
      layout: "",
      furniture: 0,
      wifi: 0,
      projector: 0,
      screen: 0,
    };
  },
  methods: {
    // FUNCIÓN PARA REALIZAR LA RESERVA
    async addBook() {
      if(!this.date || !this.start || !this.end || !this.attendees || !this.type || !this.layout){
        Swal.fire("No puedes dejar campos vacíos");
        return
      }
      let token = getAuthToken();
      let spaceId = getSpaceId();
      let startTime = this.date + " " + this.start;
      let endTime = this.date + " " + this.end;
      let book = {
        type: this.type,
        layout: this.layout,
        furniture: this.furniture,
        wifi: this.wifi,
        projector: this.projector,
        screen: this.screen,
        attendees: this.attendees,
        startTime,
        endTime
      }
      let newBook = await createBook(
        token,
        spaceId,
        this.type,
        this.layout,
        this.furniture,
        this.wifi,
        this.projector,
        this.screen,
        this.attendees,
        startTime,
        endTime
      );

      if (newBook) {
        let bookId = newBook
        // RECUPERO LA RESERVA Y OTROS DATOS PARA MOSTRALOS UNA VEZ CREADA
        let result = await getBook(token, spaceId, bookId);
        this.book = result;
        let bookDate = moment(this.book.book_date)
          .utcOffset(120)
          .format("DD-MM-YYYY HH:mm");
        let startTime = moment(this.book.start_time)
          .utcOffset(120)
          .format("DD-MM-YYYY HH:mm");
        let endTime = moment(this.book.end_time)
          .utcOffset(120)
          .format("DD-MM-YYYY HH:mm");
        this.book.book_date = bookDate;
        this.book.start_time = startTime;
        this.book.end_time = endTime;
        this.modal = true;
      } else {
        Swal.fire("Fecha reservada escoja otra");
      }
    },
    cancel() {
      // REDIRECCIÓN AL HOME
      removeSpaceId();
      this.$router.push("/");
    },
    hide() {
      // OCULTACIÓN DEL MODAL Y REDIRECCIÓN AL HOME
      this.modal = false;
      removeSpaceId();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.meet {
  text-align: center;
  padding-top: 20px;
}

.form {
  display: flex;
  justify-content: center;
}

.group {
  padding-top: 15px;
  height: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.options {
  padding-top: 10px;
  padding-left: 20px;
  border-top: 2px solid #3b83bd;
  display: inline-block;
  width: 200px;
  height: 120px;
  text-align: justify;
}

.filter {
  width: 500px;
  text-align: justify;
  border-left: 2px solid #3b83bd;
  border-right: 2px solid #3b83bd;
  border-top: 2px solid #3b83bd;
}

input {
  border: 2px solid #3b83bd;
}

.check {
  padding-bottom: 10px;
  padding-left: 23px;
}

.buttons {
  text-align: center;
}

#attendees {
  margin-top: 50px;
  width: 150px;
}
</style>