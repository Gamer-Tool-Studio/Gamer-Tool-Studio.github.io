<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Payment methods</h1>
      </v-col>
      <v-col>
        <v-form>
          <h4>Organization name</h4>
          <label>
            Human-friendly label for your organization, shown in user interfaces
          </label>
          <h4>Organization ID</h4>
          <label>
            Identifier for this organization sometimes used in API requests
          </label>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
useHead({
  title: "Payment methods ",
});
</script>
