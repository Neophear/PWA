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
    ...mapState(["MachineStore"]) //Map 'Machine' state from store/index
  },
  async created() {
    await this.loadMachine();
  },
  methods: {
    ...mapActions(["getMachine"]),
    async loadSparepart() {
      this.loading = true;
      this.message = "Henter maskine...";

      await this.$store.dispatch("getMachine", this.$route.params.id);

      if (!this.MachineStore.Machine) {
        this.$router.replace({
          name: "error",
          params: {
            title: "Ikke fundet!",
            message: "Reservedelen findes ikke."
          }
        });
      } else {
        this.mc = this.MachineStore.Machine;
        this.message = "";
        this.loading = false;
      }
    }
  }
};
</script>
