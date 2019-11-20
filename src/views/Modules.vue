<template>
  <div id="app">
    <p v-if="loading">{{ message }}</p>
    <div v-if="!loading">
      <b-container>
        <b-link
          v-for="m in ModuleStore.modules"
          :to="{ name: 'module', params: { id: m.id } }"
          :key="m.id"
          class="module"
        >
          <b-media>
            <template v-slot:aside>
              <b-img thumbnail :src="m.thumbnailName" />
            </template>
            <h4>{{ m.name }}</h4>
            <p>{{ m.description }}</p>
          </b-media>
        </b-link>
      </b-container>
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
    ...mapState(["ModuleStore"]) //Map 'module' state from store/index
  },
  async created() {
    await this.loadModules();
  },
  methods: {
    ...mapActions(["getModules"]),
    async loadModules() {
      this.message = "Henter moduler...";
      await this.getModules();
      this.message = "";
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.module {
  border-radius: 5px;
  background-color: #aaa;
  max-width: 400px;
}
.module > div {
  padding: 5px 0px;
}
m.module {
  color: black;
}
</style>