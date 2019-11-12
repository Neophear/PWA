import Vue from "vue";
import Vuex from "vuex";
import machine from "./modules/machine";
import sparepart from "./modules/sparepart";
import auth from "./modules/auth";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    SparePartStore: sparepart,
    MachineStore: machine,
    AuthStore: auth,
    UserStore: user
  }
});
