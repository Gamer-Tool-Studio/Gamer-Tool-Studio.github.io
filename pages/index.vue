<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const messageToType
  = 'Ah, greetings, traveler! You\'ve stumbled upon some intriguing information indeed. Yes, there is indeed a secret map hidden within the depths of the big cave, tucked away beneath a vibrant yellow flower. It\'s said to hold the key to unlocking hidden treasures and revealing the path to untold secrets.'
// Typing animation
let intervalTypeMessage: any
const responseGPT = ref('')
function typeMessage(textToType: string, typingSpeed: number) {
  let currentIndex = 0

  function typeNextCharacter() {
    if (currentIndex < textToType.length) {
      const currentCharacter = textToType.charAt(currentIndex)
      responseGPT.value += currentCharacter
      currentIndex++

      setTimeout(typeNextCharacter, typingSpeed)
    }
  }
  typeNextCharacter()
}

// Start typing animation when the component is mounted
onMounted(() => {
  const typingSpeed = 50
  typeMessage(messageToType, typingSpeed)
  intervalTypeMessage = setInterval(async () => {
    if (responseGPT.value === messageToType) {
      responseGPT.value = ''
      typeMessage(messageToType, typingSpeed)
    }
  }, 3000)
})

onBeforeRouteLeave(() => clearInterval(intervalTypeMessage))

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Home Page',
})
</script>

<template>
  <v-container class="lp">
    <v-row>
      <v-col cols="12" class="intro-section">
        <h1>NPC-GPT - Real-time AI chats for your game characters</h1>
      </v-col>
      <v-col cols="12" class="intro-cta">
        <button class="button">
          Start Trial Now
        </button>
        <a href="https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"><p>View our documentation</p></a>
      </v-col>
      <v-col cols="12" class="demo-video">
        <div style="position: relative; padding-bottom: 56.25%; /* 16:9 aspect ratio */">
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/p-2NLT5jpcA?si=9KDx8_A2xNvWzh2C"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="features">
      <v-col>
        <h2 class="page-headers">
          Unlock entirely new gaming experiences and create autonomous worlds with the assistance of AI-driven NPCs.
          Effortlessly add unscripted conversations to your game by integrating with the GPT-4 model.
        </h2>
      </v-col>
      <div class="feature-boxes">
        <div class="feature-box">
          <h3>Unscripted Worlds</h3>
          <p>
            Leverage the capabilities of AI and enable players to input their own text to interact with characters and
            open the possibilities within to your game to the maximum.
          </p>
        </div>
        <div class="feature-box">
          <h3>Autonomous NPCs</h3>
          <p>
            Build immersive character backstories and customize the way they respond to players. Make chat GPT a friend
            or a foe in your game quests.
          </p>
        </div>
        <div class="feature-box">
          <h3>Intuitive Interface</h3>
          <p>
            NPC-GPT plugin requires no programming experience to setup and use from within your favourite game engine.
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
    <v-row id="sectionToLinkToApi" class="get-started">
      <v-col cols="12">
        <h2 class="page-headers">
          Create seamless AI characters to interact with players and users from any Frontend environment with NPC-GPT
          SDK
        </h2>
        <div class="code-style">
          <pre class="code-display">
          <code>

const { Configuration, NpcGptApi } = require("NpcGPt");

const configuration = new Configuration({
  apiKey: process.env.NPCGPT_API_KEY,
});

const NpcGpt = new NpcGptApi(configuration);

const chat = await NpcGpt.createChat({
  "userInput": "I've heard about a secret map?!",
  "chatHistory": [],
  "characterContext": {
    "name": "GPTWizard",
    "age": 35,
    "personality": {
      "traits": [
        "shy",
        "mystic",
        "adventurous"
      ],
    "dialogueStyle": "mysterious"
    },

    "backgroundStory": "GPT WIzard is a Mage who lives in Mystery Foster.
      She was brought up by witches and mages after being found as a baby
      wondering in the forest. She belongs to this tribe that remains
      undiscovered by most humans but learned the ways of the past and future
      and is able to interpret signs and energies.",

    "eventsKnowledge": "Knows there is a secret map at the entrance of the
      big cave under a yellow flower and  knows the player harduous future in
      the forest with many enemies and challenges",

    "interests": {
      "Astrology": 7,
      "Herbology": 9,
      "History": 8
    },
    "supportiveness": 8,
    "maxOutputWords": 50
  }
});
console.log(completion.data.choices[0].message);
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
        <a href="https://gamertoolstudio.gitbook.io/npc-gpt/api-reference/introduction"><button class="button">View API Reference</button></a>
      </v-col>
      <v-col id="sectionToLinkToPlugin" cols="12">
        <h2 class="page-headers">
          Add NPC-GPT Plugin to your favourite game engine today and start harnessing the power of AI-generated
          conversations with ease
        </h2>
      </v-col>
      <v-col cols="6" class="plugin-explain">
        <ol class="how-to-start">
          <li>Create an Account and get an API key.</li>
          <li>
            Install the NPC-GPT plugin in your preferred game engine.
            <a href="/download-plugin">Download Plugin file</a>.
          </li>
          <li>
            Define personality traits, provide context about game events and establish guidelines for your NPC speech
            with seamless plugin commands.
          </li>
          <li>Harness the power of Chat GPT to generate dynamic and immersive conversations.</li>
          <li>Integrate the generated responses into your game seamlessly.</li>
        </ol>
      </v-col>
      <v-col cols="6" class="engines-available">
        <div class="engine-logo-container">
          <img class="engine-logo" src="/images/RMMZ.png">
        </div>
        <div class="engine-logo-container">
          <img class="engine-logo" src="/images/RMMV.png">
        </div>
      </v-col>
    </v-row>

    <v-col cols="12" class="start-trial">
      <h2 class="page-headers">
        Are you ready to take your game development to the next level with the ultimate AI-Powered character building
        tool?
      </h2>
      <br>
      <button class="button">
        Start Free Trial Now
      </button>
    </v-col>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../assets/lp_styles.scss';
</style>
