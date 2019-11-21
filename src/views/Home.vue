<template>
  <div class="home">
    <b-button block :to="{ name: 'home' }">Søg</b-button>
    <b-button block :to="{ name: 'home' }"
      >Find den rigtige reservedel</b-button
    >
    <b-button block>Dokumenter</b-button>
    <b-button block>Hjælp</b-button>
    <b-button block :to="{ name: 'machines' }">Alle maskiner</b-button>
    <b-button block :to="{ name: 'modules' }">Alle moduler</b-button>
    <b-button block :to="{ name: 'spareparts' }">Alle reservedele</b-button>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.home {
  margin: 0px 5px;
}
</style>
