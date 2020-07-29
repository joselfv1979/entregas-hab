<template>
  <div class="home">
    <div class="box">
      <h1>Bienvenido a HackaMarket</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>

.home {
  width: 100%;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 77vh;
  background-image: url("./../assets/market.jpeg");
  background-size: cover;
  background-position: center;
}

</style>
