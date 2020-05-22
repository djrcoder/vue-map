<template>
  <div class="application">
    <Camera name="logo" :rating="9" />
    <Map />
  </div>
</template>



<script>
import Map from "./components/Map.vue";
import Camera from "./components/Camera.vue";

export default {
  name: "App",
  components: {
    Map,
    Camera
  },
  props: {
    message: String
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
