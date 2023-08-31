<template>
    <v-container class="login-container">
      <v-row>
        <v-col cols="12" class="title">
          <h2>Login</h2>
          <v-col cols="12" class="container form">
            <label for="uname"><b>Username</b></label>
            <input
              v-model="user.username"
              type="text"
              class="input"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <label for="psw"><b>Password</b></label>
            <input
              v-model="user.password"
              type="password"
              class="input"
              placeholder="Enter Password"
              name="psw"
              required
            />

            <button @click.prevent="login" class="button">Login</button>
        </v-col> 
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: "kminchelle",
  password: "0lelplR",
});
const router = useRouter();
const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/dashboard");
  }
};
</script>
<style lang="scss">


</style>
