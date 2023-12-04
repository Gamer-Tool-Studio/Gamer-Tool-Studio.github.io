<template>
    <v-container class="lp">
      <v-row>
        <v-col cols="12" class="intro-section">
          <h1>CLUAIDO - Play a detective game with AI characters. </h1>
        </v-col>
        <v-col cols="12">
          <h2 class="page-headers">
            Who Killed MR.Hamilton?
          </h2>
          <h3 class="game-desc">You were called to the victim's house to solve his misterious death. There are seven suspects in the mansion. Talk to them and unveil the clues that will lead you to the cuplrit.
          </h3>
      </v-col>
        <v-col cols="12">
          <div class="demo-video">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/p-2NLT5jpcA?si=9KDx8_A2xNvWzh2C"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
      </v-row>
      <v-row class="get-started">
        <v-col cols="6">
          <h2 class="page-headers">
            Game Rules
          </h2>
        </v-col>
        <v-col cols="6">
          <h2 class="page-headers">
            How To Play
          </h2>
        </v-col>
        <v-col cols="6" class="plugin-explain">
          <ul class="how-to-start">
            <li>There are 7 suspects and one culprit only inside the house.</li>
            <li>
              You can interact freely with the characters and ask them questions with up to 50 words-lenght.
            </li>
            <li>
              All characters will tell you the truth except for the culprit.
            </li>
            <li>You can make 20 questions before the culprit runs away.</li>
            <li>Clues are concieled within the characters and all over the house. </li>
            <li>You have only one shot to indentify the culprit and you can make your accusation at any time, at the entry of the mansion.</li>
          </ul>
        </v-col>
        <v-col cols="6" class="engines-available">
          <div class="engine-logo-container">
            <img class="engine-logo" src="images/RMMZ.png" />
          </div>
        </v-col>
        <v-col cols="12">
          <h2 class="page-headers">
            Note: In order to play this game you will need an account with Gamer Tool Studio and to connect with your API key
          </h2>
          <div class="intro-cta">
          <button class="button">Create Account</button>
          <a href="https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction"><p>Read the full user guide.</p></a>
        </div>
        </v-col>
      </v-row>
      <v-row class="features">
        <div class="feature-boxes">
          <div class="feature-box">
            <h3>Open world building</h3>
            <p>
              Leverage the capabilities of AI and enable players to input their own text to interact with characters
              and open the possibilities within to your game to the maximum.
            </p>
          </div>
          <div class="feature-box">
            <h3>Unscripted NPCs</h3>
            <p>
              Build immersive character backstories and customize the way they respond to players. Make chat GPT a friend
              or a foe in your game quests.
            </p>
          </div>
          <div class="feature-box">
            <h3>Intuitive Interface</h3>
            <p>
              NPC-GPT plugin requires no programming experience to setup and use from within your favourite game
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
      
  
        <v-col cols="12" class="start-trial">
          <h2 class="page-headers">
            Are you ready to take your game development to the next level with the ultimate AI-Powered character building
            tool?
          </h2>
          <br />
          <button class="button">Start Free Trial Now</button>
        </v-col>
  
    </v-container>
  </template>
  <script lang="ts" setup>

  definePageMeta({
    layout: 'default',
  });
  
  useHead({
    title: 'Demo Game',
  });

  </script>
  
  <style lang="scss" scoped>
h1,
h2,
* {
  color: #fff;
}

main.lp {
  > div {
    max-width: 1200px;
    margin: auto;  
  }
}

/* Section Styles */
section {
  margin-bottom: 30px;
}


.lp footer {
  color: black;
}
/* Intro Section Styles */

.intro-section h1 {
  margin-right: 2%;
  line-height: 100px;
  margin-bottom: 60px;
}

/*Demo Video */

.demo-video {
  display: block;
  margin-top: 40px;
}

.game-desc {
  margin-top: 20px;
  font-size: 26px;
  font-weight: 300;
}

.intro-cta {
  margin-top: 40px;
  display: inline-flex;
  align-items: flex-end;
  flex-wrap: wrap;
  align-content: center;
  min-width: 100%;
  
}

.intro-cta p {
  margin: 0;
  padding: 0;
  margin-left: 20px;
  text-decoration: underline;
  font-family: 'Bebas Neue';
  font-size: 20px;
  font-weight: 100;
}

.intro-cta p:hover {
  text-decoration-color: #fff;
  cursor: pointer;
}

.intro-cta button {
  font-size: 18px;
  font-family: 'Bebas Neue';
}

.intro-cta button:hover {
  color: #6200ee;
}

/* Features Section */

.features {
  border-top: 1px solid #6e6e80;
  margin-top: 60px;
  margin: auto;
}

.page-headers {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 200;
  line-height: 40px;
}

