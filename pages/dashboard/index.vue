<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" md="6">
        <h1>Dashboard</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// definePageMeta({
//   layout: "dashboard-layout",
// });

export default {
  name: "DashboardDashboard",
  data() {
    return {};
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
  },
};
</script>
