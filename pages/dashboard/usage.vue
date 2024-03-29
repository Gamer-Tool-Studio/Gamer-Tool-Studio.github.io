<script setup>
import { storeToRefs } from 'pinia'

// import storeToRefs helper hook from pinia
// Chart
import { Bar } from 'vue-chartjs'

useHead({
  title: 'Usage',
})

const tokenStore = useTokenCountStore()

const {
  monthlyInput,
  monthlyOutput,
  currentMonth,
  availableInputTokens,
  availableOutputTokens,
  chatsTotal,
  chatsToday,
} = storeToRefs(tokenStore)

const consumedInputTokens = computed(() => monthlyInput.value.reduce((a, b) => a + b, 0))
const consumedOutputTokens = computed(() => monthlyOutput.value.reduce((a, b) => a + b, 0))
const progressInputPercentage = computed(() => `${(consumedInputTokens.value / availableInputTokens.value) * 100}%`)
const progressOutputPercentage = computed(() => `${(consumedOutputTokens.value / availableOutputTokens.value) * 100}%`)

const changeMonth = tokenStore.changeMonth
const getBalance = tokenStore.getBalance

const hasPreviousMonth = true
const hasNextMonth = true
const isCumulative = ref(false)

const currentMonthName = computed(() => getMonthName(currentMonth.value))
const labels = computed(() => getMonthDays(currentMonth.value))

changeMonth(currentMonth)
getBalance()

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Input tokens',
      backgroundColor: '#6200EE',
      data: isCumulative.value ? getCumulativeTokens(monthlyInput.value) : monthlyInput.value,
    },
    {
      label: 'Output tokens',
      backgroundColor: '#C834A4',
      data: isCumulative.value ? getCumulativeTokens(monthlyOutput.value) : monthlyOutput.value,
    },
  ],
}))
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
})
</script>

<template>
  <v-container class="usage-page">
    <v-row>
      <v-col cols="12">
        <h1>Usage</h1>
      </v-col>
      <v-col cols="12" class="intro-text">
        <p>
          Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data
          may be delayed up to 5 minutes.
        </p>
      </v-col>
      <v-col cols="8" class="month-title-section">
        <v-btn v-if="hasPreviousMonth" flat class="switch-month" @click="changeMonth(currentMonth - 1)">
          &lt;
        </v-btn>
        <v-btn flat class="month-title" width="120">
          {{ currentMonthName }}
        </v-btn>
        <v-btn v-if="hasNextMonth" flat class="switch-month" @click="changeMonth(currentMonth + 1)">
          &gt;
        </v-btn>
      </v-col>
      <v-col cols="4" class="daily-section">
        <div class="switch-field">
          <label for="usage-view-radio-daily" @click="isCumulative = false">Daily</label>
          <label for="usage-view-radio-cumulative" @click="isCumulative = true">Cumulative</label>
        </div>
      </v-col>
      <v-col cols="12" class="chart-title">
        <h3>Daily usage (1,000 tokens)</h3>
      </v-col>
      <v-col cols="12" class="chart-area">
        <Bar :data="chartData" :options="chartOptions" />
      </v-col>
      <v-row>
        <v-col>
          <v-card class="counter-cards">
            <v-col cols="12" class="available-tokens">
              <h2>Input Tokens</h2>
              <h3>{{ formatTokens(availableInputTokens) }} available tokens</h3>
              <h4>{{ formatTokens(consumedInputTokens) }} used tokens</h4>
            </v-col>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="counter-cards">
            <v-col cols="12" class="available-tokens">
              <h2>Output Tokens</h2>
              <h3>{{ formatTokens(availableOutputTokens) }} available tokens</h3>
              <h4>{{ formatTokens(consumedOutputTokens) }} used tokens</h4>
            </v-col>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="counter-cards">
            <v-col cols="12" class="available-tokens">
              <h2>Interactions</h2>
              <h3>{{ chatsTotal }} chats made all time</h3>
              <h4>{{ chatsToday }} chats made today</h4>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-btn class="button" color="none" to="/pricing">
            Add credits
          </v-btn>
        </v-col>
      </v-row>
      <!--
      <v-col cols="4" class="current-subscription">
        <h3>Active subsciption pack</h3>
      </v-col>
      <v-col cols="4" class="current-pack">
        <div class="current-box">
          <h4>Free Trial</h4>
        </div>
      </v-col>
      <v-col cols="4" class="upgrade-section">
        <button class="button">Upgrade account</button>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<style lang="scss">
.counter-cards {
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;
  --background: rgba(98, 0, 238, 0.1);
  background-image: linear-gradient(90deg, transparent, var(--background), transparent);
  background-size: 200%;
}

.usage-page p {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.month-title-section {
  display: inline-flex;
}

.month-title-section h3 {
  margin-right: 10px;
}

.month-title-section a {
  text-decoration: none;
}

.month-title .v-btn__content {
  font-size: 18px;
  font-weight: 800;
}

.switch-field {
  background-color: #f7f7f8;
  border-radius: 3px;
  display: flex;
  position: relative;
}

.switch-field label {
  width: 50%;
  text-align: center;
  padding: 3px;
  font-size: 18px;
  font-family: 'Bebas Neue';
}

.switch-field label:hover {
  cursor: pointer;
  background-color: #d9d9e3;
}

.switch-month {
  padding-right: 0;
  padding-left: 0;
  font-weight: 600;
  font-size: 20px;
}

.chart-title {
  padding-top: 0;
  padding-bottom: 0;
}

.chart-title h3 {
  font-size: 16px;
  font-weight: 700;
}

.chart-area {
  height: 300px;
}

.current-subscription {
  display: flex;
  align-items: center;
}
.current-subscription h3 {
  font-size: 18px;
  font-weight: 700;
}

.progress-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0 !important;
  padding-top: 0 !important ;
}

.progress-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.progress-bar {
  height: 10px;
  border-radius: 10px;
  flex-grow: 1;
  &.input-tokens {
    background-image: linear-gradient(
      90deg,
      rgba(98, 0, 238, 1) v-bind(progressInputPercentage),
      #ececf1 v-bind(progressInputPercentage)
    );
  }
  &.output-tokens {
    background-image: linear-gradient(
      90deg,
      rgba(184, 65, 160, 1) v-bind(progressOutputPercentage),
      #ececf1 v-bind(progressOutputPercentage)
    );
  }
}

.progress-fill {
  height: 100%;

  border-radius: 10px 0px 0px 10px;
}
.progress-values {
  min-width: 30%;
}

.progress-values p {
  color: #333;
  font-size: 14px;
  margin-left: 5px;
}

.upgrade-section {
  display: flex;
  align-items: center;
}

.upgrade-section button {
  padding: 15px;
  font-size: 16px;
}

.current-box {
  padding: 10px;
  border: 1px solid #6200ee;
  border-radius: 7px;
  text-align: center;
}

.current-box h4 {
  color: #6200ee;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .month-title-section {
    min-width: 100%;
    padding-bottom: 0;
  }

  .daily-section {
    min-width: 80%;
  }
  .current-subscription {
    min-width: 100%;
  }
  .current-pack {
    min-width: 50%;
  }

  .upgrade-section {
    min-width: 50% !important;
  }

  .upgrade-section button {
    min-width: 100% !important;
  }
  .progress-container {
    display: block;
  }
  .progress-bar {
    min-width: 100%;
  }
}
</style>
src/utils/chartsrc/utils
