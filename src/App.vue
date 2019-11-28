<template>
  <div id="app">
    <div v-if="isAuthenticated" class="topBar">
      <b-button
        v-if="this.$route.name != 'home'"
        @click="goBack"
        aria-label="Tilbage"
      >
        <v-icon name="arrow-left-circle" />
      </b-button>
      <qrreader />
      <b-button @click="logOut" aria-label="Log ud">
        <v-icon name="log-out" />
      </b-button>
      <div v-if="this.$store.state.AuthStore.username">
        Velkommen {{ this.$store.state.AuthStore.username }}
      </div>
    </div>
    <main>
      <router-view />
    </main>
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
  async mounted() {
    await this.$store.dispatch("loadObjects");
  },
  methods: {
    logOut() {
      this.$store
        .dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
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
.topBar > * {
  margin-right: 10px;
  display: inline-block;
}
</style>
