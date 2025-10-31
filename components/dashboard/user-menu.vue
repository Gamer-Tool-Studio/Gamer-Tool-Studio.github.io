<script setup>
// Component: UserMenu
import { storeToRefs } from 'pinia'

import { useUserStore } from '~/store/user'

// make authenticated state reactive with storeToRefs

const { isLandingPage } = defineProps(['isLandingPage'])// import the auth store
const { authenticated } = storeToRefs(useAuthStore())
const router = useRouter()
const { logUserOut } = useAuthStore() // use authenticateUser action from  auth store

const { username, userEmail, userPicture, orgName } = storeToRefs(useUserStore())

const items = ref([])
const open = ref(false)

function logout() {
  logUserOut()
  router.push('/')
}
</script>

<template>
  <v-btn flat :ripple="false" class="">
    <div v-if="authenticated" class="d-none d-sm-flex align-center">
      <img v-if="userPicture" class="profile-img" :src="userPicture">
      <img v-else class="profile-img" src="~/assets/images/ghn.jpeg">
      <p class="logged-orgName">
        {{ orgName || 'Organization' }}
      </p>
    </div>
    <li class="d-flex d-sm-none">
      &#9776;
    </li>
    <v-menu v-model:model-value="open" activator="parent" :content-class="{ lp: isLandingPage }">
      <v-list class="dropDownMenu pb-0">
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <div v-if="authenticated" class="menu-group d-flex d-sm-none pa-2 pt-0 flex-row">
          <img v-if="userPicture" class="profile-img" :src="userPicture" width="30">
          <img v-else class="profile-img" src="~/assets/images/ghn.jpeg" width="30">
          <p class="logged-orgName">
            {{ orgName || 'Organization' }}
          </p>
        </div>
        <div v-if="!authenticated" class="menu-group">
          <NuxtLink to="/login">
            Log in
          </NuxtLink>
          <NuxtLink to="/login#register">
            Sign up
          </NuxtLink>
        </div>

        <div v-if="authenticated" class="menu-group">
          <v-list-item class="loggedUserName">
            {{ username }}
          </v-list-item>
          <v-list-item class="loggedEmailAdd">
            {{ userEmail }}
          </v-list-item>
        </div>
        <div v-if="authenticated" class="menu-group">
          <NuxtLink to="/dashboard/profile">
            Profile
          </NuxtLink>
          <NuxtLink to="/dashboard">
            Organization Settings
          </NuxtLink>
          <NuxtLink to="/dashboard/usage">
            Usage
          </NuxtLink>
          <NuxtLink to="/dashboard/api-keys">
            API Keys
          </NuxtLink>
        </div>
        <div class="menu-group d-flex d-sm-none">
          <NuxtLink to="https://gamertoolstudio.gitbook.io/npc-gpt/introduction/introduction">
            Documentation
          </NuxtLink>
          <NuxtLink to="/download-plugin">
            Download Plugin
          </NuxtLink>
        </div>
        <div class="menu-group">
          <NuxtLink to="/pricing">
            Pricing
          </NuxtLink>
          <NuxtLink to="/dashboard/">
            Privacy Policy
          </NuxtLink>
        </div>
        <div v-if="authenticated" class="menu-group">
          <NuxtLink @click="logout">
            Logout
          </NuxtLink>
        </div>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<style lang="scss">
.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.logged-orgName {
  margin-left: 10px;
}

.loggedUserName {
  font-size: 14px;
  font-weight: 750;
  min-height: 3px !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.loggedEmailAdd {
  font-size: 14px;
  max-height: 5px !important;
  padding-top: 0 !important;
}

.dropDownMenu {
  min-width: 200px;
  border: 1px solid #ececf1;
  border-radius: 3px;
}

.dropLink {
  text-decoration: none;
  color: inherit;
}

.lp .menu-group {
  a {
    color: white;
  }
}
.menu-group {
  border-bottom: 1px solid #ececf1;
  display: flex;
  flex-direction: column;
  a {
    cursor: pointer;
    color: black;

    text-decoration: none;
    font-size: 14px;
    font-weight: 100;
    transition: color 0.3s ease;
    text-decoration: none;
    overflow: hidden;
    padding: 10px 16px;
    &:hover {
      background-color: rgba(98, 0, 238, 0.4);
    }
  }
}

.dropDownItem {
  font-size: 14px;
}

.dropDownItem:hover {
  background-color: rgba(98, 0, 238, 0.5);
  cursor: pointer;
}
</style>
