// store/tokenCount.js

import { USAGE_PER_DAY } from '@/util/urls';

// import { BASE_URL } from 'constants';
const apiVersion = 'v1'; // process.env.API_VERSION;

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? `http://127.0.0.1:3002/api/${apiVersion}`
    : `https://example.com/api/${apiVersion}`;

type TokenCountState = {
  maxTokens: number;
  monthlyInput: Array<number>;
  monthlyOutput: Array<number>;
  currentMonth: number;
  currentYear: number;
};

export const useTokenCountStore = defineStore('tokenCount', {
  state: (): TokenCountState => {
    return {
      maxTokens: 100_000,
      monthlyInput: [],
      monthlyOutput: [],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  actions: {
    async changeMonth(month: number) {
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
        const { data, pending, error } = await useAuthAPI<{ monthly: { input: Array<number>; output: Array<number> } }>(
          USAGE_PER_DAY,
          'POST',
          {
            month: this.currentMonth,
            year: this.currentYear,
            accountId: user.username,
          },
        );

        if (error.value) {
          throw error.value;
        }
        this.monthlyInput = data?.value.monthly.input || [];
        this.monthlyOutput = data?.value.monthly?.output || [];
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
});
