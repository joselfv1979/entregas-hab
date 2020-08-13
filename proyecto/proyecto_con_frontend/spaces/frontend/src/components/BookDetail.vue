<!-- COMPONENTE DINÁMICO QUE RECIBE UN OBJETO RESERVA Y LO MUESTRA -->
<template>
  <div>
    <h1>Detalles de la reserva:</h1>
    <ul>
      <li>
        <p>Reserva a nombre de: {{ book.client }} </p>
        <p>Lugar: {{ book.place }}</p>
        <br />
        <p>Dirección: {{ book.address }}</p>
        <p>Precio: {{ book.price }}</p>
        <br />
        <p>Asistentes: {{ book.attendees }}</p><br>
        <p>Tipo: {{ book.type }}</p>
        <p>Distribución: {{ book.layout }}</p><br>
        <p>Equipamiento: </p><br>
        <p>Entrada: {{ book.start_time }}</p><br>
        <p>Salida: {{ book.end_time }}</p><br>
        <p>Fecha de reserva: {{ book.book_date }}</p>
        <p>Le llegará un email de confirmación de la reserva</p><br>
        <p>a la dirección: {{ book.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookDetail", // EXPORTACIÓN DEL COMPONENTE
  props: {
    book: Object, // OBJETO QUE RECIBE EL COMPONENTE
  },
};
</script>

<style scoped>
</style>