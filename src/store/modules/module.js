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
      const Modules = await api.getModules();
      commit("setModules", modules);
    },
    async getModule({ commit }, id) {
      var module = state.modules.find(m => m.id === id);
      if (!module) {
       api.getModule(id).then(resp => {
        module = resp.data;
    });
  }
  commit("setModule", Module);
  }
};

  export default {
    state,
    mutations,
    actions
  };