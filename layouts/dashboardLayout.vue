<template>
  <v-layout :style="cssVars">
    <v-app-bar color="w-100" elevation="0">
      <AppHeader />
    </v-app-bar>
    <v-main class="d-flex">
      <v-container fluid class="pa-0 d-flex flex-grow-1 dashboard-border">
        <v-row no-gutters>
          <v-col cols="1" lg="2">
            <dashboard-drawer />
          </v-col>

          <v-col cols="10" class="">
            <v-card class="dashboard-content" elevation="0" outlined>
              <slot />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <AppFooter /> -->
  </v-layout>
</template>
<script setup>
import { useTheme } from 'vuetify';

const { getUserProfile } = useUserStore();
const cssVars = {};

const theme = useTheme();

getUserProfile();

theme.global.name.value = 'light';
cssVars['--background'] = 'white';
</script>
<style lang="scss">
:root {
  --content-v-padding: 12px;
  --content-h-padding: 24px;
}
.content-dashboard {
  display: flex;
}
.dashboard-content {
  padding: var(--content-v-padding) var(--content-h-padding);
  max-width: 872px;
  @media (min-width: 1372px) {
    margin-left: calc(50vw - 686px);
  }

  // debug outline
  // * {
  //   outline: solid 1px red;
  // }
}
.v-layout {
  flex-direction: column;
  background-color: var(--background);
  transition: background-color 1.5s ease;
  min-height: 100vh;

  .dashboard-border {
    border-top: 1px groove #c5c5d2;
  }
}
</style>
