import Vue from "vue";
import Vuex from "vuex";
import machine from "./modules/machine";
import sparepart from "./modules/sparepart";
import auth from "./modules/auth";
import module from "./modules/module";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  getters: {
    searchForBarcode: state => barcode => {
      var machine = state.MachineStore.machines.find(m => m.barcode == barcode);
      if (machine) return { type: "machine", id: machine.id };

      var module = state.ModuleStore.modules.find(m => m.barcode == barcode);
      if (module) return { type: "module", id: module.id };

      var sparepart = state.SparePartStore.spareparts.find(
        s => s.barcode == barcode
      );
      if (sparepart) return { type: "sparepart", id: sparepart.id };

      return undefined;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async loadObjects({ commit }) {
      if (!this.state.MachineStore.machinesLoaded)
        await this.dispatch("MachineStore/getMachines");

      if (!this.state.ModuleStore.modulesLoaded)
        await this.dispatch("ModuleStore/getModules");

      if (!this.state.SparePartStore.sparePartsLoaded)
        await this.dispatch("SparePartStore/getSpareParts");
    }
  },
  modules: {
    AuthStore: auth,
    MachineStore: machine,
    ModuleStore: module,
    SparePartStore: sparepart
  }
});
