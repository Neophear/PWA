import api from "api-client";

const state = {
  machines: [],
  error: {}
};

const getters = {
  getMachine: state => id => state.machines.find(m => m.id === id),
  machinesLoaded: state => state.machines.length > 0
};

const mutations = {
  setMachines(state, machines) {
    state.machines = machines;
  },
  clearMachines(state) {
    state.machines = [];
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getMachines({ commit }) {
    await api
      .getMachines()
      .then(resp => {
        commit("setMachines", resp.data);
        commit("setError", undefined);
      })
      .catch(error => {
        commit("setError", error);
      });
  },
  clearMachines({ commit }) {
    commit("clearMachines");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
