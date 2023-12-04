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
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const cssVars = {};

const route = useRoute();

const path = computed(() => route.path);

const theme = useTheme();

watch(
  path,
  () => {
    theme.global.name.value = ['/', '/gameDemo'].includes(path.value) ? 'myDarkTheme' : 'light';
    cssVars['--background'] = ['/', '/gameDemo'].includes(path.value) ? 'black' : 'white';
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.v-layout {
  flex-direction: column;
  background-color: var(--background);
  transition: background-color 1.5s ease;
  min-height: 100vh;
}
.content {
  margin-top: 4rem;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
