<template>
  <div class="camera">
    <h2 class="camera__name">{{ name }}</h2>
    <span class="camera__rating">{{ rating }}</span>
    <img class="camera__image" :src="img" />
    <p></p>
    <p />
    <input v-model="messenger" placeholder="edit me" />
    <p>Message is: {{ messenger }}</p>
    <button v-on:click="warn('Gonna log it', $event, messenger)">Submit</button>
  </div>
</template>


<script>
export default {
  name: "Camera",
  props: {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    messenger: {}
  },
  computed: {
    img() {
      return require(`../assets/${encodeURIComponent(this.name)}.png`);
    }
  },
  methods: {
    warn: function(message, event, melinda) {
      // now we have access to the native event
      if (event) {
        console.log("Event message", melinda);
        event.preventDefault();
      }
      alert(message);
    }
  }
};
</script>

<style>
</style>