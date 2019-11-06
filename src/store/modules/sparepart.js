import api from "api-client";

const state = {
  spareparts: [],
  sparepart: {}
};

const mutations = {
  setSpareParts(state, spareparts) {
    state.spareparts = spareparts;
  },
  setSparePart(state, sparepart) {
    state.sparepart = sparepart;
  }
};

const actions = {
  async getSpareParts({ commit }) {
    const spareparts = await api.getSpareParts();
    commit("setSpareParts", spareparts);
  },
  async getSparePart({ commit }, id) {
    var sparepart = state.spareparts.find(sp => sp.id === id);
    if (!sparepart) sparepart = await api.getSparePart(id);
    commit("setSparePart", sparepart);
  }
};

export default {
  state,
  mutations,
  actions
};
