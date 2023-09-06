<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Billing Preferences</h1>
        </v-col>
        <v-col cols="12">
          <p>Changes to these preferences will apply to future invoices only. If you need a 
            past invoice reissued, please contact bil@gamertoolsstudio.com.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="form1">
            <h3>Company Name</h3>
            <p>If specified, this name will appear on 
                invoices instead of your organization name.</p>
            <input type="form" placeholder="" class="form_input">
        </v-col>
        <v-col cols="8" class="form1">
            <h3>Purchase order (PO) number</h3>
            <p>Your PO number will be displayed on future invoices.</p>
            <input type="form" placeholder="" class="form_input">
        </v-col>
        <v-col cols="8" class="form1">
            <h3>Billing email</h3>
            <p>Invoices and other billing notifications will be sent here (in addition to
                being sent to the owners of your organization).</p>
            <input type="form" placeholder="" class="form_input">
        </v-col>
        <v-col cols="8" class="form1">
          <h3>Primary business address</h3>
          <p>This is the physical address of the company purchasing OpenAI services and is used to calculate any applicable sales taxes.</p>
            <select class="form_input input2" ref="countrySelect">
            <option value="" disabled selected>Country</option>
            <option v-for="country in countries" :key="country.code" :value="country.name">{{ country.name }}</option>
          </select>
          <input type="form" placeholder="Address line 1" class="form_input input2">
          <input type="form" placeholder="Address line 2" class="form_input input2">
          <input type="form" placeholder="City" class="form_input input3">
          <input type="form" placeholder="Postal code" class="form_input input3">
          <input type="form" placeholder="State, country, province or region" class="form_input input2">
        </v-col>
        <v-col cols="8" class="form1">
            <h3>Billing tax ID</h3>
            <p>If you are a business tax registrant, please enter your business tax ID here.</p>
            <input type="form" placeholder="Tax ID" class="form_input input3">  
            <input type="form" placeholder="Number" class="form_input input3">            
        </v-col>
        <v-col cols="12">
            <button class="button">Save</button>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  useHead({
    title: "preferences",
  });

</script>

  <style lang="scss">
  
  .form1 {
    display: block;
  }

  .form1 h3 {
    font-size: 15px;
  }

  .form1 p {
    margin-top: 7px;
    margin-bottom: 7px;
    font-size: 14px;
  }

.form_input {
    width: 40%;
    border :1px solid #6e6e80;
    border-radius: 3px;
    padding: 4px;
    font-size: 14px;
    margin-right: 10px;
  }

.form_input:focus,
.form_input:hover,
.form_input:active {
    border-color: #6200EE !important;
    
  }

  .input2 {
    width:98%;
    padding: 7px;
    margin-bottom: 10px;

  }

  .input3 {
    padding: 7px;
    width: 48%;
    margin-bottom: 10px;
    margin-right: 2%;
  }

  </style>