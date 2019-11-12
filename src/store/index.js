import Vue from "vue";
import Vuex from "vuex";
import api from "api-client";
import sparepart from "./modules/sparepart.js";
import machine from "./modules/machine.js";

import { AUTH_REQUEST, GET_USERS } from "./mutation-types";

Vue.use(Vuex);

const actions = {
  async authRequest({ commit }, username, password) {
    //const authRequest = await dataService.authRequest(username, password);
    var u = this.$store.users.find(
      u => u.username === username && u.password === password
    );

    if (!u) commit(AUTH_REQUEST, null);
    else commit(AUTH_REQUEST, { username: u.username, token: u.token });
  },
  async getUsersAction({ commit }) {
    //Usually the 'Action'-suffix is not needed, but used here for clarification
    const users = await api.getUsers();
    commit(GET_USERS, users);
    //api.getUsers().then(users => commit(GET_USERS, users)); //Put fetched users into app state
  }
};

const state = () => ({
  users: []
});

const mutations = {
  [GET_USERS](state, users) {
    state.users = users;
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  modules: {
    SparePartStore: sparepart,
    MachineStore: machine
  }
});
