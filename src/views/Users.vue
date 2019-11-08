<template>
  <div class="users">
    <h1>Brugere</h1>
    <span v-if="loading">Loading…</span>
    <ul v-else class="users">
      <li
        v-for="user in UserStore.users"
        :key="user.username"
        class="user-item"
      >
        <h1>{{ user.username }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState(["UserStore"])
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions(["getUsers"]),
    async loadUsers() {
      this.message = "Loading users...";
      await this.getUsers();
      this.message = "";
      this.loading = false;
    }
  }
};
</script>
