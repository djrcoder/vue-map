<template>
  <div id="location-data">
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div id="lat-lng-position" v-for="marker in markers" v-bind:key="marker.position.lng">
            <h2>Data for position {{ Number(marker.position.lat).toFixed(4) }} {{ Number(marker.position.lng).toFixed(4) }}</h2>
          </div>
        </md-card-header>
      </md-ripple>
    </md-card>
    <p></p>

    <img :src="wikidata" />

    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div id="Weather-icon" v-for="icon in weatherIcon" v-bind:key="icon">
            <p>
              <img v-for="icon in weatherIcon" v-bind:src="weatherIcon" v-bind:key="icon" />
            </p>
          </div>
          <div id="weather-card" v-for="item in currentWeather" v-bind:key="item">
            <p>{{ item }}</p>
          </div>
        </md-card-header>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
const weatherKey = process.env.VUE_APP_WEATHER_KEY;
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
let noWeather = true;
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
      fetchedWeather: [],
      weatherIcon: [],
      currentWeather: [],
      wikidata: ""
    };
  },
  methods: {
    getWeatherData(lat, lng) {
      const url = `${apiURL}lat=${lat}&lon=${lng}&units=metric&appid=${weatherKey}`;
      fetch(url)
        .then(res => {
          const response = res.json();
          noWeather = false;
          return response;
        })
        .then(response => {
          console.log(response);

          if (response.name) {
            this.currentWeather.push("Report from " + response.name);
          } else {
            this.currentWeather.push(
              "Report from " + lat.toFixed(5) + " " + lng.toFixed(5)
            );
          }

          this.currentWeather.push(
            "The current temperature is " + response.main.temp + "°C"
          );
          this.currentWeather.push(
            "But it feels more like " + response.main.feels_like + "°C"
          );
          this.currentWeather.push(
            "Weather conditions: " + response.weather[0].description
          );
          this.currentWeather.push(
            "The humidity is " + response.main.humidity + "%"
          );
          this.currentWeather.push(
            "The windspeed is " + response.wind.speed + " m/s"
          );
          this.weatherIcon.push(
            "http://openweathermap.org/img/w/" +
              response.weather[0].icon +
              ".png"
          );
          this.fetchedWeather = response;
        })
        .catch(err => console.log(err));
    },

    getWiki() {
      const url = `http://en.wikipedia.org/w/api.php?action=query&generator=geosearch&format=json&prop=coordinates%7Cpageimages&ggscoord=37.7891838%7C-122.4033522&origin=*`;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          console.log("res", res.query.pages);
          let geoLocation = null;

          for (const location in res.query.pages) {
            console.log(location);
            if (location && !geoLocation) {
              geoLocation = location;
            }
          }

          // console.log(
          //   "Will?",
          //   res.query.pages[geoLocation]["thumbnail"]["source"]
          // );

          const imgWik = res.query.pages[geoLocation]["thumbnail"]["source"];
          console.log(geoLocation);
          this.wikidata = imgWik;
        });
    }
  },

  updated() {
    if (noWeather) {
      this.getWeatherData(
        this.markers[0].position.lat,
        this.markers[0].position.lng
      );
      this.getWiki();
    }
  }
};
</script>


<style>
#location-data {
  width: 80%;
  margin: 10%;
  display: inline-block;
  text-align: center;
  text-size-adjust: 34px;
  vertical-align: top;
}
</style>
