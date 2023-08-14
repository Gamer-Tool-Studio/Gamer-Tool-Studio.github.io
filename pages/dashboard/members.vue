<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="10">
        <h1>Members</h1>
      </v-col>
      <v-col cols="2">
        <button class="button" type="submit">Invite members</button>
      </v-col>
      <v-col v-for="member in members">
        <dashboard-member-card :member="member"> </dashboard-member-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
const store = useUserStore();

const { members } = storeToRefs(store);

useHead({
  title: "Members ",
});
</script>
