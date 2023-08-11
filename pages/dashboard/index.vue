<template>
  <v-container id="dashboard" fluid tag="section" class="download-plugin-page">
    <v-row>
      <v-col cols="12">
        <h1>Download Plugin</h1>
      </v-col>
      <v-col>
        <h5>
          Download the Javascript file with the plugin compatible with your game engine.
        </h5>
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


<style lang="scss">

.download-plugin-page h1 {
  font-size: 32px;
}

.download-plugin-page h5 {
  font-size: 20px;
  font-weight: 100;
  margin-bottom: 10px;
  margin-top: 15px;
}


</style>