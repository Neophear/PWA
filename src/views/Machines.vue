<template>
  <div>
    <p v-if="loading">{{ message }}</p>
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
      loading: true
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
    async loadMachines() {
      this.message = "Henter maskiner...";
      await this.getMachines();
      this.message = "";
      this.loading = false;
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