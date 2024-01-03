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
        <p> You are billed at the moment you acquire token credits. 
            Check the <NuxtLink to="/dashboard/usage" class="internal-link">Usage page</NuxtLink> to confirm detailed token usage.</p>
      </v-col>
      <v-col cols="3" class="addTokensSection">
        <NuxtLink to="/pricing">
          <button
          class="cancel-paid"
          type="submit"
        >
          Add token credits
          </button>
        </NuxtLink>
      </v-col>
      <v-col cols="3" class="addTokensSection">
        <modal-cancel-plan
          v-if="cancelPlan"
          @close="cancelPlan= false"
        >
        </modal-cancel-plan>
        <button
          class="cancel-paid"
          type="submit"
          @click="cancelPlan = true"
        >
        Cancel plan
        </button>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="12" class="billing-card">
        <a href="/dashboard/billing/payment-methods">
        <div class="items-container">
          <div class="img-container methods-bcg">
            <img src="~/assets/images/credit-card-icon.jpeg">
          </div>
          <div class="text-container">
            <h3>Payment methods</h3>
            <p class="billing-desc"> Add or change payment method</p>
          </div>
        </div>
        </a>
      </v-col> -->
      <v-col cols="12" class="billing-card">
        <a href="/dashboard/billing/history">
        <div class="items-container">
            <div class="img-container history-bcg">
              <img src="~/assets/images/document-icon.png">
            </div>
            <div class="text-container">
              <h3>Billing history</h3>
              <p class="billing-desc"> View past and current invoices</p>
            </div>
          </div>
        </a>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="billing-card">
        <a href="/pricing">
          <div class="items-container">
            <div class="img-container pricing-bcg">
              <img src="~/assets/images/dollar-icon.png">
            </div>
            <div class="text-container">
              <h3>Pricing</h3>
              <p class="billing-desc"> View pricing plans</p>
            </div>
          </div>
        </a>
      </v-col>
      <v-col cols="12" class="billing-card">
        <a href="/dashboard/billing/preferences">
          <div class="items-container">
            <div class="img-container preferences-bcg">
              <img src="~/assets/images/settings-icon.png">
            </div>
            <div class="text-container">
              <h3>Preferences</h3>
              <p class="billing-desc">Manage company information</p>
            </div>
          </div>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

const cancelPlan = ref(false);

useHead({
  title: "Overview",
});

</script>
<style lang="scss">
.internal-link {
  color: #000000;
}

.addTokensSection {
  max-width:160px;
  min-width:160px;
  margin-bottom: 20px;
}

.cancel-paid {
  background-color: #ececf1;
  border-radius: 7px;
  padding: 6px 12px;
  font-size:14px;
  color: #000000DE;
}

.cancel-paid:hover {
background-color:#d9d9e3; 
}

.billing-card {
  margin-top: 20px;
  display: block;
}

.billing-card a{
  color:inherit;
  text-decoration: none;
}

.billing-card a:active,
.billing-card a:hover
{
  text-decoration: none;
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

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .billing-card{
    min-width: 100%;
  }

}


</style>