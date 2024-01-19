<template>
  <modal-connect-wallet v-if="showModal" :suspectId="selectedSuspectId" @close="showModal = false" />
  <div :class="{ 'dimmed-content': showModal }">
    <v-container class="lp">
      <v-row>
        <v-col cols="12" class="intro-section">
          <h1>CLUAIDO - Play a detective game with AI characters.</h1>
        </v-col>
        <v-col cols="12">
          <h2 class="hamilton-title"> Who Killed Mr. Hamilton?</h2>
          <p class="game-desc">You were called to the victims' house to solve his misterious death. Talk to the people inside and unveil the clues that will lead you to the culprit. </p>
        </v-col>
        <v-col cols="12" class="demo-section">
          <div class="demo-game">
            <iframe
              id="gameIframe"
              src="/cluaido/index.html"  
              title="CLUAIDO"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
      </v-row>
      <v-row class="get-started">
        <v-col cols="6" class="controllers-section">
          <v-col cols="12">
            <h2 class="page-headers">Controllers</h2>
          </v-col>
          <v-col cols="12" class="controller-container">
            <div class="keyboard-control">&#11014;</div> <!-- Up arrow -->
            <div class="keyboard-control">&#11015;</div> <!-- Down arrow -->
            <div class="keyboard-control">&#10132;</div> <!-- Right arrow -->
            <div class="keyboard-control">&#11013;</div> <!-- Left arrow -->
            <p class="controller-type">Move Player</p>
          </v-col>
          <v-col cols="12" class="controller-container enter-com">              
            <div class="keyboard-control">Enter</div>
            <p class="controller-type">Action Button/ Confirm Action</p>
          </v-col>
          <v-col cols="12" class="controller-container">
            <div class="keyboard-control">Esc</div>
            <p class="controller-type">Open Menu/ Cancel Action</p>
            </v-col>
            <v-col cols="12" class="controller-container">
              <div class="guide-link">
                <a href="https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"><p>Read the full user guide.</p></a>
              </div>
            </v-col>
          </v-col>
          <v-col cols="6" class="plugin-explain">
            <v-col cols="12">
              <h2 class="page-headers">Game Rules</h2>
            </v-col>
            <v-col cols="12">
              <ul class="game-rules">
                <li>There are 7 suspects and only one culprit inside the house.</li>
                <li>
                  You can ask whatever you want to the characters.
                </li>
                <li>
                  All characters will tell you the truth except for the culprit.
                </li>
                <li>You can make 21 questions before the culprit runs away.</li>
                <li>Clues are conceiled within the characters and all over the house. </li>
                <li>You have only one shot to identify the culprit.</li>
              </ul>
            </v-col>
          </v-col>
          <v-col cols="12" class="create-account-cta">
            <h2 class="page-headers">
              In order to play this game you will need an account with Gamer Tool Studio and to connect with your API key.
            </h2>
            <br/>
            <button class="button">Create Account</button>
          </v-col>
        </v-row>
        <v-col cols="12" class="intro-section">
          <h1> Can you really crack this case, detective?</h1>
        </v-col>
        <v-col cols="12">
          <v-col cols="6" class="vote-count votes">
            <div class="results-container">
            <img src="~/assets/images/document-icon.png"  class="vote-icon">
              <h3 class="prize-money">15,134</h3>
              <h3 class="counter-text">Accusations Made</h3>
            </div>
          </v-col>
          <v-col cols="6" class="vote-count bets">
            <div class="results-container">
              <img src="~/assets/images/dollar-icon.png" class="vote-icon">
              <h3 class="prize-money">150,565$</h3>
              <h3 class="counter-text">Prize Money</h3>
            </div>
          </v-col>
        </v-col>
        <v-row class="features">
          <h2 class="bet-title"> Bet on the character you think is the culprit and earn the money from the bets of failed guesses. Results will be announced on the 1st of March.</h2>
          <div class="feature-boxes">
            <div class="feature-box">
              <h2>The Wife</h2>
              <img src="/images/wife.png">
              <v-col cols="12" class="vote-perc">
                <h3>23%</h3><p>votes</p>
              </v-col>
              <p>
                The outspoken wife of Mr.Hamilton. Does the victim's life partner conceil his darkest secrets?
              </p>
              <button class="button" @click="connectAndOpenModal(1)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Butler</h2>
              <img src="/images/butler.png">
              <v-col cols="12" class="vote-perc">
                <h3>16%</h3><p>votes</p>
              </v-col>
              <p>
                A refined gentleman in whom Mr. Hamilton placed the highest trust. Was it misplaced?
              </p>
              <button class="button" @click="connectAndOpenModal(2)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Maid</h2>
              <img src="/images/maid.png">
              <v-col cols="12" class="vote-perc">
                <h3>11%</h3><p>votes</p>
              </v-col>
              <p>
                A shy and caring servant who might know more about her masters' life than they know.
              </p>
              <button class="button" @click="connectAndOpenModal(3)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Gardener</h2>
              <img src="/images/gardener.png">
              <v-col cols="12" class="vote-perc">
                <h3>7%</h3><p>votes</p>
              </v-col>
              <p>
                A simple working man that seems to only care about plants and flowers. Or does he?
              </p>
              <button class="button" @click="connectAndOpenModal(4)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Cook</h2>
              <img src="/images/cook.png">
              <v-col cols="12" class="vote-perc">
                <h3>2%</h3><p>votes</p>
              </v-col>
              <p>
                An extravagant cooking master who's been in the family since she was a child? Is there a catch?
              </p>
              <button class="button" @click="connectAndOpenModal(5)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Journalist</h2>
              <img src="/images/journalist.png">
              <v-col cols="12" class="vote-perc">
                <h3>8%</h3><p>votes</p>
              </v-col>
              <p>
                A rising reporting star investigating Mr.Hamilton's latest scandal. Is he involved?
              </p>
              <button class="button" @click="connectAndOpenModal(6)">Accuse</button>
            </div>
            <div class="feature-box">
              <h2>The Businessman</h2>
              <img src="/images/businessman.png">
              <v-col cols="12" class="vote-perc">
                <h3>18%</h3><p>votes</p>
              </v-col>
              <p>
                A rude influential businessman with life-long dealings with Mr.Hamilton. Have things gone wrong?
              </p>
              <button class="button" @click="connectAndOpenModal(7)">Accuse</button>
            </div>
          </div>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="bet-ttle">Want to know more about the game?</h2>
          </v-col>
          <v-col cols="4" class="join-section">
            <a href="LINK_TO_BETTING_GAME_RULES">
              <img src="~/assets/images/document-icon.png" alt="Betting Game Rules">
              <h3> Betting Game Rules</h3>
            </a>
          </v-col>
          <v-col cols="4" class="join-section">
            <a href="https://discord.gg/JdDwRfTGNF">
              <img src="/images/discord-logo.png" alt="Join the Community">
              <h3> Join the Community</h3>
            </a>
          </v-col>
          <v-col cols="4" class="join-section">
            <a href="https://twitter.com/gamertoolstudio">
              <img src="/images/twitter-white-logo.png" alt="Follow us on Twitter">
              <h3> Follow us on Twitter</h3>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<script setup>
