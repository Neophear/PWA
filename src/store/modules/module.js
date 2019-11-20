import api from "api-client";

const state = {
  modules: [],
  module: {}
};

const mutations = {
  setModules(state, modules) {
    state.modules = modules;
  },
  setModule(state, module) {
    state.module = module;
  }
};

const actions = {
  async getModules({ commit }) {
    const resp = await api.getModules();
    commit("setModules", resp.data);
  },
  async getModule({ commit }, id) {
    var module = state.modules.find(m => m.id === id);

    if (!module) {
      const resp = await api.getModule(id);
      module = resp.data;
    }

    commit("setModule", module);
  }
};

export default {
  state,
  mutations,
  actions
};
