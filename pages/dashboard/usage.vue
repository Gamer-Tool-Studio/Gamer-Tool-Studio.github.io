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
        <v-btn flat class="switch-month" v-if="hasPreviousMonth" @click="changeMonth(currentMonth - 1)">&lt;</v-btn>
        <v-btn flat class="month-title" width="120">{{ currentMonthName }}</v-btn>
        <v-btn flat class="switch-month" v-if="hasNextMonth" @click="changeMonth(currentMonth + 1)">&gt;</v-btn>
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
      <v-col cols="12">
        <h3>Token usage count</h3>
      </v-col>
      <v-col cols="12" class="progress-section">
        <div class="progress-container">
          <div class="progress-bar input-tokens"></div>
          <div class="progress-values">
            <p>{{ consumedTokens }} / {{ maxTokens }} input tokens</p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="progress-section">
        <div class="progress-container">
          <div class="progress-bar output-tokens"></div>
          <div class="progress-values">
            <p>{{ consumedTokens }} / {{ maxTokens }} output tokens</p>
          </div>
        </div>
      </v-col>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
useHead({
  title: 'Usage',
});

import { useTokenCountStore } from '~/store/tokenCount';
import { getMonthDays, getMonthName, getCumulativeTokens } from '~/util/chart';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia

const tokenStore = useTokenCountStore();

const { monthTokensDaily, currentMonth, maxTokens } = storeToRefs(tokenStore); // make authenticated state reactive with storeToRefs
// Calculate the percentages based on the initial values

const consumedTokens = computed(() => monthTokensDaily.value.reduce((a, b) => a + b, 0));
const progressInputPercentage = computed(() => `${(consumedTokens.value / maxTokens.value) * 100}%`);
const progressOutputPercentage = computed(() => `${(consumedTokens.value / maxTokens.value) * 100}%`);

// Chart
import { Bar } from 'vue-chartjs';

const changeMonth = tokenStore.changeMonth;

const hasPreviousMonth = true;
const hasNextMonth = true;
const isCumulative = ref(false);

const currentMonthName = computed(() => getMonthName(currentMonth.value));
const labels = computed(() => getMonthDays(currentMonth.value));

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Tokens used',
      backgroundColor: '#6200EE',
      data: isCumulative.value ? getCumulativeTokens(monthTokensDaily.value) : monthTokensDaily.value,
    },
  ],
}));
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
});
</script>

<style lang="scss">
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
      rgba(98, 0, 238, 1) v-bind(progressOutputPercentage),
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
  .month-title-section{
    min-width: 100%;
    padding-bottom: 0;
  }

  .daily-section {
    min-width: 80%;
  }
  .current-subscription {
    min-width: 100%;
  }
  .current-pack{
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
