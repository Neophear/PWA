import Vue from "vue";
import Vuex from "vuex";
import sparepart from "./modules/sparepart";
import auth from "./modules/auth";


Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    SparePartStore: sparepart,
    AuthStore: auth,
    }
});
