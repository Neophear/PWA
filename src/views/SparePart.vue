<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <detailsview v-if="sparepart" v-bind:object="sparepart" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import DetailsView from "../components/DetailsView";

export default {
  name: "SparePart",
  props: {
    id: Number
  },
  components: {
    detailsview: DetailsView
  },
  data() {
    return {
      alertType: "info",
      message: "Henter reservedel...",
      sparepart: undefined
    };
  },
  computed: {
    ...mapState(["SparePartStore"]),
    ...mapGetters("SparePartStore", ["sparePartsLoaded", "getSparePart"])
  },
  async created() {
    await this.load();
  },
  methods: {
    ...mapActions("SparePartStore", ["getSpareParts"]),
    async load() {
      if (!this.sparePartsLoaded) await this.getSpareParts();

      this.sparepart = this.getSparePart(this.id);

      if (this.sparepart) {
        this.message = undefined;
      } else if (this.SparePartStore.error) {
        this.message = this.SparePartStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Reservedelen findes ikke.";
        this.alertType = "danger";
      }
    }
  }
};
</script>
