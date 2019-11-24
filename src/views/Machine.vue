<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="machine" class="details">
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

    <div v-if="machineModules">
      <h3>Moduler</h3>
      <objectList v-bind:objects="machineModules" v-bind:routeName="'module'" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ObjectList from "../components/ObjectList";

export default {
  name: "Machine",
  props: {
    id: Number
  },
  components: {
    objectList: ObjectList
  },
  data() {
    return {
      alertType: "info",
      message: "Henter maskine...",
      machine: undefined,
      machineModules: []
    };
  },
  computed: {
    ...mapState(["MachineStore", "ModuleStore"]),
    ...mapGetters("MachineStore", ["machinesLoaded", "getMachine"])
  },
  async created() {
    await this.loadMachine();
  },
  methods: {
    ...mapActions("MachineStore", ["getMachines"]),
    ...mapActions("ModuleStore", ["getMachineModules"]),
    async loadMachine() {
      if (!this.machinesLoaded) await this.getMachines();

      this.machine = this.getMachine(this.id);

      if (this.machine) {
        this.message = undefined;
        await this.loadMachineModules();
      } else if (this.MachineStore.error) {
        this.message = this.MachineStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Maskinen findes ikke.";
        this.alertType = "danger";
      }
    },
    async loadMachineModules() {
      await this.getMachineModules(this.machine.id);

      this.machineModules = this.ModuleStore.machineModules;

      if (this.machineModules.length > 0) {
        this.message = undefined;
      } else if (this.ModuleStore.error) {
        this.message = this.ModuleStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Ingen moduler knyttet til maskinen.";
        this.alertType = "warning";
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
