<script setup>
import { onMounted, reactive, ref } from 'vue'
import Web3 from 'web3'
import { NETWORKS_LIST, NFTS_LIST, NFT_ADDRESSES_LIST, nftContractAbi } from '@/constants'

const debug = getDebugger('page:cluaido')

useHead({
  title: 'CLUAIDO - Detective AI game.',
  meta: [
    { name: 'description', content: 'Play a detective demo game with AI agents and free interrogation mechanics.' },
    { property: 'og:title', content: 'CLUAIDO - Detective AI game.' },
    { property: 'og:description', content: 'Play a detective demo game with AI agents and free interrogation mechanics.' },
    { property: 'og:image', content: '~/assets/images/new-art.png' },
    { property: 'og:url', content: 'https://gamertoolstudio.com/cluaido' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'CLUAIDO- Detective AI game.' },
    { name: 'twitter:description', content: 'Play a detective demo game with AI agents and free interrogation mechanics.' },
    { name: 'twitter:image', content: '~/assets/images/new-art.png' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Game Tool Studio' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '~/public/favicon.png' },
  ],
})

const nfts = reactive(NFTS_LIST)

const totalVotes = ref(0)

onMounted(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(NETWORKS_LIST.find(c => c.chainId === 2732190003600000).rpcUrls[0]))
  const networkId = 2732190003600000 // Number(await web3.eth.net.getId())
  const contractAddress = NFT_ADDRESSES_LIST.find(c => c.chainId === networkId)?.nftContractAddress
  if (!contractAddress) {
    debug.error('Contract not found')
    return
  }
  const contract = new web3.eth.Contract(nftContractAbi, contractAddress)

  // debug.log('contract', contract)

  for (const nft of nfts) {
    // debug.log('nft', nft.id)
    const votes = Number(await contract.methods.mintedCount(nft.id).call())
    // debug.log('votes', votes)

    nft.votes = votes || 0
    totalVotes.value += votes
    // debug.log('totalVotes', totalVotes)
  }
})

const showModal = ref(false)
const selectedSuspectId = ref(null)
const showGameWindow = ref(false) // Reactive variable to control GameWindow visibility

function connectAndOpenModal(suspectId) {
  selectedSuspectId.value = suspectId
  showModal.value = true
}

function calculateVotesPercentage(suspect) {
  const suspectVotes = suspect.votes
  // debug.log('suspectId', suspect)
  if (!suspectVotes || !totalVotes.value)
    return '0%'
  const percentage = (suspectVotes / totalVotes.value) * 100
  return `${Math.round(percentage)}%`
}

function openGameWindow() {
  showGameWindow.value = true
}

function closeGameWindow() {
  showGameWindow.value = false
}
</script>

