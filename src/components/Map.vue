<template>
  <div style="height: 500px; width: 80%; margin: 10%">
    <!-- <div style="height: 200px overflow: auto;">
      <p>
        <md-button class="md-raised">Default</md-button>
        <md-button class="md-raised" @click="showLongText">Measure Tool</md-button>
        <md-button class="md-raised" @click="showMap = !showMap">Toggle map</md-button>
      </p>
    </div>-->

    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @click="logLatLng"
      @polylinemeasure:toggle="handleToggle"
      @polylinemeasure:start="handleStart"
      @polylinemeasure:resume="handleResume"
      @polylinemeasure:finish="handleFinish"
      @polylinemeasure:clear="handleClear"
      @polylinemeasure:add="handleAdd"
      @polylinemeasure:insert="handleInsert"
      @polylinemeasure:move="handleMove"
      @polylinemeasure:remove="handleRemove"
    >
      <l-control-polyline-measure :options="{ showUnitControl: true }" position="topright" />
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-marker
        v-for="marker of markerArray"
        :key="marker.id"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :lat-lng.sync="marker.position"
        :icon="marker.icon"
      ></l-marker>
      <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
    </l-map>

    <!-- <Demo v-for="event in events" :key="event.order" /> -->
    <!-- <Demo v-bind:marker="markerArray" /> -->
    <!-- <p v-for="event in events" :key="event.order">{{ event.order }}. {{ event.desc }}</p> -->
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import LControlPolylineMeasure from "vue2-leaflet-polyline-measure";

let firstMarker = false;
// Over-rides default icon and makes sure icon shows up
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LGeoJson,
    LControlPolylineMeasure
  },

  data() {
    return {
      eventDescriptions: [],
      markerArray: [],
      zoom: 12,
      center: latLng(48.858093, 2.294694),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 2,
      // currentCenter: latLng(50.021423, 0.72655),

      currentCenter: latLng(48.858093, 2.294694),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      geojson: null
    };
  },
  computed: {
    // pass new object with lat and long to event description
    events() {
      return this.eventDescriptions
        .map((desc, index) => ({ order: index + 1, desc }))
        .reverse();
    }
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick(e) {
      console.log(e);
      alert(e);
    },
    logLatLng(e) {
      console.log(e.latlng);

      if (!firstMarker) {
        this.setTheWeather({
          position: { lng: e.latlng.lng, lat: e.latlng.lat }
        });
        firstMarker = true;
      }

      this.markerArray.push({
        position: { lng: e.latlng.lng, lat: e.latlng.lat }
      });
    },
    addEvent(desc) {
      this.eventDescriptions.push(desc);
    },
    handleToggle(e) {
      this.addEvent(`Toggled: ${e.sttus}`);
    },
    handleStart(currentLine) {
      this.addEvent(`Started: Initial distance ${currentLine.distance}`);
    },
    handleResume(currentLine) {
      this.addEvent(`Resumed: Current distance ${currentLine.distance}`);
    },
    handleFinish(currentLine) {
      this.addEvent(
        `Finished: Total distance ${(currentLine.distance / 1000).toFixed(2)}km`
      );
      // this.method name to covert all points to GPX or XML format
    },
    handleClear() {
      this.addEvent("Cleared");
    },
    handleAdd(e) {
      this.addEvent(`Added point: ${e.latlng}`);
    },
    handleInsert(e) {
      this.addEvent(`Inserted point: ${e.latlng}`);
    },
    handleMove(e) {
      this.addEvent(`Moved point: ${e.latlng} to ${e.sourceTarget._latlng}`);
    },
    handleRemove(e) {
      this.addEvent(`Removed point: ${e.latlng}`);
    },
    setTheWeather(item) {
      this.$emit("update-weather-marker", item);
    }
  },
  async created() {
    //this.geojson = fetch request or file
  }
};
</script>
