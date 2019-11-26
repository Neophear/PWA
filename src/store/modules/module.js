import api from "api-client";

const state = {
  modules: [],
  error: {}
};

const getters = {
  getModule: state => id => state.modules.find(m => m.id === id),
  modulesLoaded: state => state.modules.length > 0
};

const mutations = {
  setModules(state, modules) {
    state.modules = modules;
  },
  clearModules(state) {
    state.modules = [];
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getModules({ commit }) {
    await api
      .getModules()
      .then(resp => {
        commit("setModules", resp.data);
        commit("setError", undefined);
      })
      .catch(error => {
        commit("setError", error);
      });
  },
  clearModules({ commit }) {
    commit("clearModules");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
