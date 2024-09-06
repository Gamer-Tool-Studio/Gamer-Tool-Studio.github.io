<script setup>
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const config = useRuntimeConfig()
const debug = config.public.debugNamespace
// eslint-disable-next-line no-console
console.log('Debug mode:', debug)
if (debug)
  localStorage.setItem('debug', debug)

const cssVars = {}

const route = useRoute()

const name = computed(() => route.name)

const theme = useTheme()
const darkThemePAges = ['index', 'cluaido']

watch(
  name,
  () => {
    theme.global.name.value = darkThemePAges.includes(name.value || '') ? 'myDarkTheme' : 'light'
    cssVars['--background'] = darkThemePAges.includes(name.value || '') ? 'black' : 'white'
  },
  { immediate: true },
)
</script>

<template>
  <v-layout :style="cssVars">
    <v-app-bar color="w-100" elevation="0">
      <AppHeader />
    </v-app-bar>
    <v-main class="content h-50">
      <slot />
    </v-main>
    <AppFooter />
  </v-layout>
</template>

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
