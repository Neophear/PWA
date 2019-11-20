<template>
  <div>
    <p v-if="message">{{ message }}</p>
    <div v-if="!loading">
      <h4>{{ m.name }}</h4>
      <b-row align-h ="start">
        <b-col cols="1">
        <b-img thumbnail :src="m.thumbnailName" />
        </b-col>
        <b-col cols="0">
           M{{m.id}}
        </b-col>
      </b-row>
      <h6>Beskrivelse</h6>
      <b-row>
        <b-col>
      <p>
        {{m.description}}
      </p>
        </b-col>
      </b-row>
      <b-link
          v-for="ms in SparePartStore.loadModuleSpareParts"
          :to="{ name: 'moduleSpareParts', params: { id: ms.id } }"
          :key="ms.id"
          class="module"
        >
        <h4>{{ ms.name }}</h4>
      <b-row align-h ="start">
        <b-col cols="1">
        <b-img thumbnail :src="ms.thumbnailName" />
        </b-col>
        <b-col cols="0">
           RES{{ms.id}}
        </b-col>
      </b-row>
      <h6>Beskrivelse</h6>
      <b-row>
        <b-col>
      <p>
        {{ms.description}}
      </p>
        </b-col>
      </b-row>
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
      message: "",
      m: {},
      ms: {}
    };
  },
  computed: {
    ...mapState(["ModuleStore"]), //Map 'module' state from store/index
    ...mapState(["SparePartStore"]) // map 'moduleSparepart' state from store/index
  },
  async created() {
    await this.loadModule();
    await this.loadModuleSpareParts();
  },
  methods: {
    ...mapActions(["getModule"]),
    async loadModule() {
      this.loading = true;
      this.message = "Henter moduler...";

      await this.$store.dispatch("getModule", this.$route.params.id);

      if (!this.ModuleStore.module) {
        this.$router.replace({
          name: "error",
          params: {
            title: "Ikke fundet!",
            message: "modulet findes ikke."
          }
        });
      } else {
        this.m = this.ModuleStore.module;
        this.message = "";
        this.loading = false;
      }
    },    
      ...mapActions(["getSparePartsByModule"]),
    async loadModuleSpareParts() {
      this.loading = true;
      this.message = "Henter reservedel...";

      await this.$store.dispatch("getSparePartsByModule", this.$route.params.id);

      if (!this.SparePartStore.moduleSpareparts) {
        this.$router.replace({
          name: "error",
          params: {
            title: "Ikke fundet!",
            message: "reservedel findes ikke."
          }
        });
      } else {
        this.m = this.SparePartStore.moduleSpareparts;
        this.message = "";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
#app {
  padding-top: 5px;
}
.module {
  border-radius: 5px;
  background-color: #aaa;
  max-width: 400px;
}
m.module {
  color: black;
}
</style>