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
    ...mapGetters("ModuleStore", ["modulesLoaded", "getModule"]),
    ...mapGetters("SparePartStore", ["getSparePart"])
  },
  async created() {
    await this.loadModule();
  },
  methods: {
    ...mapActions("ModuleStore", ["getModules"]),
    async loadModule() {
      if (!this.modulesLoaded) await this.getModules();

      this.module = this.getModule(this.id);

      if (this.module) {
        this.message = undefined;

        if (this.module.moduleSpareParts.length > 0) {
          this.module.moduleSpareParts.forEach(async ms => {
            var sparePart = this.getSparePart(ms.sparePartId);

            if (sparePart) this.moduleSpareParts.push(sparePart);
            else {
              this.message = "En eller flere reservesdele blev ikke fundet.";
              this.alertType = "danger";
            }
          });
        } else {
          this.message = "Ingen reservedele knyttet til dette modul.";
          this.alertType = "warning";
        }
      } else if (this.ModuleStore.error) {
        this.message = this.ModuleStore.error.message;
        this.alertType = "danger";
      } else {
        this.message = "Modulet findes ikke.";
        this.alertType = "danger";
      }
    }
  }
};
</script>