<template>
  <!-- Include the modal-game-window component -->
  <modal-game-window
    v-if="showGameWindow"
    @close="closeGameWindow"
  />

  <modal-connect-wallet
    v-if="showModal"
    :suspect-id="selectedSuspectId"
    @close="showModal = false"
  />

  <div :class="{ 'dimmed-content': showModal || showGameWindow }">
    <v-container class="lp">
      <!-- Intro Section -->
      <v-row>
        <v-col cols="12" class="intro-section">
          <h1>
            CLUAIDO - A Detective Game Where You Can Freely Interrogate The
            Suspects.
          </h1>
        </v-col>
        <v-col cols="12">
          <h2 class="hamilton-title">
            Who Killed Mr. Hamilton?
          </h2>
          <p class="game-desc">
            You were called to the victims' house to solve a mysterious death.
            Interrogate the suspects, search for clues and discover secrets that
            will lead you to the culprit.
          </p>
        </v-col>
        <v-col cols="12" class="demo-section">
          <!-- Use an image that opens the modal-game-window when clicked -->
          <img
            src="~/assets/images/play-clu.png"
            alt="Play the Game"
            @click="openGameWindow"
          >
        </v-col>
        <v-col cols="12">
          <div class="about-game">
            <a
              href="https://medium.com/@gamertoolstudio/play-cluaido-demo-and-unlock-exclusive-rewards-with-our-nfts-d1189568a6a1"
            >
              <h3 class="learn-more">How to Play!</h3>
            </a>
          </div>
        </v-col>
      </v-row>

      <!-- Accusations and Funds Section -->
      <v-row class="get-started">
        <v-col cols="12" class="intro-section">
          <h1>Accuse the right culprit and win amazing prizes!</h1>
        </v-col>
        <v-row>
          <v-col cols="12" md="6" class="vote-count votes">
            <div class="results-container">
              <img
                src="~/assets/images/document-icon.png"
                class="vote-icon"
                alt="Accusations Made"
              >
              <h3 class="prize-money">
                {{ totalVotes }}
              </h3>
              <h3 class="counter-text">
                Accusations Made
              </h3>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="vote-count bets">
            <div class="results-container">
              <img
                src="~/assets/images/dollar-icon.png"
                class="vote-icon"
                alt="Funds Raised"
              >
              <h3 class="prize-money">
                ${{ totalVotes * 5 }}
              </h3>
              <h3 class="counter-text">
                Funds Raised
              </h3>
            </div>
          </v-col>
        </v-row>

        <!-- Features Section -->
        <v-row class="features">
          <v-col cols="12">
            <h2 class="bet-title">
              Bet on your most likely suspect to get a trading card of the
              character. Apply for amazing rewards and support the team
              launching the final version of the game.
            </h2>
          </v-col>
          <v-col cols="12">
            <div class="guide-link acc-guide">
              <a
                href="https://medium.com/@gamertoolstudio/play-cluaido-demo-and-unlock-exclusive-rewards-with-our-nfts-d1189568a6a1"
              >
                <img
                  class="acc-rules"
                  src="~/assets/images/document-icon.png"
                  alt="Betting Game Rules"
                >
                <h3>Read the Rules and Learn All About the Rewards.</h3>
              </a>
            </div>
          </v-col>
          <v-row class="feature-boxes">
            <v-col
              v-for="nft in nfts"
              :key="nft.id"
              cols="12"
              sm="6"
              md="4"
              class="feature-box"
            >
              <h2>{{ nft.name }}</h2>
              <img :src="nft.src" :alt="nft.name">
              <div class="vote-perc">
                <h3>{{ calculateVotesPercentage(nft) }}</h3>
                <p>votes</p>
              </div>
              <p>{{ nft.description }}</p>
              <button class="button shiny" @click="connectAndOpenModal(nft.id)">
                Accuse
              </button>
            </v-col>
          </v-row>
        </v-row>

        <!-- Join Section -->
        <v-row>
          <v-col cols="12">
            <h2 class="bet-title">
              Begin your detective journey now!
            </h2>
          </v-col>
          <v-col cols="12" sm="4" class="join-section">
            <a href="https://store.steampowered.com/app/2919500/CLUAIDO/">
              <img
                src="/images/Steam-white-logo.png"
                alt="Wishlist the Game"
              >
              <h3>Wishlist the Game</h3>
            </a>
          </v-col>
          <v-col cols="12" sm="4" class="join-section">
            <a href="https://discord.gg/JdDwRfTGNF">
              <img src="/images/discord-logo.png" alt="Join the Community">
              <h3>Join the Community</h3>
            </a>
          </v-col>
          <v-col cols="12" sm="4" class="join-section">
            <a href="https://twitter.com/gamertoolstudio">
              <img
                src="/images/twitter-white-logo.png"
                alt="Follow our Journey"
              >
              <h3>Follow our Journey</h3>
            </a>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2,
* {
  color: #fff;
}

main.lp {
  > div {
    max-width: 1200px !important;
    margin: auto;
  }
}

/* Section Styles */
section {
  margin-bottom: 30px;
}

.lp footer {
  color: black !important;
}

.dimmed-content {
  opacity: 0.5; /* Reduces the opacity to 50% */
  filter: blur(2px); /* Optional: adds a blur effect */
  pointer-events: none; /* Optional: disables interactions */
  user-select: none; /* Optional: prevents text selection */
}

/* Intro Section Styles */

.intro-section h1 {
  margin-right: 2%;
  line-height: 100px;
  margin-bottom: 60px;
}
.hamilton-title {
  border-bottom: 1px solid #6e6e80;
  font-size: 36px;
}
/*Demo Video */

.demo-section {
  position: relative;
  margin: auto;
  width:100%;
  img {
    border-radius: 25px;
    width: 100%;
    height: 700px;
  }
}

#fullscreen-button {
  z-index: 999 !important;
}

.game-desc {
  margin-top: 20px;
  font-size: 26px;
  font-weight: 300;
}

.guide-link {
  display: inline-flex;
  align-items: flex-end;
  flex-wrap: wrap;
  align-content: center;
  min-width: 100%;
}

.guide-link a{
  min-width: 100%;
  display: inline-flex;
  align-items: baseline;
  padding-top: 20px;
  padding-bottom: 20px;
}

.about-game{
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  min-width: 100%;
  transition: background 0.6s ease-in-out;

}

