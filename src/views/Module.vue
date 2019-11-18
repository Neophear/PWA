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
      
        <h4>{{ sp.name }}</h4>
      <b-row align-h ="start">
        <b-col cols="1">
        <b-img thumbnail :src="sp.thumbnailName" />
        </b-col>
        <b-col cols="0">
           RES{{sp.id}}
        </b-col>
      </b-row>
      <h6>Beskrivelse</h6>
      <b-row>
        <b-col>
      <p>
        {{sp.description}}
      </p>
        </b-col>
      </b-row>
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
      m: {}
    };
  },
  computed: {
    ...mapState(["ModuleStore"]) //Map 'module' state from store/index
  },
  async created() {
    await this.loadModule();
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
    }
  }
};
</script>

<style scoped>
#app {
  padding-top: 5px;
}
.sparepart {
  border-radius: 5px;
  background-color: #aaa;
  max-width: 400px;
}
a.sparepart {
  color: black;
}
</style>