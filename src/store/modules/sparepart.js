import api from "api-client";

const state = {
  spareparts: [],
  sparepart: {},
  moduleSpareparts: [] 
};

const mutations = {
  setSpareParts(state, spareparts) {
    state.spareparts = spareparts;
  },
  setSparePart(state, sparepart) {
    state.sparepart = sparepart;
  },
  setModuleSpareparts(state, moduleSpareparts) {
    state.moduleSpareparts = moduleSpareparts;
  }
};

const actions = {
  async getSpareParts({ commit }) {
    const resp = await api.getSpareParts();
    commit("setSpareParts", resp.data);
  },
  async getSparePart({ commit }, id) {
    var sparepart = state.spareparts.find(sp => sp.id === id);

    if (!sparepart) {
      const resp = await api.getSparePart(id);
      state.spareparts.push(resp.data);
    }

    commit("setSparePart", sparepart);
  },
  async getSparePartsByModule({ commit }, id) {
    var moduleSpareparts = state.moduleSpareparts.find(ms => ms.id === id);
    
    if (!moduleSpareparts) {
     const resp = await api.getSparePartsByModule(id);
     state.moduleSpareparts.push(resp.data);
    }
    commit("setModuleSpareparts", moduleSpareparts);
    }
    
};

export default {
  state,
  mutations,
  actions
};
