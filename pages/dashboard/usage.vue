<template>
  <v-container class="usage-page">
    <v-row>
      <v-col cols="12">
        <h1>Usage</h1>
      </v-col>
      <v-col>
        <p>
          Below you'll find a summary of API usage for your organization. All
          dates and times are UTC-based, and data may be delayed up to 5
          minutes.
        </p>
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
</style>