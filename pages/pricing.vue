<template>
  <v-container class="pricing">
    <v-row class="intro-section">
      <v-col>
        <h1>NPC-GPT Pricing Plans</h1>
        <p>
          Simple and flexible pricing plans adapted to the development stage of
          your game. Pay per volume of requests made to our API only.<br> Only Developer packs are available at the moment. Packs for games in production will be available soon.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <div class="feature-boxes">
        <div class="feature-box light-boxes">
          <h3 class="light-title">Free Trial</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">50K</li>
            <li class="align-right">20K</li>
            <li class="align-right">1</li>
          </ul>
          <div class="price-display-free">
            <h4 class="light-header">Free</h4>
          </div>
          <a href=""><button class="button light-button">Subscribe</button></a>
        </div>
        <div class="feature-box bold-boxes">
          <h3>Solo Developer</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">10M</li>
            <li class="align-right">5M</li>
            <li class="align-right">1</li>
          </ul>
          <div class="price-display-free">
            <h4 class="bold-header">$59,00</h4>
          </div>
          <a href="https://buy.stripe.com/aEUaGd0lbgvv8BafYY"><button class="button">Subscribe</button></a>
        </div>
        <div class="feature-box light-boxes">
          <h3 class="light-title">Indie Studio</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li></li>
            <li>Users</li>
            <li class="align-right">50M</li>
            <li class="align-right">30M</li>
            <li class="align-right">10</li>
          </ul>
          <div class="price-display-free">
            <h4 class="light-header">$259,00</h4>
          </div>
          <a href="https://buy.stripe.com/fZebKhc3Ta77eZy5kl"><button class="button light-button">Subscribe</button></a>
        </div>
      </div>
    </v-row>
    <v-col cols="12" class="contact-us">
      <h3>Need a tailored solution for your project?</h3>
      <button class="button no-hover-button">Contact our Team</button>
    </v-col>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "default",
});


import { ref, onMounted } from "vue";

const isLightBoxHovered = ref(false);

const toggleBoldBoxHovered = () => {
  const boldBoxes = document.querySelectorAll(".bold-boxes");
  boldBoxes.forEach((box) => {
    if (isLightBoxHovered.value) {
      box.classList.add("hovered");
    } else {
      box.classList.remove("hovered");
    }
  });
};

const toggleButtonStyles = () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    if (isLightBoxHovered.value) {
      button.style.backgroundColor = "#fff";
      button.style.color = "#6200ee";
    } else {
      button.style.backgroundColor = "#6200ee";
      button.style.color = "#fff";
    }
  });
};

onMounted(() => {
  const lightBoxes = document.querySelectorAll(".light-boxes");
  lightBoxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      isLightBoxHovered.value = true;
      toggleBoldBoxHovered();
      toggleButtonStyles();
    });
    box.addEventListener("mouseleave", () => {
      isLightBoxHovered.value = false;
      toggleBoldBoxHovered();
      toggleButtonStyles();
    });
  });
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

.bold-boxes .price-display {
  margin-top: 9px !important;
  margin-bottom: 17px !important;
}

.light-boxes {
  border: 2px solid #ECECF1;
  transition: border-color 0.3s ease-in-out; /* Add transition for smooth effect */
}

.light-boxes:hover {
  border-color: #6200EE;
}

.bold-boxes {
  border: 1px solid #6200EE;
  transition: border-color 0.3s ease-in-out; /* Add transition for smooth effect */
}


.bold-boxes.hovered {
  border-color: #ECECF1;
}

.pricing p {
  font-size: 20px;
  font-weight: 100;
}

.pricing .feature-box {
  background-color: #fff;
  margin-left:30px;
  margin-right:30px;
  width: 280px;
}

.pricing-tables {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  column-count: 2;
  column-gap: 20px;
}

.pricing-tables li {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: "NunitoSans";
}

.align-right {
  text-align: end;
}

.feature-box button {
  border: none;
}

.pricing .feature-box h3 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 26px;
}

.pricing .feature-box h4 {
  margin-bottom: 10px;
}

.light-title {
  font-weight: 100 !important;
}

.bold-header {
  font-weight: 500;
  font-size: 30px;
  color:  #6200EE;
}

.bold-month {
  font-size: 18px;
  font-weight: bold;
  padding-top: 3px;
  color:#6200EE;
}

.light-header {
  font-weight: 400;
  font-size: 20px;
}

.price-display {
  display: inline-flex;
  margin-left: auto;
  margin-right:auto;
  margin-top: 14px;
  margin-bottom: 26px;
  min-width: 100%;
}

.price-display-free {
  margin-top:12px;
  margin-bottom: 38px;

}

.price-display h4 {
  width:58%;
  text-align: right;

}

.price-display h5 {
  text-align: left;
  width: 43%;
  margin-bottom: 0;
  padding-left:0;
  margin-top:8px;
}



.light-month {
font-weight: 500;
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
  border: 1px solid #6200EE !important;
  color: #6200EE;
}

.light-button:hover {
  background-color:#6200EE;
  border: 1px solid #fff !important;
  color: #FFF !important;
}

@media (max-width: 900px) {
  .contact-us button {
    padding: 15px;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}

</style>
