<template>
  <div class="details">
    <b-modal
      id="imageModal"
      :title="object.name"
      :ok-only="true"
      ok-title="Luk"
    >
      <b-img :src="object.imageName" fluid-grow />
    </b-modal>

    <h1>
      <b-img thumbnail :src="object.thumbnailName" v-b-modal.imageModal />
      <b-badge>{{ object.name }}</b-badge>
    </h1>
    <p>Id: {{ object.id }}</p>
    <p>Stregkode: {{ object.barcode }}</p>
    <p>{{ object.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    }
  }
};
</script>
