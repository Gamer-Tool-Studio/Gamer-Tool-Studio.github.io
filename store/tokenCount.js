// store/tokenCount.js

export const useTokenCountStore = defineStore("tokenCount", {
  state: () => {
    return {
      progressInput: 450000,
      progressOutput: 501000,
    };
  },
  actions: {
    updateProgressInput(newValue) {
      this.progressInput = newValue;
    },
    updateProgressOutput(newValue) {
      this.progressOutput = newValue;
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
