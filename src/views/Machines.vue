<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="!loading">
      <objectlist
        v-bind:objects="MachineStore.machines"
        v-bind:routeName="'machine'"
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
      message: "Henter maskiner..."
    };
  },
  computed: {
    ...mapState(["MachineStore"]), //Map 'machine' state from store/index
    ...mapGetters(["MachineStore/machinesLoaded"]) //Could also be mapGetters("MachineStore", ["machinesLoaded"])
  },
  async created() {
    await this.loadMachines();
  },
  methods: {
    ...mapActions("MachineStore", ["getMachines"]),
    setMessage(msg, type) {
      this.message = msg;
      this.alertType = type;
    },
    async loadMachines() {
      if (!this.machinesLoaded) await this.getMachines();

      if (this.MachineStore.machines.length > 0) {
        this.setMessage(undefined);
      } else if (this.MachineStore.error) {
        this.setMessage(this.MachineStore.error.message, "danger");
      } else {
        this.setMessage("Ingen maskiner tilgængelige.", "warning");
      }

      this.loading = false;
    }
  }
};
</script>
