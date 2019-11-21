<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <div v-if="!loading">
      <b-link
        v-for="mc in MachineStore.machines"
        :to="{ name: 'machine', params: { id: mc.id } }"
        :key="mc.id"
        class="machine"
      >
        <div>
          <h1>{{ mc.name }}</h1>
          <p>{{ mc.description }}</p>
        </div>
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: true,
      alertType: "danger"
    };
  },
  computed: {
    ...mapState(["MachineStore"]) //Map 'machine' state from store/index
  },
  async created() {
    await this.loadMachines();
  },
  methods: {
    ...mapActions(["getMachines"]),
    setMessage(msg, type) {
      this.message = msg;
      this.alertType = type;
    },
    async loadMachines() {
      this.setMessage("Henter maskiner...", "info");
      this.getMachines()
        .then(() => {
          this.setMessage("");
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          if (!err.response) this.setMessage("Network error.", "danger");
          else if (err.response.status === 401)
            //TODO: Should display correct message
            this.message = "Wrong username or password.";
        });
    }
  }
};
</script>

<style scoped>
.sparepart {
  border-radius: 5px;
  background-color: #aaa;
  max-width: 400px;
}
</style>
