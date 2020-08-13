<!-- COMPONENTE ESTÁTICO QUE CONTIENE EL FOOTER DE LA APLICACIÓN -->
<template>
  <div id="foot">
    <footer >
        <p>Created by Jose 2020</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterCustom"
};
</script>

<style scoped>

#foot {
  font-size: 20px;
  color: #2c3e50;
  background-color: #3b83bd;
  height: 100px;
  width: 100%;
  align-self: flex-end;
}

</style>