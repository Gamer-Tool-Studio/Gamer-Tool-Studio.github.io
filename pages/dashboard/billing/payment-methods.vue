<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Payment methods</h1>
      </v-col>
    </v-row>
    <v-row class="cards-container">
      <v-col cols="4">
        <div class="cards-section">
         <div class="logo-container">
          <img src="~/assets/images/visa-logo.jpeg">
          <h3>***** 833798</h3>
         </div>
         <div class="text-container">
          <p class="billing-desc"> Expires 01/2024</p>
         </div>
         <div class="delete-default">
          <p> Set as Default</p>
          <p> Delete</p>
         </div>
        </div>
        </v-col>
        <v-col cols="4">
        <div class="cards-section">
         <div class="logo-container">
           <img src="~/assets/images/visa-logo.jpeg">
             <h3>***** 833798</h3>
          </div>
          <div class="text-container">
            <p class="billing-desc"> Expires 01/2024</p>
          </div>
          <div class="delete-default">
            <p> Set as Default</p>
            <p> Delete</p>
          </div>
      </div>
        </v-col>
        <v-col cols="4">
        <div class="cards-section">
         <div class="logo-container">
           <img src="~/assets/images/visa-logo.jpeg">
             <h3>***** 833798</h3>
          </div>
          <div class="text-container">
            <p class="billing-desc"> Expires 01/2024</p>
          </div>
          <div class="delete-default">
            <p> Set as Default</p>
            <p> Delete</p>
          </div>
      </div>
    </v-col>  
    </v-row>
    <v-row>
      <v-col cols="12">
        <button class="cancel-paid">Add payment method</button>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup>
useHead({
  title: "Payment methods ",
});
</script>

<style lang="scss">

.cards-section {
  border:1px solid #ECECF1;
  width:100%;
  padding: 10px;
}

.logo-container {
  margin-left:1%;
  max-width: 100%;
  display: inline-flex;
  margin-bottom: 7px;
}

.logo-container img {
  max-width: 80px;
  max-height: 20px;
}

.logo-container h3 {
  margin-left:20px;
  font-size: 16px;
  font-weight: 600;
}

.text-container{
  margin-left: 0;
}

.text-container p {
  margin-bottom: 5px;
  padding: 0;
  font-size: 14px;
  font-weight: 300;
}

.delete-default {
  width: 100%;
  display: inline-flex;
  margin-left: 0;
}

.delete-default p {
  margin-left: 0 !important;
  padding-left: 0 !important;
  margin-right: 5%;
  font-size: 14px;
  font-weight: 300;
  color:#6200EE;
  padding: 3px;
} 

.delete-default p:hover{
  background-color: rgba(98, 0, 238, 0.5);
  font-weight: 600;
  cursor: pointer;
} 


</style>
