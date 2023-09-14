// store/tokenCount.js
// import { BASE_URL } from 'constants';
const apiVersion = 'v1'; // process.env.API_VERSION;

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? `http://127.0.0.1:3002/api/${apiVersion}`
    : `https://example.com/api/${apiVersion}`;

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
      try {
        const { data, pending } = await useFetch(BASE_URL + '/usage/month', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            month: this.currentMonth,
            year: this.currentYear,
          },
          credentials: 'include', // fetch
        });

        this.monthTokensDaily = data?.value.month || [];
      } catch (error) {
        console.error(error);
      }
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
