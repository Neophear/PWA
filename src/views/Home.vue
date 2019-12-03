<template>
  <div>
    <b-button block disabled>Søg</b-button>
    <b-button block disabled>Dokumenter</b-button>
    <b-button block disabled>Hjælp</b-button>
    <b-button block :to="{ name: 'machines' }">Alle maskiner</b-button>
    <b-button block :to="{ name: 'modules' }">Alle moduler</b-button>
    <b-button block :to="{ name: 'spareparts' }">Alle reservedele</b-button>
    <a href="https://google.dk/">Google</a>
    <a href="https://google.dk/" target="_blank">Google i nyt vindue</a>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
