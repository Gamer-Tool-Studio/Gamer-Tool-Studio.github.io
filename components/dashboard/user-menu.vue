<template>
  <v-btn class="nav-right-link" color="primary">
    <v-icon :icon="open ? 'mdi-menu-open' : 'mdi-menu'"></v-icon>

    <v-menu activator="parent" v-model:model-value="open">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <DashboardDrawer></DashboardDrawer>
      <NuxtLink @click="logout">Logout</NuxtLink>
    </v-menu>
  </v-btn>
</template>

<script setup>
import { useAuthStore } from "~/store/auth"; // import the auth store we just created
const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

const items = ref([]);
const open = ref(false);

const logout = () => {
  logUserOut();
  router.push("/");
};
</script>

