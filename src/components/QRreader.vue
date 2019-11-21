
<template>
  <div>
    <b-button v-b-modal.qrscanner id="button">
      <v-icon name="camera" />
    </b-button>
    <b-modal id="qrscanner" title="Skan QR kode">
      <b-alert variant="danger" :show="!camerasupported"
        >Camera not supported!</b-alert
      >
      <div v-if="camerasupported">
        <qrcode-stream @decode="onDecode" />
        <p>{{ code }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from "api-client";

export default {
  data() {
    return {
      camerasupported: true,
      code: "Indlæs QR kode"
    };
  },
  methods: {
    async onDecode(decodeString) {
      //code = decodeString;
      
      api.getQR(decodeString)
      .then(resp => this.decodeResponse(resp.data))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.code = "Kunne ikke indlæse QR, prøv igen";
      });
    },
    decodeResponse(data) {
      // eslint-disable-next-line no-console
      console.log(data);

      this.$router.push({ name: data.type.toLowerCase(), params: { id: data.id }});
    }
    
    
  },
  mounted() {
    this.camerasupported =
      navigator &&
      (navigator.getUserMedia ||
        (navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  }
};
</script>

<style scoped>
#button {
  margin: 5px;
}
</style>
