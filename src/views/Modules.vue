<template>
  <div id="app">
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>

    <div v-if="!loading">
      <objectlist
        v-bind:objects="ModuleStore.modules"
        v-bind:routeName="'module'"
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
      message: "Henter moduler..."
    };
  },
  computed: {
    ...mapState(["ModuleStore"]), //Map 'module' state from store/index
    ...mapGetters(["ModuleStore/modulesLoaded"])
  },
  async created() {
    await this.loadModules();
  },
  methods: {
    ...mapActions("ModuleStore", ["getModules"]),
    setMessage(msg, type) {
      this.message = msg;
      this.alertType = type;
    },
    async loadModules() {
      if (!this.modulesLoaded) await this.getModules();

      if (this.ModuleStore.modules.length > 0) {
        this.setMessage(undefined);
      } else if (this.ModuleStore.error) {
        this.setMessage(this.ModuleStore.error.message, "danger");
      } else {
        this.setMessage("Ingen moduler tilgængelige.", "warning");
      }

      this.loading = false;
    }
  }
};
</script>
