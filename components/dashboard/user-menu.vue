<template>
  <v-btn class="nav-right-link">
    <img src="~/assets/images/ghn.jpeg">
    <p class="logged-orgName">Org Name</p> 
    <v-menu activator="parent" v-model:model-value="open">
      <v-list class="dropDownMenu">
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="loggedUserName">User Name</v-list-item>
        <v-list-item class="loggedEmailAdd">email@gmail.com</v-list-item>
        <div class="sepration-line"></div>
        <v-list-item class="dropDownItem"> Manage account</v-list-item>
        <v-list-item class="dropDownItem"> Check monthly usage</v-list-item>
        <v-list-item class="dropDownItem"> View API Keys</v-list-item>
        <div class="sepration-line"></div>
        <v-list-item class="dropDownItem"> Pricing</v-list-item>
        <v-list-item class="dropDownItem"> Privacy Policy</v-list-item>
        <v-list-item class="dropDownItem"><NuxtLink @click="logout">Logout</NuxtLink></v-list-item>
        
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup>
import { useAuthStore } from "~/store/auth"; // import the auth store 
const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

const items = ref([]);
const open = ref(false);

const logout = () => {
  logUserOut();
  router.push("/");
};
</script>

<style lang="scss">

.logged-orgName{
  margin-left: 10px;
}

.loggedUserName{
  font-size: 14px;
  font-weight: 750;
  max-height: 5px !important;
  padding-bottom: 0 !important;
}

.loggedEmailAdd {
  font-size: 14px;
  max-height: 5px !important;
  padding-top: 0 !important;
}

.dropDownMenu {
  min-width:200px;
  border: 1px solid #ECECF1;
  border-radius: 3px;
}

.sepration-line {
  border-bottom: 1px solid #ECECF1;
}

.dropDownItem {
  font-size: 14px;
}

.dropDownItem:hover {
  background-color: rgba(98, 0, 238, 0.5);
  cursor: pointer;
}
</style>