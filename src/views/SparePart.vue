<template>
  <div>
    <p v-if="message">{{ message }}</p>
    <div v-if="!loading">
      <b-img thumbnail :src="sp.thumbnail" />
      <p>{{ sp.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: true,
      message: "",
      sp: {}
    };
  },
  computed: {
    ...mapState(["SparePartStore"]) //Map 'sparepart' state from store/index
  },
  async created() {
    await this.loadSparepart();
  },
  methods: {
    ...mapActions(["getSparePart"]),
    async loadSparepart() {
      this.loading = true;
      this.message = "Henter reservedel...";

      await this.$store.dispatch("getSparePart", this.$route.params.id);

      if (!this.SparePartStore.sparepart) {
        this.$router.replace({
          name: "error",
          params: {
            title: "Ikke fundet!",
            message: "Reservedelen findes ikke."
          }
        });
      } else {
        this.sp = this.SparePartStore.sparepart;
        this.message = "";
        this.loading = false;
      }
    }
  }
};
</script>
