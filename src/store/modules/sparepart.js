import api from "api-client";

const state = {
  spareparts: [],
  error: {}
};

const getters = {
  getSparePart: state => id => state.spareparts.find(s => s.id === id),
  sparePartsLoaded: state => state.spareparts.length > 0
};

const mutations = {
  setSpareParts(state, spareparts) {
    state.spareparts = spareparts;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getSpareParts({ commit }) {
    await api
      .getSpareParts()
      .then(resp => {
        commit("setSpareParts", resp.data);
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
