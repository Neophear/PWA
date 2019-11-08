<template>
  <div>
    <p v-if="message">{{ message }}</p>
    <div v-if="!loading">
      <h1>{{ sp.name }}</h1>
      <b-row>
        <b-col cols="2">
        <b-img thumbnail :src="sp.thumbnail" />
        </b-col>
        <b-col cols="2">
         <p>
          {{sp.id}}
        </p>
        </b-col>
      </b-row>
      <h2>Beskrivelse</h2>
      <b-row>
        <b-col cols ="2">
      <p>
        {{sp.description}}
      </p>
        </b-col>
      </b-row>
       </div>
       <div>
         <h3>Moduler</h3>
         <b-row>
           <b-col cols ="2">
             <b-img thumbnail src="https://placekitten.com/200/200"/>
           </b-col>
           <b-col cols="6">
          <p>
            modulnavn
          </p>
          <p>
            modulnummer
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
