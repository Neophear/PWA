<template>
  <div>
    <p v-if="message">{{ message }}</p>
    <div v-if="!loading">
      <h4>{{ sp.name }}</h4>
      <b-row align-h ="start">
        <b-col cols="1">
        <b-img thumbnail :src="sp.thumbnailName" />
        </b-col>
        <b-col cols="1">
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
      sp: {}
    };
  },
  computed: {
    ...mapState(["SparePartStore"]) //Map 'sparepart' state from store/index
  },
  async created() {
    await this.loadSparepart();
  },
  methods: {
    ...mapActions(["getSparePart"]),
    async loadSparepart() {
      this.loading = true;
      this.message = "Henter reservedel...";

      await this.$store.dispatch("getSparePart", this.$route.params.id);

      if (!this.SparePartStore.sparepart) {
        this.$router.replace({
          name: "error",
          params: {
            title: "Ikke fundet!",
            message: "Reservedelen findes ikke."
          }
        });
      } else {
        this.sp = this.SparePartStore.sparepart;
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

