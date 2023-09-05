// store/tokenCount.js
import { createStore } from 'vuex';


export const useTokenCountStore = defineStore("tokenCount", {
  state() {
    return {
      progressInput: 0,
      progressOutput: 0,
    };
  },
  mutations: {
    setProgressInput(state, newValue) {
      state.progressInput = newValue;
    },
    setProgressOutput(state, newValue) {
      state.progressOutput = newValue;
    },
  },
  actions: {
    updateProgressInput({ commit }, newValue) {
      commit('setProgressInput', newValue);
    },
    updateProgressOutput({ commit }, newValue) {
      commit('setProgressOutput', newValue);
    },
  },
  getters: {
    getProgressInput(state) {
      return state.progressInput;
    },
    getProgressOutput(state) {
      return state.progressOutput;
    },
  },
});
