<template>
  <div>
    <b-button v-b-modal.qrscanner aria-label="Åben QR-skanner">
      <v-icon name="camera" />
    </b-button>
    <b-modal
      id="qrscanner"
      ref="qrscanner"
      ok-only
      ok-title="Luk"
      ok-variant="secondary"
      title="Skan QR kode"
      @show="modalShow"
    >
      <b-alert :show="message" :variant="alertType">{{ message }}</b-alert>
      <div v-if="camerasupported">
        <qrcode-stream @decode="onDecode" />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      camerasupported: true,
      message: undefined,
      alertType: "danger"
    };
  },
  methods: {
    modalShow() {
      if (!this.camerasupported) {
        this.message = "Kamera er ikke supporteret af denne browser.";
        this.alertType = "danger";
      } else this.message = undefined;
    },
    async onDecode(decodeString) {
      var result = this.$store.getters["searchForBarcode"](decodeString);

      if (result) {
        this.$refs["qrscanner"].hide();
        this.$router.push({
          name: result.type,
          params: { id: result.id }
        });
      } else {
        this.message = decodeString + " ikke fundet";
        this.alertType = "warning";
      }
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
