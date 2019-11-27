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
  status: ""
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
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
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      dispatch("MachineStore/clearMachines", null, { root: true });
      dispatch("ModuleStore/clearModules", null, { root: true });
      dispatch("SparePartStore/clearSpareParts", null, { root: true });

      try {
        caches.delete("api-cache");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

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
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
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