useHead({
  title: "Demo Game ",
});
import { ref } from 'vue';

const showModal = ref(false);
const selectedSuspectId = ref(null);

const connectAndOpenModal = (suspectId) => {
  selectedSuspectId.value = suspectId;
  showModal.value = true;
};

</script>


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
.demo-game {
  position: relative;
  width: 100%;
  max-width: 816px; /* Adjust if needed */
  max-height: 624px !important;
  margin: auto;
  overflow: hidden; /* Hide overflow to prevent scrollbars */
}

.demo-section {
  position: relative;
  width: 100%;
  margin: auto;
  max-height: 624px !important;
  
}

#gameIframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
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

.guide-link p {
  margin: 0;
  margin-top: 20px !important;
  padding: 0;
  text-decoration: underline;
  font-family: 'Bebas Neue';
  font-size: 20px;
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

/* Plugin Features Box Styles */
.feature-boxes {
  margin-top: 40px;
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
.bet-ttle {
  margin-top: 50px !important;
  font-size: 30px !important;
  padding-bottom: 20px;
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
  line-height: 30px;
  margin-top: 40px;
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
  background-color: black;
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
  .bet-ttle {
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

  .bet-ttle {
    text-align: center;
  }
  .join-section {
    min-width: 100%;
  }

}

@media (max-width: 960px) {
  .feature-boxes {
    flex-direction: column;
    align-items: center;
  }

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

@media (max-width: 820px) {
  .get-started .started-grid {
    flex-direction: column;
    
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
  .feature-box{
    min-width: 250px !important;
    max-width:350px !important;
    margin-left: auto !important;
    margin-right: auto !important;
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
