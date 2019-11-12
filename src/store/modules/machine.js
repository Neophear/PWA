import api from "api-client";

const state = {
  machines: [],
  machine: {}
};

const mutations = {
  setMachines(state, machines) {
    state.machines = machines;
  },
  setMachine(state, machine) {
    state.machine = machine;
  }
};

const actions = {
    async getMachines({ commit }) {
      const machines = await api.getMachines();
      commit("setMachines", machines);
    },
    async getMachine({ commit }, id) {
      var machine = state.machine.find(sp => sp.id === id);
      if (!machine) machine = await api.getMachine(id);
      commit("setMachine", machine);
    }
  };

  export default {
    state,
    mutations,
    actions
  };