.about-game a{
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 20px;
  min-width: 100%;
  background: linear-gradient(135deg, #1a1a1a, #303030, #6200ee, #303030, #1a1a1a);
  background-size: 200% 200%;
  text-decoration: none;
  border-radius: 17px;
}

.about-game a:hover{
  background-size: 100% 100%;
  animation: metallic-shine 1.5s ease-in-out forwards;
  border-radius: 17px;

}

.acc-guide a{
  padding-top: 40px !important;
  padding-bottom: 40px !important;
  transition: background 0.6s ease-in-out;
  text-decoration: none;
  border-radius: 17px;
  min-width: 100% !important;
}

.acc-guide a:hover{
  background: linear-gradient(135deg, #1a1a1a, #303030, #6200ee, #303030, #1a1a1a);
  background-size: 200% 200%;
  animation: metallic-shine 1.5s ease-in-out forwards;
}

.shiny{
  transition: background 0.6s ease-in-out !important;
  text-decoration: none;
  border-radius: 7px;
}

.shiny:hover{
  background: linear-gradient(135deg, #1a1a1a, #303030, #6200ee, #303030, #1a1a1a) !important;
  background-size: 200% 200% !important;
  animation: metallic-shine 1.5s ease-in-out forwards !important;
  color:#fff !important;
}

@keyframes metallic-shine {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}

.acc-guide h3 {
  font-size: 30px;
  margin-left: 20px;
  align-self: center;

}

.learn-more {
  width:100% !important;
  text-align: center !important;
  font-size: 30px;
  text-decoration: none;
}

.guide-link p {
  margin: 0;
  margin-top: 20px !important;
  padding: 0;
  text-decoration: underline;
  font-family: 'Bebas Neue';
  font-size: 30px;
  font-weight: 100;
}

.guide-link  p:hover {
  text-decoration-color: #fff;
  cursor: pointer;
}

.guide-link  button {
  font-size: 18px;
  font-family: 'Bebas Neue';
}

.controllers-section{
  align-items: flex-end;

}
.controller-container {
  display: inline-flex;
  align-items: center;
  padding-left: 0;

}
.keyboard-control{
  padding: 10px 15px;
  border: 1px solid #6e6e80;
  font-weight: 900;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #333;
}

.controller-type {
  vertical-align: middle;
  font-size: 20px;
  margin-left: 20px;
}

/* Counter Section */
.results-container {
  margin: auto;
  display: inline-flex;
  text-align: center;
  align-items:center ;
}
.vote-count{
  display: inline-flex;
  text-align: center;
  align-items:center ;
  border-radius: 57px;
  max-width: 49%;
}
.votes {
  margin: auto;
  margin-right: 10px;
  background: linear-gradient(45deg, #FFD700, #FF8C00);
}

.bets {
  margin: auto;
  margin-left:10px;
  background: linear-gradient(45deg, #8e44ad, #e74c3c);
}
.vote-count h3 {
  padding-left: 10px;
  font-size: 32px;
}
.vote-icon {
  width:80px;
  height: 80px;

}

.acc-rules{
  max-height: 70px;
}

/* Features Section */

.features {
  margin-top: 60px;
  margin: auto;
}

.page-headers {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 200;
  line-height: 40px;
  margin-bottom: 17px;
}

.button-display {
  text-align: center !important;
}

/* Plugin Features Box Styles */
.feature-boxes {
  margin-top: 0;
  width: 100%;
  padding: 0;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.features h2 {
  font-size: 26px;
  margin-top:20px;
}
.bet-title {
  margin-top: 30px !important;
  font-size: 30px !important;
  padding-bottom: 30px;
  border-bottom: 1px solid #6e6e80;
}

.feature-box {
  max-width: 300px;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 20px;
  background-color: black;
  border: 1px solid #6e6e80;
  border-radius: 5px;
  text-align: center;
}

.feature-box img {
  max-width: 100px;
  margin-bottom: 0;
}
.feature-box h2 {
  font-size:24px;
  margin-bottom: 20px;
  margin-top: 0
}
.feature-box h3 {
  font-size: 21px;
  font-weight: 600;
  color: #fff;
  text-align: center;
}
.feature-box p {
  font-size: 16px;
  color: #fff;
}

.vote-perc {
  display: inline-flex;
  width:100%;
  text-align: center;
  align-items: baseline;

}

.vote-perc p{
  margin-right: auto;

  padding-left: 5px;
}

.vote-perc h3 {
  margin-left: auto;

}

.feature-box button {
  margin-top: 10px;
  width: 100%;
  font-size: 22px;
}
/* Get started Section */

.get-started {
  margin-top: 50px !important;
  margin: auto;
  margin-bottom: 50px;
}

.get-started h2 {
  border-bottom: 1px solid #6e6e80;
}

.game-rules {
  display: block;
  margin: 0;
  line-height:55px;
  margin-top: 20px;
  max-width: 750px !important;
}

.game-rules li {
  margin-bottom: 25px;
  font-size: 20px;

}

.controller-container {
  margin-top: 20px;
  display: inline-flex;
}
.keyboard-control{
  margin-right:10px;
  border-radius:7px;
}
.controller-type {
  vertical-align: middle;
  font-size: 20px;
  margin-left: 20px;
}

/*Create Account Section */

.create-account-cta {
  display: block;
  text-align: center;
  border-bottom: 1px solid #6e6e80;
}

.create-account-cta h2 {
  font-size: 25px;
  border-bottom: none !important;
}

.create-account-cta button {
  height: 60px;
  font-size: 20px;
  font-family: 'Bebas Neue';
  margin-top: 0 !important;
  margin-bottom: 20px;
}

.create-account-cta button:hover {
  color: #6200ee;
}

/* Join Section */

.join-section{
  margin-top: 40px;
  text-align: center;
  margin-bottom: 40px;
}
.join-section h3 {
  font-size: 30px;
}

.join-section img {
  max-width: 100px;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.join-section a {
  text-decoration: none;
}

.join-section a:hover {
  cursor: pointer;
}
/* Footer Styles */
footer {
  background-color: black !important;
  color: #6e6e80;
  text-align: center;
  padding: 20px;
}

/* Media Queries for Responsiveness */
@media (max-width: 1290px) {
  .vote-count {
    margin:auto;
    min-width: 100%;
    text-align: center !important;

  }
  .bets {
    margin-top: 20px;
    margin-left: 0 !important;

  }
  .bet-title {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  .nav-logo {
    margin-bottom: 10px;
  }

  .nav-links {
    flex-direction: row;
    margin-left: 0;
  }

  .nav-links li {
    margin: 0 15px;
  }

  .nav-buttons {
    margin-top: 10px;
  }

  .nav-buttons .nav-link {
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .hamilton-title {
    text-align: center;
    font-size: 30px;
  }

  .game-desc{
    text-align: center;
  }

  .intro-section h1 {
    font-size: 400%;
    line-height: 80px;
  }
  .controller-container{
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;

  }

    .guide-link  {
    min-width: 100% !important;
    justify-content: center;
    text-align: center;
  }

   .guide-link p {
    font-size: 22px !important;
    padding: 15px;
    border: 1px solid #fff;
    border-radius: 7px;
    text-decoration: none;
    text-align: center !important;
  }

  .guide-link p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .create-account-cta h2 {
  font-size: 23px;
  }

  .bet-title {
    text-align: center;
  }
  .join-section {
    min-width: 100%;
  }

}

@media (max-width: 960px) {
  .feature-boxes h2 {
    font-size: 35px;
  }
  .feature-boxes img{
    margin-top: 10px !important;
    min-width: 150px !important;
  }

  .feature-boxes p {
    margin-bottom: 20px;
  }

  .vote-perc p {
    margin-bottom: 5px;
    font-size:28px !important;
  }

  .feature-boxes button {
    font-size: 35px;
  }
  .feature-box {
    margin: 20px 0;
    min-width:400px;
  }

  .feature-box p {
    font-size: 20px;
  }
  .demo-game {
    padding-top: 56.25%; /* Maintain the 16:9 aspect ratio */
  }

}
@media (max-width: 1290px) {
  .feature-boxes {
    flex-wrap: wrap !important;

  }

  .feature-box {
    max-width: 50% calc(50% - 400px);
    margin: 24px !important;
  }
}

@media (max-width: 960px) {
  .get-started .started-grid {
    flex-direction: column;

  }

  .feature-boxes{
    padding:12px;

  }

  .plugin-explain {
    margin: auto;
    text-align: left ;
    min-width: 100% !important;
    text-align: center;
    margin-top: 20px;

  }

  .guide-link{
    margin: auto;
  }
  .game-rules li {
    text-align: center;
    font-size: 22px;
    list-style:none;
  }
}

.create-account-cta .button {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .page-headers {
    text-align: center;
  }
  .create-account-cta {
    margin: auto !important;
  }

  .create-account-cta h2 {
    text-align: center;
  }

  .create-account-cta button {
    width: 100%;
    margin-top: 10px;
  }
  .get-started {
    padding-top: 0 !important;

  }
  .controllers-section{
    min-width: 100%;
    margin: auto;

  }
}
@media (max-width: 600px) {
  .vote-count{
    min-width:100%;
    text-align: center;
  }
  .vote-count h3{
    font-size:20px;
  }
  .vote-count img{
    max-width: 40px !important;
    max-height: 40px !important;
  }
  .bet-title{
  text-align: center !important;
  font-size: 22px;
  }
  .demo-game {
    padding-top: 56.25%; /* Maintain aspect ratio for mobile */
  }
}
@media screen and (orientation: landscape) {
  .demo-game {
    width: auto; /* Adjust width based on height */
    height: 90vh; /* Full height of the viewport */
    padding-top: 0; /* Remove padding-top */
  }
}

@media screen and (orientation: portrait) {
  .demo-game {
    width: 100%; /* Full width of the viewport */
    height: auto; /* Adjust height based on width */
    padding-top: 76.47%; /* Maintain aspect ratio */
  }
}
</style>
