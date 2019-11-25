<template>
  <div>
    <b-link
      v-for="o in objects"
      :to="{ name: routeName, params: { id: o.id } }"
      :key="o.id"
      class="list"
    >
      <b-media>
        <template v-slot:aside>
          <b-img thumbnail :src="o.thumbnailName" />
        </template>
        <h4>{{ o.name }}</h4>
        <p>{{ o.description }}</p>
      </b-media>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    objects: {
      type: Array,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  }
};
</script>
