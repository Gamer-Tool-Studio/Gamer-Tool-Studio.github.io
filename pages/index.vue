<template>
  <v-container class="lp">
    <v-row>
      <v-col cols="12" class="intro-section">
        <h1>
          Dialog Craft GPT - The Tool To Power Your Game Narratives with AI
        </h1>
        <div class="intro-cta">
          <button class="button">Start Free Trial Now</button>
          <p>View our documentation</p>
        </div>
      </v-col>
      <v-col>
        <div class="demo-video">
          <iframe
            width="100%"
            height="515"
            src="https://www.youtube.com/embed/oxiW8g_uXh4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <!-- Add Image or Video Showcase Here -->
      </v-col>
    </v-row>

    <v-row class="features">
      <v-col>
        <h2 class="page-headers">
          Take your storytelling to new heights with a game development tool to
          revolutionize the way you create character dialogues for your games.
          Craft immersive conversations efortlessly with the power of Chat GPT
          AI technology
        </h2>
      </v-col>
      <div class="feature-boxes">
        <div class="feature-box">
          <h3>Open interactions</h3>
          <p>
            Leverage the capabilities of GPT-3 and enable players to input
            their own text to interact with characters and open the possibilities
            within to your game to the maximum.
          </p>
        </div>
        <div class="feature-box">
          <h3>AI-Powered Characters</h3>
          <p>
            Build immersive character backstories and customize the way they
            respond to players. Make chat GPT a friend or a foe in your game
            quests.
          </p>
        </div>
        <div class="feature-box">
          <h3>Intuitive Interface</h3>
          <p>
            DialogCraftGPT plugin requires no programming experience to setup
            and use from within your favourite game engine.
          </p>
        </div>
        <div class="feature-box">
          <h3>Secure and Private</h3>
          <p>
            Rest assured that your sensitive game content and storylines are
            safeguarded. We follow strict privacy standards to protect your
            intellectual property.
          </p>
        </div>
      </div>
    </v-row>

    <v-row class="get-started">
      <v-col>
        <h2 class="page-headers">
          Add Dialog Craft GPT Plugin to your favourite game engine today and
          start harnessing the power of AI-generated dialogs
        </h2>
      </v-col>
      <v-col cols="12" class="started-grid">
        <ol class="how-to-start">
          <li>
            Sign up for a trial account or select a suitable premium plan.
          </li>
          <li>
            Install the DialogCraftGPT plugin in your preferred game engine.
          </li>
          <li>
            Define personality traits, provide context about the game and
            establish guidelines for your character dialogues with seamless
            plugin commands
          </li>
          <li>
            Harness the power of Chat GPT AI to generate dynamic and immersive
            conversations.
          </li>
          <li>Integrate the generated dialogues into your game seamlessly.</li>
        </ol>
        <div class="engines-available">
          <img class="engine-logo" src="images/RMMZ.png" />
          <img class="engine-logo" src="images/RMMV.png" />
        </div>
      </v-col>
    </v-row>
    <section>
      <div class="start-trial">
        <h2 class="page-headers">
          Are you ready to take your game development to the next level with the
          ultimate AI-Powered character building tool?
        </h2>
        <br />
        <button class="button">Start Free Trial Now</button>
      </div>
    </section>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "default",
});

useHead({
  title: "Home Page",
});
</script>
<style lang="scss" scoped>
@import "../assets/lp_styles.scss";
</style>
