<template>
  <v-container class="usage-page">
    <v-row>
      <v-col cols="12">
        <h1>Usage</h1>
      </v-col>
      <v-col cols="12">
        <p>
          Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data
          may be delayed up to 5 minutes.
        </p>
      </v-col>
      <v-col cols="8" class="month-title-section">
        <a href=""><h3 class="switch-month">&lt;</h3></a>
        <h3>August</h3>
        <a href=""><h3 class="switch-month">&gt;</h3></a>
      </v-col>
      <v-col cols="4" class="daily-section">
        <div class="switch-field">
          <label for="usage-view-radio-daily">Daily</label>
          <label for="usage-view-radio-cumulative">Cumulative</label>
        </div>
      </v-col>
      <v-col cols="12" class="chart-title">
        <h3>Daily usage (tokens)</h3>
      </v-col>
      <v-col cols="12" class="chart-area">
        <img class="chart" src="~/assets/images/chart.png" />
      </v-col>
      <v-col cols="12">
        <h3>Usage this month</h3>
      </v-col>
      <v-col cols="12" class="progress-section">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFillInput" :style="{ width: progressInputPercentage }"></div>
          </div>
          <div class="progress-values">
            <p>{{ progressInput }} / 1,000,000 input tokens</p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="progress-section">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFillOutput" :style="{ width: progressOutputPercentage }"></div>
          </div>
          <div class="progress-values">
            <p>{{ progressOutput }} / 1,000,000 output tokens</p>
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

import { computed, onMounted } from 'vue';
import { useTokenCountStore } from '~/store/tokenCount';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia

const { progressInput, progressOutput } = storeToRefs(useTokenCountStore()); // make authenticated state reactive with storeToRefs

// Calculate the percentages based on the initial values
const progressInputPercentage = computed(() => `${(progressInput.value / 1000000) * 100}%`);
const progressOutputPercentage = computed(() => `${(progressOutput.value / 1000000) * 100}%`);
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
.switch-month:hover {
  cursor: pointer;
  text-decoration: underline;
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
  padding: 5px;
}

.switch-field label:hover {
  cursor: pointer;
  background-color: #d9d9e3;
}

.chart-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.chart-title h3 {
  font-size: 16px;
  font-weight: 600;
}

.chart-area {
}
.chart {
  height: 300px;
}

.current-subscription {
  display: flex;
  align-items: center;
}
.current-subscription h3 {
  font-size: 18px;
  font-weight: 600;
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
  width: 90%;
}

.progress-bar {
  background-color: #ccc;
  height: 10px;
  border-radius: 10px;
  flex-grow: 1;
}

.progress-fill {
  background-color: #6200ee;
  height: 100%;
  transition: width 0.3s ease-in-out;
  border-radius: 10px 0px 0px 10px;
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

.current-box {
  padding: 10px;
  border: 1px solid #6200ee;
  border-radius: 7px;
  text-align: center;
}

.current-box h4 {
  color: #6200ee;
}
</style>
