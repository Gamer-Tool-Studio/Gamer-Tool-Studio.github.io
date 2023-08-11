<template>
  <v-container class="pricing">
    <v-row class="intro-section">
      <v-col>
        <h1>Dialog Craft GPT Pricing Packs</h1>
        <p>
          Simple and flexible pricing plans adapted to the development stage of
          your game. Pay per volume of requests made to our API only.<br> Only Developer packs are available at the moment. Production packs for games published will be available soon.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <div class="feature-boxes">
        <div class="feature-box">
          <h3>Free Trial</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">1K</li>
            <li class="align-right">1K</li>
            <li class="align-right">1</li>
          </ul>
          <h4 class="light-header">$00,00</h4>
          <button class="button">Subscribe</button>
        </div>
        <div class="feature-box">
          <h3>Solo Developer</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">2M</li>
            <li class="align-right">1.5M</li>
            <li class="align-right">1</li>
          </ul>
          <h4 class="bold-header">$199,00</h4>
          <button class="button">Subscribe</button>
        </div>
        <div class="feature-box">
          <h3>Indie Studio</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">100M</li>
            <li class="align-right">75M</li>
            <li class="align-right">10</li>
          </ul>
          <h4 class="light-header">$989,00</h4>
          <button class="button">Subscribe</button>
        </div>
      </div>
    </v-row>

    <section class="contact-us">
      <h3>Need a tailored solution for your game?</h3>
      <button class="button">Contact our Team</button>
    </section>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "default",
});
</script>


<style lang="scss">

.pricing {
  margin-top: 0px;
  padding-top: 0px;
}

.pricing .intro-section h1 {
  font-size: 40px;
  line-height: 88px;
  margin-bottom: 15px;
}

.pricing .feature-boxes {
  margin-bottom: 30px;
  margin-top:30px;
}

.pricing p {
  font-size: 20px;
  font-weight: 100;
}

.pricing .feature-box h3 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 26px;
}

.pricing .feature-box h4 {
  font-size: 25px;
  margin-bottom: 10px;
}

.bold-header {
  font-weight: 900;
  font-size: 20px;
  font-weight: 100;
}
.light-header {
  font-weight: 200;
  font-size: 20px;
  font-weight: 100;
}

.pricing .feature-box button {
  font-size: 20px;

}

.pricing .feature-box button:hover {
  color: #6200EE;
}

.contact-us h3{
  font-family: "Titillium Web";
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 26px;
}

.contact-us button {
  font-size: 18px;
}

.contact-us button:hover {
  color: #6200EE;
}

.light-button {
  background-color: #fff;
}
</style>
