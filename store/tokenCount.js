// store/tokenCount.js

// import { useAuthAPI } from '~/services/api';

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
      monthlyInput: [],
      monthlyOutput: [],
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
        const user = useUserStore();
        const { data, pending, error } = await useAuthAPI('/usage/perDay', 'POST', {
          month: this.currentMonth,
          year: this.currentYear,
          accountId: user.username,
        });
        if (error.value) {
          throw error.value;
        }
        this.monthlyInput = data?.value.monthly?.input || [];
        this.monthlyOutput = data?.value.monthly?.output || [];
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
