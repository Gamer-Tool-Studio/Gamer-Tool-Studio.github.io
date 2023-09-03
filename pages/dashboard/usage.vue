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
      <v-col cols="12" class="month-title-section">
        <h3> &lt; </h3>
        <h3>September</h3>
        <h3> > </h3>
      </v-col>
      <v-col cols="12">
        <h3>Usage this month</h3>
      </v-col>
      <v-col cols="12" class="progress-section">
        <p>Progress Bar</p>
        <p>300 /</p>
        <p>1,000,000 input tokens</p>
      </v-col>
      <v-col cols="12" class="progress-section">
        <p>Progress Bar</p>
        <p>500 /</p>
        <p>2,000,000 output tokens</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
useHead({
  title: "Usage ",
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

.progress-section {
  display: inline-flex;
}
</style>
