import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

//公用状态部分
const state = {
  isLoading: false,
  networkState: true,
};
const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateNetworkState(state, payload) {
    state.networkState = payload.networkState;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  getters
});

export default store;
