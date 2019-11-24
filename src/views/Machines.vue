<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="!loading">
      <b-link
        v-for="m in MachineStore.machines"
        :to="{ name: 'machine', params: { id: m.id } }"
        :key="m.id"
        class="machine"
      >
        <b-media>
          <template v-slot:aside>
            <b-img thumbnail :src="m.thumbnailName" />
          </template>
          <h4>{{ m.name }}</h4>
          <p>{{ m.description }}</p>
        </b-media>
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
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

<style scoped>
.machine {
  border-radius: 5px;
  background-color: #aaa;
  max-width: 400px;
}
a.machine {
  color: black;
}
</style>
