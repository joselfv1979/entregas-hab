<!--  VISTA DE ERROR, SE MUESTRA CUANDO NO EXISTE LA RUTA SOLICITADA -->
<template>
  <div class="error">
    <div class="box">
    <vue-headful title="HackaMarket | Error" />
      <h1>Error page: </h1>
  </div>
  </div>
</template>

<script>
export default {
    name: 'Error' // EXPORTACIÓN DE LA VISTA
}
</script>

<style scoped>

.error {
  width: 100%;
}

.box {
  justify-content: center;
  align-items: flex-start;
  height: 78vh;
  background-image: url("./../assets/error.jpeg");
  background-size: cover;
  background-position: center;
}
</style>