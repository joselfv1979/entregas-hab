<!-- COMPONENTE DINÁMICO QUE RECIBE UN ARRAY DE ESPACIOS Y LOS MUESTRA EN UNA LISTA -->
<template>
  <div>
      <ul> <!-- V-FOR: PARA RECORRER EL ARRAY Y MOSTRAR CADA ELEMENTO -->
      <!-- EL ELEMENTO LISTA TIENE UN V-ON CLICK VINCULADO -->
          <li @click="enviarId(index)" v-for="(space, index) in spaces" :key="space.id">
              <p>Hotel: {{ space.hotel }}</p>
              <p>Nombre: {{ space.name }}</p><br>              
              <p>Ciudad: {{ space.city }}</p><br>
              <img :src="space.image_1" /><br>
              <p>Precio/hora: {{ space.price }}</p><br>
              <p>{{ space.description }}</p><br>
          </li>
      </ul>
  </div>
</template>

<script> // IMPORTACIÓN DE FUNCIONES EXTERNAS
import { getRole } from './../../../backend/utils/user'

export default {
    name: 'SpaceList', // EXPORTACIÓN DEL COMPONENTE
    props: {
        spaces: Array // DECLARACIÓN DEL ARRAY QUE RECIBE EL COMPONENTE
    },
    data(){
    return {
      
    }
  },
  methods: { // FUNCIÓN QUE LANZA UN EVENTO Y ACTIVA UNA FUNCIÓN EN LA VISTA, ENVIÁNDOLE UN ÍNDICE COMO PARÁMETRO 
    enviarId(index) {
      let spaceId = this.spaces[index].id;
      this.$emit("mostrar", spaceId);
    },
  }
}
</script>

<style scoped>
img{
  width: 150px;
  height: 120px;
}

li {
  cursor: pointer;
}

</style>