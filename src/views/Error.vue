<template>
  <div>
    <b-alert show variant="danger">
      <h4>{{ title }}</h4>
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Fejl!"
    },
    message: {
      type: String,
      default: "Der skete en fejl."
    }
  }
  // computed: {
  //   message() {
  //     return this.$route.params.message || "Der skete en fejl.";
  //   }
  // }
};
</script>
