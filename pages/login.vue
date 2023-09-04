<template>
    <v-container class="login-container">
      <v-row>
        <v-col cols="12" class="title">
          <h2>Login</h2>
        </v-col> 
        <v-col cols="12" class="container-form">
          <label for="uname"><b>Username</b></label>
          <input 
            v-model="user.username"
            type="text"
            class="input"
            placeholder="Enter Username or Email"
            name="uname"
            required
          />

          <label for="psw"><b class="pass-text">Password</b></label>
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
      <v-col cols="12" class="register-link">
        <p>Don't have an account yet? Register <a href="#">here</a>.</p>
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
    router.push("/dashboard/");
  }
};
</script>
<style lang="scss">


.input{
  border: 1px solid #6e6e80;
  margin-right:5px;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px;
}
.input:active {
  border: 1px solid #6200ee;
}

.pass-text {
  margin-left: 30px;
}

.container-form{
  margin-top: 20px;
}

.container-form button {
  margin-left:10px;
  font-size: 18px;
}
.register-link {
  margin-top: 50px;
}

.register-link a {
  color: #6200ee;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

</style>
