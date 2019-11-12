import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import BootstrapVue from "bootstrap-vue";
import "./custom.scss";
import icons from "vue-icon"; //https://qinshenxue.github.io/vue-icon/

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(icons, "v-icon");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
