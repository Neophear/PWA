
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
//import { mapActions, mapState } from "vuex";
//import {getMachine, getModule, getSparePart } from "./../api/server/index";

export default {
  data() {
    return {
      camerasupported: true,
      code: "Code here"
    };
  },
  methods: {
    async onDecode(decodeString) {
      //this.code = 'hej';
      const search = await this.$store.dispatch("getQR", decodeString)
       if (search.type == "machine") {
         
         //getMachine(search.id)
         router.push({ name: 'machine', params: { id: search.id } })
         //this.router.push('http://localhost:8080/sparepart'+ search.id );
         
       }

       if(search.type == "module"){
         router.push({ name: 'module', params: { id: search.id } })
       }

       if(search.type == "sparepart"){
         router.push({ name: 'sparepart', params: { id: search.id } })
         
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
