<template>
  <div id="app">
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>

    <div v-if="!loading">
      <objectlist
        v-bind:objects="SparePartStore.spareparts"
        v-bind:routeName="'sparepart'"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ObjectList from "../components/ObjectList";

export default {
  components: {
    objectlist: ObjectList
  },
  data() {
    return {
      loading: true,
      alertType: "info",
      message: "Henter reservedele..."
    };
  },
  computed: {
    ...mapState(["SparePartStore"]),
    ...mapGetters(["SparePartStore/sparePartsLoaded"])
  },
  async created() {
    await this.load();
  },
  methods: {
    ...mapActions("SparePartStore", ["getSpareParts"]),
    setMessage(msg, type) {
      this.message = msg;
      this.alertType = type;
    },
    async load() {
      if (!this.sparePartsLoaded) await this.getSpareParts();

      if (this.SparePartStore.spareparts.length > 0) {
        this.setMessage(undefined);
      } else if (this.SparePartStore.error) {
        this.setMessage(this.SparePartStore.error.message, "danger");
      } else {
        this.setMessage("Ingen reservedele tilgængelige.", "warning");
      }

      this.loading = false;
    }
  }
};
</script>