/* Plugin Features Box Styles */
.feature-boxes {
  margin-top: 60px;
  width: 100%;
  padding: 0;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.feature-box {
  max-width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: black;
  border: 1px solid #6e6e80;
  border-radius: 5px;
  text-align: center;
}

.feature-box img {
  max-width: 100px;
  margin-bottom: 15px;
}

.feature-box h3 {
  font-size: 21px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 30px;
  text-align: center;
}
.feature-box p {
  font-size: 20px;
  color: #fff;
}

.button-display {
  text-align: center !important;
  border-bottom: 1px solid #6e6e80;
}

.button-display button {
  font-size: 20px !important;
  height: 60px;
  margin-bottom: 30px;
}
/* Get started Section */

.get-started {
  margin-top: 60px;
  border-top: 1px solid #6e6e80;
  margin: auto;
}

.how-to-start {
  display: block;
  margin: 0;
  line-height: 30px;
  font-size: 19px;
  margin-top: 30px;
}

.how-to-start li {
  margin-bottom: 25px;
  min-width: 150%; /* Make the list items fill the full width */
}
.engines-available {
  padding: 5px;
}

.engine-logo-container {
  display: block;
}
.engine-logo {
  max-width: 100%;
  object-fit: contain;
}

.started-hs {
  color: #fff;
  font-weight: 200;
  font-size: 25px;
}

.code-section {
  padding: 0;
  margin: 0;
}

.code-display {
  max-width: 92%;
  overflow-x: auto;
}

.code-block {
  text-align: left;
}

.code-style {
  font-family: monospace;
  font-size: 16px;
  white-space: pre-wrap;
}

.typed-display {
  display: block;
  max-width: 100%;
  margin-top: 0;
  margin-left: 10%;
  margin-right: 10%;
  font-family: monospace;
  font-size: 16px;
  border: 1px solid #6e6e80;
  border-radius: 7px;
  padding: 5px;
}
.typed-message {
  background-color: rgba(98, 0, 238, 0.6);
  padding: 3px;
  white-space: pre-wrap;
  max-width: 100px !important;
  font-family: inherit;
  font-size: inherit;
}

.typed-cursor {
  display: inline-block;
  width: 8px;
  height: 20px;
  background-color: #6200ee;
  margin-left: 4px; /* Adjust the margin as needed */
  animation: blink 1s infinite;
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

/*Start Trial Section */


.start-trial {
  display: block;
  border-top: 1px solid #6e6e80;
  text-align: center;
}

.start-trial h2 {
  text-align: left;
}

.start-trial button {
  height: 60px;
  font-size: 20px;
  font-family: 'Bebas Neue';
}

.start-trial button:hover {
  color: #6200ee;
}

/* Footer Styles */
footer {
  background-color: black;
  color: #6e6e80;
  text-align: center;
  padding: 20px;
}

/* Media Queries for Responsiveness */
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
  .demo-video {
    margin-left: 20px;
  }

  .intro-section h1 {
    font-size: 400%;
    line-height: 80px;
  }

  .intro-cta {
    width: 100% !important;
    align-items: center !important;
  }

  .intro-cta button {
    font-size: 22px !important;
    padding: 20px;
    width: 45% !important;
  }

  .intro-cta p {
    font-size: 22px !important;
    padding: 15px;
    border: 1px solid #fff;
    border-radius: 7px;
    text-decoration: none;
  }

  .intro-cta p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

@media (max-width: 960px) {
  .feature-boxes {
    flex-direction: column;
    align-items: center;
  }

  .feature-box {
    margin: 20px 0;
  }

  .feature-box p {
    font-size: 20px;
  }
}
@media (max-width: 1280px) {
  .feature-boxes {
    flex-wrap: wrap !important;
  }

  .feature-box {
    max-width: 50% calc(50% - 400px) !important;
    margin: 24px !important;
  }
}

@media (max-width: 820px) {
  .get-started .started-grid {
    flex-direction: column;
  }

  .plugin-explain {
    margin: auto;
    cols: 12 !important;
    min-width: 100% !important;
  }
  .how-to-start {
    margin-top: 10%;
    margin-right: 20%;
    margin-left: 10%;
  }
  .how-to-start li {
    text-align: center;
    font-size: 22px;
  }

  .engines-available {
    min-width: 100% !important;
    margin: auto !important;
  }
 
}

.start-trial .button {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .page-headers {
    text-align: center;
  }
  .start-trial {
    margin: auto !important;
  }

  .start-trial h2 {
    text-align: center;
  }

  .start-trial button {
    width: 100%;
    margin-top: 10px;
  }

}

@media (min-width: 768px) {
  .nav-links {
    flex-direction: row;
  }

  .nav-links li {
    margin: 0 10px;
  }

  .nav-buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .how-to-start {
    width: 60%;
  }

  .engines-available {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  

}

  </style>
  