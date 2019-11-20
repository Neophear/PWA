
<template>
  <div>
    <b-button v-b-modal.qrscanner><v-icon name="camera"/></b-button>
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
      code: "Code here"
    };
  },
  methods: {
    async onDecode(decodeString) {
      this.code = decodeString;
      
      api.getQR(decodeString)
      .then(resp => this.decodeResponse(resp.data))
      .catch(err => {
        //Do errorhandling
        // eslint-disable-next-line no-console
        console.log(err);
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
