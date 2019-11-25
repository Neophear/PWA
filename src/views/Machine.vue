<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <detailsview v-if="machine" v-bind:object="machine" />

    <div v-if="machineModules">
      <h3>Moduler</h3>
      <objectList v-bind:objects="machineModules" v-bind:routeName="'module'" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import DetailsView from "../components/DetailsView";
import ObjectList from "../components/ObjectList";

export default {
  name: "Machine",
  props: {
    id: Number
  },
  components: {
    detailsview: DetailsView,
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
        this.message = "Ingen moduler knyttet til denne maskine.";
        this.alertType = "warning";
      }
    }
  }
};
</script>
