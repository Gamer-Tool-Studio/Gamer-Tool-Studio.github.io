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

</style>