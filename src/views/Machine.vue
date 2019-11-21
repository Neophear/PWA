<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="machine">
      <b-img thumbnail :src="machine.thumbnailName" />
      <p>{{ machine.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Machine",
  props: {
    id: Number
  },
  data() {
    return {
      alertType: "info",
      message: "Henter maskine...",
      machine: {}
    };
  },
  computed: {
    ...mapGetters(["MachineStore"]),
    ...mapState(["MachineStore"]) //MachineStore's state gets bound to this.X
  },
  async created() {
    await this.loadMachine();
  },
  methods: {
    ...mapActions(["getMachines"]),
    async loadMachine() {
      if (!this.machinesLoaded) await this.$store.dispatch("getMachines");

      this.machine = this.$store.getters["getMachine"](this.id);

      if (this.machine) {
        this.message = undefined;
      } else if (this.error) {
        this.message = this.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Maskinen findes ikke.";
        this.alertType = "danger";
      }
    }
  }
};
</script>
