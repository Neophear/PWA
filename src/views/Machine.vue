<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="machine">
      <b-modal
        id="imageModal"
        :title="machine.name"
        :ok-only="true"
        ok-title="Luk"
      >
        <b-img :src="machine.imageName" fluid-grow />
      </b-modal>

      <h1>
        <b-img thumbnail :src="machine.thumbnailName" v-b-modal.imageModal />
        <b-badge>{{ machine.name }}</b-badge>
      </h1>
      <p>Id: {{ machine.id }}</p>
      <p>Stregkode: {{ machine.barcode }}</p>
      <p>{{ machine.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Machine",
  props: {
    id: Number
  },
  data() {
    return {
      alertType: "info",
      message: "Henter maskine...",
      machine: undefined
    };
  },
  computed: {
    ...mapState(["MachineStore"]),
    ...mapGetters("MachineStore", ["machinesLoaded", "getMachine"])
  },
  async created() {
    await this.loadMachine();
  },
  methods: {
    ...mapActions("MachineStore", ["getMachines"]),
    async loadMachine() {
      if (!this.machinesLoaded) await this.getMachines();

      this.machine = this.getMachine(this.id);

      if (this.machine) {
        this.message = undefined;
      } else if (this.MachineStore.error) {
        this.message = this.MachineStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Maskinen findes ikke.";
        this.alertType = "danger";
      }
    }
  }
};
</script>

<style scoped>
.badge {
  margin: 0 10px;
  vertical-align: top;
}
</style>
