import api from "api-client";

const state = {
  modules: [],
  module: {},
  machineModules: [],
  error: {}
};

const getters = {
  modulesLoaded: state => state.modules.length > 0
};

const mutations = {
  setModules(state, modules) {
    state.modules = modules;
  },
  setModule(state, module) {
    state.module = module;
  },
  setMachineModules(state, modules) {
    state.machineModules = modules;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getMachineModules({ commit }, machineId) {
    await api
      .getMachineModules(machineId)
      .then(resp => {
        commit("setMachineModules", resp.data);
        commit("setError", undefined);
      })
      .catch(error => {
        commit("setError", error);
      });
  },
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
  async getModule({ commit }, id) {
    var module = state.modules.find(m => m.id === id);

    if (!module) {
      await api
        .getModule(id)
        .then(resp => {
          commit("setModule", resp.data);
          commit("setError", undefined);
        })
        .catch(error => {
          commit("setError", error);
        });
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
