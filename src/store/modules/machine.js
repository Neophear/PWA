import api from "api-client";

const state = {
  machines: [],
  error: {}
};

const getters = {
  getMachine: state => id => {
    return state.machines.find(m => m.id === id);
  },
  machinesLoaded: state => state.machines.length > 0
};

const mutations = {
  setMachines(state, machines) {
    state.machines = machines;
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
