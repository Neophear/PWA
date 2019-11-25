<template>
  <div>
    <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
    <detailsview v-if="module" v-bind:object="module" />

    <div v-if="moduleSpareParts">
      <h3>Moduler</h3>
      <objectList
        v-bind:objects="moduleSpareParts"
        v-bind:routeName="'sparepart'"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import DetailsView from "../components/DetailsView";
import ObjectList from "../components/ObjectList";

export default {
  name: "Module",
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
      message: "Henter modul...",
      module: undefined,
      moduleSpareParts: []
    };
  },
  computed: {
    ...mapState(["ModuleStore", "SparePartStore"]),
    ...mapGetters("ModuleStore", ["modulesLoaded"])
  },
  async created() {
    await this.loadModule();
  },
  methods: {
    ...mapActions("ModuleStore", ["getModule"]),
    ...mapActions("SparePartStore", ["getModuleSpareParts"]),
    async loadModule() {
      await this.getModule(this.id);

      this.module = this.ModuleStore.module;

      if (this.module) {
        this.message = undefined;
        await this.loadModuleSpareParts();
      } else if (this.ModuleStore.error) {
        this.message = this.ModuleStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Modulet findes ikke.";
        this.alertType = "danger";
      }
    },
    async loadModuleSpareParts() {
      await this.getModuleSpareParts(this.id);

      this.moduleSpareParts = this.SparePartStore.moduleSpareParts;

      if (this.moduleSpareParts.length > 0) {
        this.message = undefined;
      } else if (this.SparePartStore.error) {
        this.message = this.SparePartStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Ingen reservedele knyttet til dette modul.";
        this.alertType = "warning";
      }
    }
  }
};
</script>
