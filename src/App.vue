<template>
  <div id="app">
    <b-container v-if="isAuthenticated" class="topBar">
      <b-row>
        <b-button v-if="this.$route.name != 'home'" @click="goBack">
          <v-icon name="arrow-left-circle" />
        </b-button>
        <qrreader />
      </b-row>
    </b-container>
    <router-view />
    <b-navbar
      fixed="bottom"
      toggleable="lg"
      v-if="isAuthenticated && this.$route.name != 'home'"
      type="dark"
      variant="dark"
    >
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home' }">Forside</b-nav-item>
          <b-nav-item :to="{ name: 'machines' }">Maskiner</b-nav-item>
          <b-nav-item :to="{ name: 'modules' }">Moduler</b-nav-item>
          <b-nav-item :to="{ name: 'spareparts' }">Reservedele</b-nav-item>
          <b-nav-item v-on:click="logOut">
            <v-icon name="log-out" />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_LOGOUT } from "./store/actions/auth";
import QRreader from "./components/QRreader";

export default {
  components: {
    qrreader: QRreader
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    logOut() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
#app {
  padding: 10px 10px 50px 10px;
  //padding-bottom: 50px; //so that menu doesn't hide bottom page content
}
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
.topBar {
  margin-bottom: 10px;
}
.topBar button {
  margin-right: 10px;
}
</style>
