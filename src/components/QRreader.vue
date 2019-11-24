<template>
  <div>
    <b-button v-b-modal.qrscanner>
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
export default {
  data() {
    return {
      camerasupported: true,
      code: "Code here"
    };
  },
  methods: {
    onDecode(decodeString) {
      this.code = decodeString;
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
