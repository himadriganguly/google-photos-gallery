import url from "url";
import qs from "qs";

import api from "../../api/google";
import { router } from "../../main";

const state = {
  token: window.localStorage.getItem("google_access_token")
};

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  login: () => {
    api.login();
  },
  finalizeLogin: async ({ commit, state }, url) => {
    const params = new URL(url).search.substring(1);
    const code = qs.parse(params).code;
    window.localStorage.setItem("google_token", code);
    const access_token = await api.getGoogleAccessToken(code);
    commit("setToken", access_token);
    window.localStorage.setItem("google_access_token", access_token);
    router.push("/");
  },
  logout: ({ commit }) => {
    commit("setToken", null);
    window.localStorage.removeItem("google_token");
    window.localStorage.removeItem("google_access_token");
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
