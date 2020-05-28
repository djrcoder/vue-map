<template>
  <div id="mark">
    <ul>
      <li v-for="marker in markers" v-bind:key="marker.position.lng">
        <p>{{ marker.position }}</p>
        <p>HELLO</p>
      </li>
    </ul>
    <ul>
      <p>{{ fetchedWeather }}</p>
    </ul>
  </div>
</template>

<script>
const weatherKey = process.env.VUE_APP_WEATHER_KEY;
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
// const lat = 47.41322;
// const lng = -1.219482;

//take a location and return the data for that location
// function getWeather(lat, lng) {

// getWeather(lat, lng);

export default {
  name: "WeatherData",
  props: ["markers"],
  data() {
    return {
      fetchedWeather: {}
    };
  },
  methods: {
    getWeatherData(lat, lng) {
      const url = `${apiURL}lat=${lat}&lon=${lng}&appid=${weatherKey}`;
      fetch(url)
        .then(res => {
          const response = res.json();
          return response;
        })
        .then(response => {
          console.log(response);
          this.fetchedWeather = response;
        })
        .catch(err => console.log(err));
    }
  },
  updated() {
    this.getWeatherData(
      this.markers[0].position.lat,
      this.markers[0].position.lng
    );
  }
};
</script>

<style>
</style>