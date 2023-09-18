<template>
  <v-container class="login-container">
    <v-row>
      <v-col cols="12" class="title">
        <h1>Login</h1>
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
        <input v-model="user.password" type="password" class="input" placeholder="Enter Password" name="psw" required />
        <button @click.prevent="login" class="button">Login</button>
        <button @click.prevent="register" class="button">Register</button>
        <button @click.prevent="loginGoogle" class="button">Login Google</button>
      </v-col>
      <v-col cols="12" class="register-link">
        <p>Don't have an account yet? Register <a href="#">here</a>.</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser, registerUser, authenticateGoogleUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: 'kminchelle',
  password: '0lelplR',
});
const router = useRouter();
const loginGoogle = async () => {
  await authenticateGoogleUser(); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

  if (authenticated.value) {
    console.log('authenticated', authenticated.value);
    router.push({ path: '/dashboard' });
  }
};
const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

  if (authenticated.value) {
    console.log('authenticated', authenticated.value);
    router.push({ path: '/dashboard' });
  }
};
const register = async () => {
  await registerUser({ ...user.value, email: 'joe@mail.com' }); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/dashboard/');
  }
};
</script>
<style lang="scss">
.input {
  border: 1px solid #6e6e80;
  margin-right: 5px;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
  width: 250px;
}
.input:focus {
  border: 1px solid #6200ee;
}

.pass-text {
  margin-left: 30px;
}

.container-form {
  margin-top: 20px;
}

.container-form button {
  margin-left: 10px;
  font-size: 18px;
}

.container-form p {
  margin-top: 10px;
}

.login-container a {
  color: #6200ee;
  text-decoration: none;
}

.login-container a:hover {
  text-decoration: underline;
}
</style>
