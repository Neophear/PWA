import api from "api-client";

const state = {
  spareparts: [],
  sparepart: {},
  moduleSpareParts: []
};

const mutations = {
  setSpareParts(state, spareparts) {
    state.spareparts = spareparts;
  },
  setSparePart(state, sparepart) {
    state.sparepart = sparepart;
  },
  setModuleSpareParts(state, moduleSpareParts) {
    state.moduleSpareParts = moduleSpareParts;
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
      sparepart = resp.data;
    }

    commit("setSparePart", sparepart);
  },
  async getSparePartsByModule({ commit }, id) {
    const resp = await api.getSparePartsByModule(id);
    commit("setModuleSpareParts", resp.data);
  }
};

export default {
  state,
  mutations,
  actions
};
