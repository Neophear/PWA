<template>
  <div id="app">
    <b-navbar toggleable="lg" v-if="isAuthenticated" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'users' }">Users</b-nav-item>
          <b-nav-item :to="{ name: 'spareparts' }">Reservedele</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
          <b-nav-item v-on:click="logOut">
            <v-icon name="log-out" />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "./store/actions/auth";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  data() {
    return {
      showHeader: false
    };
  },
  methods: {
    logOut() {
      this.$store
        .dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.icon {
  width: 24px;
  height: 24px;
  color: #2c3e50, 0.5;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
