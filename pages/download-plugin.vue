<script lang="ts" setup>
import { ref } from 'vue'

const downloadURLMz = ref('/public/downloads/NPC-GPT-Plugin.js')
const downloadURLMV = ref('/public/downloads/NPC-GPT-MV.js')

// SEO Meta Tags
useHead({
  title: 'Download NPC-GPT Plugin for Game Development',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Download the NPC-GPT Plugin to integrate advanced AI-powered NPCs into your game development environment. Compatible with popular game engines.',
    },
    // Open Graph Tags for social media
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Download NPC-GPT Plugin for Game Development',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Integrate AI-driven characters into your games with the NPC-GPT Plugin. Available for RPG Maker MZ, RPG Maker MV, and other engines.',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '~/assets/images/GTS-iso.png', // Replace with the URL of your image
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://gamertoolstudio.com/download-plugin', // Replace with the URL of your download page
    },
    // Twitter Card Tags
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Download NPC-GPT Plugin for Game Development',
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'Integrate AI-driven characters into your games with the NPC-GPT Plugin. Compatible with RPG Maker MZ, MV, and more.',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: '~/assets/images/GTS-iso.png', // Replace with the URL of your image
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Game Tool Studio',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '~/public/favicon.png',
    },
  ],
})
</script>

<template>
  <v-container class="download-plugin-page">
    <v-row class="intro-section">
      <v-col>
        <h1>Download Plugin</h1>
        <p>
          Use NPC-GPT from your favourite development environment and create seamless AI-powered NPCs. Download the Plugin file compatible with your game engine. Check out our
          <a href="https://gamertoolstudio.gitbook.io/npc-gpt/plugin-user-guide/getting-started" class="internal-link">user guide</a> to learn how to install and use it.
        </p>
      </v-col>
      <v-col cols="12" class="engine-cards">
        <v-col cols="12" class="card-header-section rmm">
          <img src="/images/RPGM-text.png">
        </v-col>
        <div class="cards-container">
          <v-col cols="6" class="download-cards left-card">
            <a :href="downloadURLMz" download class="downloadFile">
              <v-col cols="12" class="card-icon-name">
                <img class="download-logo" src="/images/RPGM-icon.png">
                <h3>RPG Maker MZ</h3>
              </v-col>
              <p>&#8595;Download</p>
            </a>
          </v-col>
          <v-col cols="6" class="download-cards right-card">
            <a :href="downloadURLMV" download class="downloadFile">
              <v-col cols="12" class="card-icon-name">
                <img class="download-logo" src="/images/MV-icon.png">
                <h3>RPG Maker MV</h3>
              </v-col>
              <p>&#8595;Download</p>
            </a>
          </v-col>
        </div>
      </v-col>
      <v-col cols="12" class="engine-cards">
        <v-col cols="12" class="card-header-section godot">
          <img src="/images/RPGM-text.png">
        </v-col>
        <div class="cards-container">
          <v-col cols="12" class="download-cards left-card">
            <a :href="downloadURLMz" download class="downloadFile">
              <v-col cols="12" class="card-icon-name center">
                <img class="download-logo" src="/images/godot-logo.png">
                <h3>Godot 4.3.</h3>
              </v-col>
              <p>&#8595;Download</p>
            </a>
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
.donwloadFile h3 p{
  text-decoration: none;
}

.engine-cards{
  border-radius: 7px;
  display: block;
}

.card-header-section{
  align-self: center;
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  min-width: 100% !important;
  border: 1px solid #ECECF1;
  border-radius: 7px;

}
.rmm{
  background-image: url('/assets/images/RPGM-banner-transp.png');
  background-size: cover;
}

.godot{
  background-image: url('/images/godot-banner.png');
  background-size: cover;
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
  color: #000000;
}

.download-cards p {
  margin-top: 0;
  font-size: 18px;
  text-align: center;
  color: #000000;
  text-decoration: underline !important;
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
