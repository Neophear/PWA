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
    ...mapGetters("MachineStore", ["machinesLoaded", "getMachine"]),
    ...mapGetters("ModuleStore", ["getModule"])
  },
  async created() {
    await this.load();
  },
  methods: {
    ...mapActions("MachineStore", ["getMachines"]),
    async load() {
      if (!this.machinesLoaded) await this.getMachines();

      this.machine = this.getMachine(this.id);

      if (this.machine) {
        this.message = undefined;

        if (this.machine.machineModules.length > 0) {
          this.machine.machineModules.forEach(async mm => {
            var module = this.getModule(mm.moduleId);

            if (module) this.machineModules.push(module);
            else {
              this.message = "Et eller flere moduler blev ikke fundet.";
              this.alertType = "danger";
            }
          });
        } else {
          this.message = "Ingen moduler knyttet til denne maskine.";
          this.alertType = "warning";
        }
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
