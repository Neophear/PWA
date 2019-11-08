//https://blog.sqreen.com/authentication-best-practices-vue/

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import api from "api-client";

const state = {
  //token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      // eslint-disable-next-line no-console
      api
        .authenticate(user)
        .then(resp => {
          if (resp.status === 200) {
            commit(AUTH_SUCCESS, resp);
            resolve(resp);
          } else {
            commit(AUTH_ERROR, resp);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      api
        .logOut()
        .then(resp => {
          if (resp.status === 200) {
            commit(AUTH_LOGOUT, resp);
            resolve(resp);
          } else {
            commit(AUTH_ERROR, resp);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
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
