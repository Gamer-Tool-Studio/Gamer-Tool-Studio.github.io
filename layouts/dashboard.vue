<template>
  <v-layout :style="cssVars">
    <v-app-bar color="w-100" elevation="0">
      <AppHeader />
    </v-app-bar>
    <v-main class="content h-50"><slot /></v-main>
    <AppFooter />
  </v-layout>
</template>
<script setup>
import { useTheme } from "vuetify";
import { useRoute } from "vue-router";
import { computed } from "vue";

const cssVars = {};

const route = useRoute();

const path = computed(() => route.path);

const theme = useTheme();

theme.global.name.value = "light";
cssVars["--background"] = "white";
</script>
