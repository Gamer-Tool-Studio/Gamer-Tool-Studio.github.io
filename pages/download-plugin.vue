<template>
  <v-container class="download-plugin-page">
    <v-row class="intro-section">
      <v-col>
        <h1>Download Plugin</h1>
        <p>
          Use NPC-GPT from your favourite development environment and create seamless AI-powered NPCs. Download the Plugin file compatible with your game engine. Check out our
          <a href="https://gamertoolstudio.gitbook.io/npc-gpt/plugin-user-guide/getting-started" class="internal-link">user guide </a>to learn how to install and use it.
        </p>
      </v-col>
      <v-col cols="12" class="engine-cards">
        <v-col cols="12" class="card-header-section">
          <img src="/images/RPGM-text.png"/>
        </v-col>
        <div class="cards-container">
          <v-col cols="6" class="download-cards left-card">
            <v-col cols="12" class="card-icon-name">
              <img class="download-logo" src="/images/RPGM-icon.png"/>
              <h3>RPG Maker MZ</h3>
            </v-col>
            <p>&#8595Download</p>
          </v-col>
          <v-col cols="6" class="download-cards right-card">
            <v-col cols="12" class="card-icon-name">
              <img class="download-logo" src="/images/MV-icon.png"/>
              <h3>RPG Maker MV</h3>
            </v-col>
            <p>&#8595Download</p>
          </v-col>
        </div>
      </v-col>
      <v-col cols="12" class="api-link">
        <h3>Want to use NPC-GPT in another environment?</h3>
        <p class="reference_link">
          Check our <a href="https://gamertoolstudio.gitbook.io/npc-gpt/api-reference/introduction" class="internal-link">API reference here.</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
useHead({
  title: "Download Plugin",
});

</script>

<style lang="scss">

.download-plugin-page {
  margin-top: 0px;
  padding-top: 0px;
}

.download-plugin-page h1 {
  font-size: 40px;
  line-height: 88px;
  margin-bottom: 15px;
}

.download-plugin-page p {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 15px;
  font-weight: 100;
}

.engine-cards{
  border-radius: 7px;
  display: block;
}

.card-header-section{
  align-self: center;
  text-align: center;
  background-image: url('/assets/images/RPGM-banner-transp.png');
  background-size: cover;
  padding-left: 5%;
  padding-right: 5%;
  min-width: 100% !important;
  border: 1px solid #ECECF1;
  border-radius: 7px;

}

.card-header-section img {
  text-align: center;
  max-width: 30%;
}

.cards-container {
  width: 100%;
  display: inline-flex;
  text-align: center;
}

.download-cards {
  margin-top: 3px;
  border: 1px solid #ECECF1;
  padding: 0;
  border-radius: 7px;  

}

.download-cards:hover {
  border: 1px solid #6200EE;
  cursor: pointer;
}

.card-icon-name {
  text-align: center;
  min-width: 100% !important;
  display: inline-flex;
  align-items: center;
  padding-bottom: 0;
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
.api-link{
  margin-top: 30px;
}
.reference_link {
  padding:0;
  margin-top:0;
}

.reference-link a{
  color: #000000
}

@media (max-width: 600px) {
  .card-header-section img {
    min-width: 70% !important;
  }
  .cards-container {
    display: block;
  }
  .download-cards{
    min-width: 100%;
  }
}
</style>
