import api from "api-client";

const state = {
  spareparts: [],
  sparepart: {},
  moduleSpareParts: [],
  error: {}
};

const getters = {
  modulesLoaded: state => state.modules.length > 0
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
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getSpareParts({ commit }) {
    await api
      .getSparePart()
      .then(resp => {
        commit("setSpareParts", resp.data);
        commit("setError", undefined);
      })
      .catch(error => {
        commit("setError", error);
      });
  },
  async getSparePart({ commit }, id) {
    var sparepart = state.spareparts.find(sp => sp.id === id);

    if (!sparepart) {
      await api
        .getSparePart(id)
        .then(resp => {
          commit("setSparePart", resp.data);
          commit("setError", undefined);
        })
        .catch(error => {
          commit("setError", error);
        });
    }

    commit("setSparePart", sparepart);
  },
  async getModuleSpareParts({ commit }, moduleId) {
    await api
      .getModuleSpareParts(moduleId)
      .then(resp => {
        commit("setModuleSpareParts", resp.data);
        commit("setError", undefined);
      })
      .catch(error => {
        commit("setError", error);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
