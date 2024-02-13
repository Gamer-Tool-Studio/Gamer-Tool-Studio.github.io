<template>
  <v-container class="login-container">
    <v-row>
      <v-col cols="12" class="title">
        <h1>Welcome back</h1>
      </v-col>
      <v-col cols="12" class="container-form">
        <div class="login-box">
          <label for="uname" class="pass-text"><b>Username</b></label
          ><br />
          <input
            v-model="user.username"
            type="text"
            class="input"
            :placeholder="isRegistering ? 'Enter Username' : 'Enter Username or Email'"
            name="uname"
            required
          />
        </div>
        <div class="login-box">
          <label for="psw" class="pass-text"><b>Password</b></label
          ><br />
          <input
            v-model="user.password"
            type="password"
            class="input"
            placeholder="Enter Password"
            name="psw"
            required
          />
        </div>
        <div v-if="isRegistering" class="login-box">
          <label for="psw" class="pass-text"><b>Email</b></label
          ><br />
          <input v-model="user.email" type="email" class="input" placeholder="Enter Email" name="email" required />
        </div>
      </v-col>
      <v-col cols="12">
        <button @click.prevent="isRegistering ? register() : login()" class="button loginBtn">Continue</button>
      </v-col>
      <v-col v-if="errorMessage" cols="12">
        <p style="color: red">{{ errorMessage }}</p>
      </v-col>
      <v-col v-if="!isRegistering" cols="12" class="register-link">
        <p>Don't have an account? <NuxtLink to="/login?register=true">Sign up</NuxtLink></p>
      </v-col>
      <v-col v-if="isRegistering" cols="12" class="register-link">
        <p>Already have an account? <NuxtLink to="/login">Log in</NuxtLink></p>
      </v-col>
      <v-col cols="12">
        <p>----------- Or ------------</p>
      </v-col>
      <v-col cols="12">
        <div class="auth-card" @click.prevent="loginGoogle">
          <img src="~/assets/images/google-logo.png" style="width: 30px" />
          <p>Continue with Google</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser, registerUser, authenticateGoogleUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, errorMessage } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: '',
  password: '',
  email: '',
});
const router = useRouter();

// i want to check if there is a is #register in url if it is then i want to set isRegistering to true
const isRegistering = computed(() => router.currentRoute.value.query.register === 'true');

const loginGoogle = async () => {
  await authenticateGoogleUser(); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

  if (authenticated.value) {
    console.log('authenticated', authenticated.value);
    router.push({ path: '/dashboard' });
  }
};

const handleRedirect = () => {
  if (router.currentRoute.value.query.redirect) {
    router.push({ path: router.currentRoute.value.query.redirect as string });
  } else {
    router.push({ path: '/dashboard' });
  }
};

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated.value) {
    handleRedirect();
  }
};
const register = async () => {
  await registerUser({ ...user.value }); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  console.log('authenticated', authenticated.value);
  if (authenticated.value) {
    handleRedirect();
  }
};
</script>
<style lang="scss">
.login-container {
  text-align: center;
  .button {
    font-size: 18px;
  }
}
.title {
  text-align: center;
}
.login-container {
  text-align: center;
}
.input {
  border: 1px solid #6200ee;
  border-radius: 3px;
  padding: 10px;
  width: 250px;
}

.container-form {
  padding-bottom: 0;
  padding-top: 0;
}

.container-form button {
  font-size: 18px;
}

.pass-text {
  font-size: 1px;
  display: none;
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

.register-link {
  padding-top: 0;
  text-align: center;
}

.loginBtn {
  padding: 15px;
  width: 250px !important;
}

.auth-card {
  width: 250px;
  border: 1px solid #c2c8d0;
  border-radius: 3px;
  display: inline-flex;
  padding: 15px;
  margin-bottom: 50px;
}

.auth-card:hover {
  cursor: pointer;
  background-color: #d9d9e3;
}

.auh.card img {
  max-width: 30px;
}

.auth-card p {
  margin-left: 20px;
  font-weight: 400;
}
</style>
