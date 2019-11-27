<template>
  <div>
    <b-button v-b-modal.qrscanner aria-label="Åben QR-skanner">
      <v-icon name="camera" />
    </b-button>
    <b-modal id="qrscanner" ref="qrscanner" title="Skan QR kode">
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
      await api
        .getQR(decodeString)
        .then(resp => this.decodeResponse(resp.data))
        .catch(err => (this.code = err.message));
    },
    decodeResponse(data) {
      this.$refs["qrscanner"].hide();
      this.$router.push({
        name: data.type.toLowerCase(),
        params: { id: data.id }
      });
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
