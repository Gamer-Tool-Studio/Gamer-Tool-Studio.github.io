// store/tokenCount.js

export const useTokenCountStore = defineStore("tokenCount", {
  state: () => {
    return {
      progressInput: 0,
      progressOutput: 0,
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
