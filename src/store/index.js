import Vue from "vue";
import Vuex from "vuex";
import machine from "./modules/machine";
import sparepart from "./modules/sparepart";
import auth from "./modules/auth";
import module from "./modules/module";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    AuthStore: auth,
    MachineStore: machine,
    ModuleStore: module,
    SparePartStore: sparepart
  }
});
