<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const messageToType = 'Ah, greetings, traveler! You\'ve stumbled upon some intriguing information indeed. Yes, there is indeed a secret map hidden within the depths of the big cave, tucked away beneath a vibrant yellow flower. It\'s said to hold the key to unlocking hidden treasures and revealing the path to untold secrets.'

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

onBeforeRouteLeave(() => {
  clearInterval(intervalTypeMessage)
})

useHead({
  title: 'NPC-GPT - Create AI characters for your games',
  meta: [
    { name: 'description', content: 'Create autonomous AI characters in your game engine' },
    { property: 'og:title', content: 'NPC-GPT - Create AI characters for your games' },
    { property: 'og:description', content: 'Explore the next level in game development with NPC-GPT. Create autonomous worlds and interactive characters easily.' },
    { property: 'og:image', content: '~/assets/images/GTS-iso.png' },
    { property: 'og:url', content: 'https://gamertoolstudio.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'NPC-GPT - Create AI characters for your games' },
    { name: 'twitter:description', content: 'Explore the next level in game development with NPC-GPT. Create autonomous worlds and interactive characters easily.' },
    { name: 'twitter:image', content: '~/assets/images/GTS-iso.png' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Game Tool Studio' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '~/public/favicon.png' },
  ],
})
</script>

<template>
  <v-container class="lp">
    <v-row>
      <v-col cols="12" class="intro-section">
        <h1>NPC-GPT - Create Open Simulations With AI Agents.</h1>
      </v-col>
      <v-col cols="12" class="intro-cta">
        <NuxtLink to="/pricing">
          <button class="button shiny">
            Start Trial Now
          </button>
        </NuxtLink>
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
          Unlock entirely new simulated experiences with the assistance of AI agents.
          Create complex chracaters and deploy them in game environments to create your simulated worlds.
        </h2>
      </v-col>
      <div class="feature-boxes">
        <div class="feature-box">
          <h3>Interactive agents</h3>
          <p>
            Build character backstories and customize the way they respond to players.
          </p>
        </div>
        <div class="feature-box">
          <h3>Open interactions</h3>
          <p>
            Create open simulation worlds where players can freely interact with characters through text inputs.
          </p>
        </div>
        <div class="feature-box">
          <h3>Seamless AI</h3>
          <p>
            NPC-GPT requires no coding experience to integrate its AI capabilities in your favourite game engines or frontend frameworks.
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
          Enable open interactions with dyanmic AI characters with our frontend libraries.
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
          "environment": "RPG Game",
          "age": 35,
          "personalityTraits": "shy", mystic, adventurous",
          "dialogueStyle": "mysterious",
          "backgroundStory": "GPT WIzard is a Mage who lives in Mystery Foster.
                She was brought up by witches and mages after being found as a baby
                wondering in the forest. She belongs to this tribe that remains
                undiscovered by most humans but learned the ways of the past and future
                and is able to interpret signs and energies.",
          "enventsKnowledge": "Knows there is a secret map at the entrance of the
                big cave under a yellow flower and  knows the player harduous future
                in the forest with many enemies and challenges",
          "interests": "Herbology, potions, history",
          "friendliness": "High",
          "maxOutputWords": 50
        }
  });
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
        <a href="https://gamertoolstudio.gitbook.io/npc-gpt/api-reference/introduction"><button class="button shiny">View API Reference</button></a>
      </v-col>
      <v-col id="sectionToLinkToPlugin" cols="12">
        <h2 class="page-headers">
          Add NPC-GPT Plugin to your favourite game engine today and start harnessing the power of dynamic character interactions with ease.
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
        Are You Ready To Take Control Over The Simulation?
      </h2>
      <br>
      <NuxtLink to="/pricing">
        <button class="button shiny">
          Start Trial Now
        </button>
      </NuxtLink>
    </v-col>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../assets/lp_styles.scss';
</style>
