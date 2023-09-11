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
      <v-col cols="12" class="code-section">
        <h2 class="page-headers">
          Create powerful AI characters to interact with players and users from any Frontend environment with Dialog Craft GPT library</h2>
        <pre>
          <code class="code-display">
            npm install dialogcrafgpt
            curl https://api.gamertoolstudio.com/dialogcraftgpt/v1/ 
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $DIALOGCRAFTGPT_API_KEY" \
            -d '{
              "role": "system",
              "name": "GPT Wizard",
              "personalityTraits": ["friendly","enigmatic", "picky","observant"],
              "dialogStyle":"mysterious"
              "backgroundStory" :"GPT Wizard is a character in Heavens Beneath, a fantasy RPG game. 
              "eventsKnowledge": "how to make potions", "game map locations", "villain's aliby",
              "interests": ["astrology":"10", "herbology":"9", "chemistry":"9", "craftsmanship":"7" ],
              "support":"10",
              "maxOutputWords":"400",
              "userInput": "Hey there, where am i?,
              "chatHistory": []
            }'
            <div class="typed-display">"GPT Wizard response": <span class="typed-message" ref="textElement"></span></div>
          </code>
        </pre>
      </v-col>
      <v-col cols="12" class="button-display">
        <button class="button">View API Reference</button>
      </v-col>
      <v-col>
        <h2 class="page-headers">
          Add Dialog Craft GPT Plugin to your favourite game engine today and
          start harnessing the power of AI-generated dialogs
        </h2>
      </v-col>
      <v-col cols="12" class="started-grid">
        <ol class="how-to-start">
          <li>
            Sign up for a trial account or select a suitable paid plan.
          </li>
          <li>
            Install the DialogCraftGPT plugin in your preferred game engine. <a href="/download-plugin">Download Plugin file.</a>
          </li>
          <li>
            Define personality traits, provide context about game events and
            establish guidelines for your character dialogues with seamless
            plugin commands.
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
import { ref, onMounted } from "vue";

const typedMessage = ref(""); // Initialize an empty message
const messageToType =
  "Hey there, you seem kinda lost huh? you're exactly where you should be but soon to be the worst of the places to ever been. The beginning may be the end but for you still both.";
const textElement = ref(null); // Reference to the text element

// Function to simulate typing animation
const typeMessage = async () => {
  let shouldRestart = true;
  let currentMessage = ""; // Store the current message

  while (true) {
    for (let i = 0; i < messageToType.length; i++) {
      currentMessage += messageToType[i];
      textElement.value.textContent = currentMessage; // Update the text element
      await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust typing speed here
    }

    // Wait for 2 seconds before restarting
    if (shouldRestart) {
      shouldRestart = false;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      currentMessage = ""; // Clear the current message
      textElement.value.textContent = ""; // Clear the text element
    } else {
      // Clear the typed message and start over
      currentMessage = "";
      textElement.value.textContent = "";
      shouldRestart = true;
    }
  }
};

// Start typing animation when the component is mounted
onMounted(() => {
  typeMessage();
});

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
