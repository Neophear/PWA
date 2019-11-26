//https://blog.sqreen.com/authentication-best-practices-vue/

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import api from "api-client";

const state = {
  token: localStorage.getItem("user-token") || "", //Should not be stored in localStorage: https://auth0.com/docs/security/store-tokens
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  [AUTH_REQUEST]: ({ commit, dispatch, getters, rootGetters }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      api
        .authenticate(user)
        .then(function(resp) {
          localStorage.setItem("user-token", resp.data.token);
          commit(AUTH_SUCCESS, resp);
          dispatch("MachineStore/getMachines", null, { root: true });
          dispatch("ModuleStore/getModules", null, { root: true });
          dispatch("SparePartStore/getSpareParts", null, { root: true });
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      dispatch("MachineStore/clearMachines", null, { root: true });
      dispatch("ModuleStore/clearModules", null, { root: true });
      dispatch("SparePartStore/clearSpareParts", null, { root: true });
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
