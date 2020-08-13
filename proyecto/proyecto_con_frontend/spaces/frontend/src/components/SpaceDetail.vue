<!-- COMPONENTE DINÁMICO QUE RECIBE UN OBJETO ESPACIO Y LO MUESTRA -->
<template>
  <div>
      <h1>Detalles del espacio:</h1>
      <ul>
          <li>
              <p>Hotel: {{ space.hotel }}<p/>
              <p>Nombre: {{ space.name }}</p><br>              
              <p>Ciudad: {{ space.city }}</p><br>
              <p>Dirección: {{ space.address }}</p><br>
              <img :src="space.image_1" /><br>
              <img :src="space.image_2" /><br>
              <p>Precio/hora: {{ space.price }}</p><br>
              <p>{{ space.description }}</p><br>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'SpaceDetail', // EXPORTACIÓN DEL COMPONENTE
    props: {
        space: Object // OBJETO QUE RECIBE EL COMPONENTE
    },
}
</script>

<style scoped>

</style>