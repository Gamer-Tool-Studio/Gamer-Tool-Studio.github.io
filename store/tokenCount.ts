// store/tokenCount.js

// import { BASE_URL } from 'constants';

interface TokenCountState {
  availableInputTokens: number
  availableOutputTokens: number
  monthlyInput: Array<number>
  monthlyOutput: Array<number>
  currentMonth: number
  currentYear: number
  chatsTotal: number
  chatsToday: number
}

interface UsageResponse {
  monthly: { input: Array<number>, output: Array<number> }
  chatsTotal: number
  chatsToday: number
}

export const useTokenCountStore = defineStore('tokenCount', {
  state: (): TokenCountState => {
    return {
      availableInputTokens: 0,
      availableOutputTokens: 0,
      monthlyInput: [],
      monthlyOutput: [],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      chatsTotal: 0,
      chatsToday: 0,
    }
  },
  actions: {
    async getBalance() {
      try {
        const { data, error } = await useAuthAPI<{
          availableInputTokens: number
          availableOutputTokens: number
        }>(BILLING_BALANCE, 'GET')

        if (error.value)
          throw error.value

        this.availableInputTokens = data?.value.availableInputTokens || 0
        this.availableOutputTokens = data?.value.availableOutputTokens || 0
      }
      catch (error) {
        console.error(error)
      }
    },

    async changeMonth(month: number) {
      this.currentMonth = month
      if (this.currentMonth === -1) {
        this.currentMonth = 11
        this.currentYear -= 1
      }
      if (this.currentMonth === 12) {
        this.currentMonth = 0
        this.currentYear += 1
      }
      try {
        const user = useUserStore()
        const { data, error } = await useAuthAPI<UsageResponse>(USAGE_PER_DAY, 'POST', {
          month: this.currentMonth,
          year: this.currentYear,
          accountId: user.username,
        })

        if (error.value)
          throw error.value

        this.monthlyInput = data?.value.monthly.input || []
        this.monthlyOutput = data?.value.monthly?.output || []
        this.chatsTotal = data?.value.chatsTotal || 0
        this.chatsToday = data?.value.chatsToday || 0
      }
      catch (error) {
        console.error(error)
      }
    },
  },
  getters: {},
})
