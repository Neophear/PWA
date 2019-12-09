<template>
  <div>
    <b-button block disabled>Søg</b-button>
    <b-button block disabled>Dokumenter</b-button>
    <b-button block disabled>Hjælp</b-button>
    <b-button block :to="{ name: 'machines' }">Alle maskiner</b-button>
    <b-button block :to="{ name: 'modules' }">Alle moduler</b-button>
    <b-button block :to="{ name: 'spareparts' }">Alle reservedele</b-button>
    <b-button class="link" href="https://google.dk/">Google</b-button>&nbsp;
    <b-button class="link" href="https://google.dk/" target="_blank"
      >Google i nyt vindue</b-button
    >
    <div class="location">{{ location }}</div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      location: "Henter lokation..."
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location =
          "Lokation: " +
          (position.coords.latitude + "," + position.coords.longitude);
      });
    } else {
      this.location = "Geo Location not supported by browser";
    }
  }
};
</script>

<style scoped>
.link {
  margin-top: 10px;
}
</style>
