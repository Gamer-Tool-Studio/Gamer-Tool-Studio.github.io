<template>
  <v-container class="lp">
    <v-row>
      <v-col cols="12" class="intro-section">
        <h1>Dialog Craft GPT - The Game Development tool To Create AI-powered NPCs </h1>
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
            src="https://www.youtube.com/embed/2SUfiiPxiXQ?si=SWlFk97Zvwx179AW"
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
          Unlock entirely new gaming experiences and create unscripted scenarios with the assistance of AI-driven NPCs.
          Effortlessly craft immersive conversations by harnessing the power of Chat GPT AI
        </h2>
      </v-col>
      <div class="feature-boxes">
        <div class="feature-box">
          <h3>Open world building</h3>
          <p>
            Leverage the capabilities of GPT-4 and enable players to input their own text to interact with characters
            and open the possibilities within to your game to the maximum.
          </p>
        </div>
        <div class="feature-box">
          <h3>AI-Powered NPCs</h3>
          <p>
            Build immersive character backstories and customize the way they respond to players. Make chat GPT a friend
            or a foe in your game quests.
          </p>
        </div>
        <div class="feature-box">
          <h3>Intuitive Interface</h3>
          <p>
            DialogCraftGPT plugin requires no programming experience to setup and use from within your favourite game
            engine.
          </p>
        </div>
        <div class="feature-box">
          <h3>Secure and Private</h3>
          <p>
            Rest assured that your sensitive game content and storylines are safeguarded. We follow strict privacy
            standards to protect your intellectual property.
          </p>
        </div>
      </div>
    </v-row>
    <v-row class="get-started" id="sectionToLinkToApi">
      <v-col>
        <h2 class="page-headers">
          Create seamless AI characters to interact with players and users from any Frontend environment with Dialog
          Craft GPT library
        </h2>
        <div class="code-style">
          <pre class="code-display">
          <code>
            npm install dialogcrafgpt
            curl https://api.gamertoolstudio.com/dialogcraftgpt/v1/ 
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $DIALOGCRAFTGPT_API_KEY" \
            -d '{
              "role": "system",
              "name": "GPT Wizard",
              "personalityTraits": ["friendly","enigmatic", "picky","observant"],
              "dialogStyle":"mysterious"
              "backgroundStory" :"you are a character in Heavens Beneath, a fantasy RPG game.", 
              "eventsKnowledge": "make potions", "game map locations", "villain's aliby.",
              "interests": ["astrology":"10", "herbology":"9", "chemistry":"9", "craftsmanship":"7" ],
              "support":"10",
              "maxOutputWords":"400",
              "userInput": "Hey there, where am i?,
              "chatHistory": []
            }'
          </code>
        </pre>
          <div class="typed-display">
            "GPT Wizard response":
            <span class="typed-message">
              {{ responseGPT }}
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="button-display">
        <button class="button">View API Reference</button>
      </v-col>
      <v-col cols="12" id="sectionToLinkToPlugin">
        <h2 class="page-headers">
          Add Dialog Craft GPT Plugin to your favourite game engine today and start harnessing the power of AI-generated
          dialogs with ease
        </h2>
      </v-col>
      <v-col class="plugin-explain">
        <ol class="how-to-start">
          <li>Sign up for a trial account or select a suitable paid plan.</li>
          <li>
            Install the DialogCraftGPT plugin in your preferred game engine.
            <a href="/download-plugin">Download Plugin file</a>.
          </li>
          <li>
            Define personality traits, provide context about game events and establish guidelines for your character
            dialogues with seamless plugin commands.
          </li>
          <li>Harness the power of Chat GPT AI to generate dynamic and immersive conversations.</li>
          <li>Integrate the generated dialogues into your game seamlessly.</li>
        </ol>
      </v-col>
      <v-col cols="6" class="engines-available">
        <div class="engine-logo-container">
          <img class="engine-logo" src="images/RMMZ.png" />
        </div>
        <div class="engine-logo-container">
          <img class="engine-logo" src="images/RMMV.png" />
        </div>
      </v-col>
    </v-row>
    <section>
      <div class="start-trial">
        <h2 class="page-headers">
          Are you ready to take your game development to the next level with the ultimate AI-Powered character building
          tool?
        </h2>
        <br />
        <button class="button">Start Free Trial Now</button>
      </div>
    </section>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const messageToType =
  "Hey there, you seem kinda lost huh? you're exactly where you should be but soon to be the worst of the places to ever been. The beginning may be the end but for you still both.";

// Typing animation
let intervalTypeMessage: any;
const responseGPT = ref('');
function typeMessage(textToType: string, typingSpeed: number) {
  let currentIndex = 0;

  function typeNextCharacter() {
    if (currentIndex < textToType.length) {
      const currentCharacter = textToType.charAt(currentIndex);
      responseGPT.value += currentCharacter;
      currentIndex++;

      setTimeout(typeNextCharacter, typingSpeed);
    }
  }
  typeNextCharacter();
}

// Start typing animation when the component is mounted
onMounted(() => {
  const typingSpeed = 50;
  typeMessage(messageToType, typingSpeed);
  intervalTypeMessage = setInterval(async () => {
    if (responseGPT.value == messageToType) {
      responseGPT.value = '';
      typeMessage(messageToType, typingSpeed);
    }
  }, 3000);
});

onBeforeRouteLeave(() => clearInterval(intervalTypeMessage));

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Home Page',
});
</script>

<style lang="scss" scoped>
@import '../assets/lp_styles.scss';
</style>
