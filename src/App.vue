<template>
  <div class="application">
    <WeatherData v-bind:markers="markers" />
    <Map @update-weather-marker="updateWeatherMarker" />
  </div>
</template>



<script>
import Map from "./components/Map.vue";
import WeatherData from "./components/WeatherData.vue";

export default {
  name: "App",

  components: {
    Map,
    WeatherData
  },

  data() {
    return {
      markers: []
    };
  },
  methods: {
    updateWeatherMarker(weatherVectors) {
      this.markers.push(weatherVectors);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#application {
  display: flex; /* Magic begins */
  flex-wrap: wrap; /* Allow multiple lines */
  text-align: center;
}
#application > div {
  flex: 1; /* Distribute space equally among the flex items */
  min-width: 300px; /* But force them to be at least300px wide */
  border: 1px solid;
  text-align: center;
}
</style>
