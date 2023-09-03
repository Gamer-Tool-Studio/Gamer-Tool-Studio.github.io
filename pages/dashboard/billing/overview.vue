<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Billing Overview</h1>
      </v-col>
      <v-col cols="12">
        <h2> Pay as you go</h2>
      </v-col>
      <v-col cols="12">
        <p> You'll be billed at the end of each calendar month
           for usage during that month.</p>
      </v-col>
      <v-col cols="12">
        <button class="cancel-paid">Cancel paid account</button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="billing-card">
        <div class="items-container">
          <div class="img-container methods-bcg">
            <img src="~/assets/images/credit-card-icon.jpeg">
          </div>
          <div class="text-container">
            <h3>Payment methods</h3>
            <p class="billing-desc"> Add or change payment method</p>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="billing-card">
        <div class="items-container">
          <div class="img-container history-bcg">
            <img src="~/assets/images/document-icon.png">
          </div>
          <div class="text-container">
            <h3>Billing history</h3>
            <p class="billing-desc"> View past and current invoices</p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="billing-card">
        <div class="items-container">
          <div class="img-container pricing-bcg">
            <img src="~/assets/images/dollar-icon.png">
          </div>
          <div class="text-container">
            <h3>Pricing</h3>
            <p class="billing-desc"> View pricing plans</p>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="billing-card">
        <div class="items-container">
          <div class="img-container preferences-bcg">
            <img src="~/assets/images/settings-icon.png">
          </div>
          <div class="text-container">
            <h3>Preferences</h3>
            <p class="billing-desc">Manage company information</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
useHead({
  title: "Overview ",
});
</script>
<style lang="scss">

.cancel-paid {
  background-color: #ececf1;
  border-radius: 7px;
  padding: 6px 12px;
  font-size:14px;
}

.cancel-paid:hover {
background-color:gray; 
}

.billing-card {
  margin-top: 30px;
  display: block;
}

.items-container {
  display: inline-flex;
  min-width: 80%;
}

.img-container {
  padding: 15px;
  max-width:50px;
  max-height: 50px;
  border-radius: 7px;
  margin: 0;
  text-align: center;
  vertical-align: middle;
}

.items-container:hover {
  cursor: pointer;
}

.img-container img {
  max-width: 100%;

}

.methods-bcg {
  background-color: #19c37d;
  margin:0;
}

.history-bcg {
  background-color: #5436da;
}

.pricing-bcg {
  background-color: #f4ac36;
}

.preferences-bcg {
  background-color: #dd5ce5;
}
.text-container {
  margin-left: 10px;
}

.text-container h3 {
  font-size: 16px;
}

.billing-desc{
  font-size: 14px;
}
</style>