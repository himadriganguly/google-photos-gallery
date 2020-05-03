import api from "../../api/google";
import axios from "axios";

const state = {
  images: []
};

const getters = {
  allImages: state => state.images
};

const mutations = {
  setImages: (state, images) => {
    state.images = images;
  }
};

const actions = {
  async fetchImages({ rootState, commit }) {
    const { token } = rootState.auth;
    const response = await api.fetchImages(token);
    // console.log("response: ", response);
    commit("setImages", response.data.mediaItems);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
