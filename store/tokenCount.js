// store/tokenCount.js
import { mande } from 'mande';
// import { BASE_URL } from 'constants';
const apiVersion = 'v1'; // process.env.API_VERSION;

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? `http://localhost:3002/api/${apiVersion}`
    : `https://example.com/api/${apiVersion}`;

const tokens = mande(BASE_URL + '/usage/month');

export const useTokenCountStore = defineStore('tokenCount', {
  state: () => {
    return {
      maxTokens: 100_000,
      monthTokensDaily: [
        12, 19, 3, 5, 2, 3, 8, 10, 15, 6, 12, 9, 16, 8, 5, 7, 20, 14, 11, 10, 15, 9, 6, 11, 8, 7, 14, 12, 18, 10,
      ],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  actions: {
    updateProgressInput(newValue) {
      this.progressInput = newValue;
    },
    updateProgressOutput(newValue) {
      this.progressOutput = newValue;
    },
    async changeMonth(month) {
      this.currentMonth = month;
      if (this.currentMonth == -1) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      }
      if (this.currentMonth == 12) {
        this.currentMonth = 0;
        this.currentYear += 1;
      }

      const res = await tokens.post({
        month: this.currentMonth,
        year: this.currentYear,
      });

      this.monthTokensDaily = res.data;
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
