<template>
  <div id="app">
    <p v-if="loading">{{ message }}</p>
    <div v-if="!loading">
      <b-container>
        <b-link
          v-for="sp in SparePartStore.spareparts"
          :to="{ name: 'sparepart', params: { id: sp.id } }"
          :key="sp.id"
          class="sparepart"
        >
          <b-media>
            <template v-slot:aside>
              <b-img thumbnail :src="sp.thumbnailName" />
            </template>
            <h4>{{ sp.name }}</h4>
            <p>{{ sp.description }}</p>
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
    ...mapState(["SparePartStore"]) //Map 'sparepart' state from store/index
  },
  async created() {
    await this.loadSpareParts();
  },
  methods: {
    ...mapActions(["getSpareParts"]),
    async loadSpareParts() {
      this.message = "Henter reservedele...";
      await this.getSpareParts();
      this.message = "";
      this.loading = false;
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
