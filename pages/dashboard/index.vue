<template>
  <v-container id="dashboard" fluid tag="section" class="download-plugin-page">
    <v-row>
      <v-col cols="12">
        <h1>Download Plugin</h1>
      </v-col>
      <v-col>
        <p>
          Download the Plugin file compatible with your game engine. Check out 
          <a href="">our user guide </a>to learn how to install and set it up.
        </p>
      </v-col>
      <v-col cols="12" class="engine-cards">
        <h2>RPG Maker</h2>
        <div class="cards-container">
          <v-col cols="6" class="download-cards">
            <v-col cols="6" class="card-icon-name">
              <img class="download-logo" src="images/RPGM-icon.png"/>
              <h3>RPG Maker MZ</h3>
            </v-col>
            <p>&#8595Download</p>
          </v-col>
          <v-col cols="6" class="download-cards">
            <v-col cols="6" class="card-icon-name">
              <img class="download-logo" src="images/MV-icon.png"/>
              <h3>RPG Maker MV</h3>
            </v-col>
            <p>&#8595Download</p>
          </v-col>
        </div>
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

useHead({
  title: "Home ",
});
</script>

<style lang="scss">
.download-plugin-page h1 {
  font-size: 32px;
}

.download-plugin-page p {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.engine-cards{
  border-radius: 7%;
  display: block;
}

.cards-container {
  width: 100%;
  display: inline-flex;
  
}

.download-cards {
  margin:10px;
  border: 1px solid #ECECF1;
}

.download-cards:hover {
  border: 1px solid #6200EE;
  cursor: pointer;
}

.card-icon-name {
  min-width: 100% !important;
  display: inline-flex;
  align-items: center;
}
.download-cards h3 {
  float: right;
  margin-left:10px;
}

.download-cards p {
  margin-top: 0;
  font-size: 18px;
  text-align: center;
}

.download-cards p:hover {
  text-decoration: underline;
  color:#6200EE;
} 

.download-logo {
  max-width: 50px;
  max-height: 50px;
}
</style>
