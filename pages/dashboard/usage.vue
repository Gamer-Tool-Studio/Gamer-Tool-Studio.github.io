<template>
  <v-container class="usage-page">
    <v-row>
      <v-col cols="12">
        <h1>Usage</h1>
      </v-col>
      <v-col cols="12">
        <p>
          Below you'll find a summary of API usage for your organization. All
          dates and times are UTC-based, and data may be delayed up to 5
          minutes.
        </p>
      </v-col>
      <v-col cols="8" class="month-title-section">
        <h3> &lt; </h3>
        <h3>August</h3>
        <h3> > </h3>
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
        <img class="chart" src="~/assets/images/chart.png">
      </v-col>
      <v-col cols="12">
        <h3>Usage this month</h3>
      </v-col>
      <v-col cols="12" class="progress-section">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
          </div>
          <div class="progress-values">
            <p><span id="progressText">300000</span> / 1,000,000 input tokens</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { onMounted } from 'vue';

useHead({
  title: "Usage",
});

const progress = 300000;

function updateProgressBar() {
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  const percentage = (progress / 1000000) * 100; // Corrected calculation

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = progress;
}

// Call the function when the component is mounted
onMounted(() => {
  updateProgressBar();
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
  background-color: grey;
}

.chart-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.chart-title h3{
  font-size: 16px;
  font-weight: 600;
}

.chart-area {

}
.chart {
  height: 300px;
}

.progress-section {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 10px;
}

.progress-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.progress-bar {
  background-color: #ccc;
  height: 20px;
  border-radius: 10px;
  margin-right: 2%;
  flex-grow: 1; 
}

.progress-fill {
  background-color: #6200EE;
  height: 100%;
  transition: width 0.3s ease-in-out;
  border-radius:10px;
}

.progress-values p {
  color: #333;
  font-size: 14px;
  margin: 0; 
}

</style>
