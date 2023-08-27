<template>
  <nav :class="{ lp: isLandingPage }">
    <div class="navbar">
      <ul class="nav-links">
        <li class="nav-left">
          <NuxtLink to="/">
            <img
              alt="logo"
              src="~/assets/images/gms-logo.png"
              class="nav-logo"
            />
          </NuxtLink>
        </li>
        <li class="nav-left"><NuxtLink to="/products">Products</NuxtLink></li>
        <li class="nav-left">
          <NuxtLink to="/documentation">Documentation</NuxtLink>
        </li>
        <li class="nav-left"><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        <li class="nav-left"><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
      <ul class="login-section">
        <li v-if="!authenticated" class="nav-right-link">
          <NuxtLink to="/login"> Log in</NuxtLink>
        </li>
        <li v-if="authenticated" class="nav-right-link">
          <NuxtLink @click="logout">Logout</NuxtLink>
        </li>
        <li v-if="!authenticated" class="nav-right">
          <a href="#register" class="button">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const userStore = useUserStore();

const route = useRoute();

const router = useRouter();

const isLandingPage = computed(() => route.path == "/");

// authentication methods

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/");
};
</script>
<style lang="scss">
@use "sass:selector";

nav {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: fixed;
  overflow: hidden;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: transparent;
  color: #333;
  padding: 10px 0;

  /* Navigation Bar Styles */

  .navbar {
    max-height: 55px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    .lp {
      max-width: 1200px;
    }
    .login-section li {
      margin: 0 12px;
    }
    .nav-links {
      list-style: none;
      display: inline-flex;
      align-items: center;
      a {
        color: #000;
        text-decoration: none;
        font-size: 22px;
        font-weight: 100;
        transition: color 0.3s ease;
        :hover {
          color: #6200ee;
        }
      }
    }
    a {
      color: black;
      text-decoration: none;
      font-family: "Bebas Neue";
    }
    .nav-logo {
      margin-right: 10px;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      height: 100%;
    }

    img.nav-logo {
      display: block;
      max-height: 50px;
      // margin-bottom: 15px;
    }
  }

  .nav-links .nav-link:hover {
    text-decoration: underline;
  }

  .login-section .nav-link:hover {
    text-decoration: underline;
  }

  /* New Code to Align Login and Signup to Right */
  .login-section {
    margin-left: auto;
    font-size: 22px;

    .button {
      @at-root #{selector.unify(&, a)} {
        color: white;
        // padding-bottom: 1px;
      }
    }
  }

  .login-section {
    margin: 0;
    margin-left: auto;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    font-family: "Bebas Neue";
  }

  .nav-right a {
    font-size: 22px;
  }

  .nav-right-link {
    font-family: "Bebas Neue";
  }
  .nav-right-link:hover {
    // text-decoration: underline;
    cursor: pointer;
  }
  .nav-right:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

nav.lp {
  background-color: black;
  * {
    color: white;
  }
  .nav-links a,
  a {
    color: #fff;
    text-decoration: none;
  }
  .button {
    display: inline-block;
    background-color: black;
    color: #fff;
    padding: 5px 15px 1px 15px;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 5px;
    font-size: 22px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #fff;
      color: black;
    }
  }
}
</style>
