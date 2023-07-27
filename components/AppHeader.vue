<template>
  <nav :class="{ lp: isLandingPage }">
    <div class="navbar">
      <ul class="nav-links">
        <li class="nav-left">
          <NuxtLink to="/">
            <img alt="logo" src="images/gms-logo.png" class="nav-logo" />
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
        <li class="nav-right"><a href="#login">Log in</a></li>
        <li class="nav-right">
          <a href="#register" class="button">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    // Going to make some small js tweaks
    isLandingPage() {
      return this.$route.path == "/";
    },
  },
};
</script>
<style lang="scss">
@use "sass:selector";

nav {
  width: 100%;
  max-height: 50px;
  margin: 0 auto;

  position: fixed;
  overflow: hidden;
  display: flex;
  align-content: center;
  justify-content: center;

  background-color: #fff;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px groove #c5c5d2;

  /* Navigation Bar Styles */

  .navbar {
    max-width: 1200px;
    max-height: 35px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center; /* Align elements at the center  */
    .login-section li {
      margin: 0 12px;
    }
    .nav-links {
      list-style: none;
      padding: 0;
      display: inline-flex;
      align-items: center; /* Align links at the center */
      a {
        color: #000;
        text-decoration: none;
        font-family: "Bebas Neue";
        font-size: 18px;
        transition: color 0.3s ease;
        :hover {
          color: #10a37f;
        }
      }
    }
    a {
      color: black;
      text-decoration: none;
    }
    .nav-logo {
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      height: 100%;
    }

    img.nav-logo {
      display: block;
      max-height: 50px;
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

    .button {
      @at-root #{selector.unify(&, a)} {
        color: white;
      }
    }
  }

  .login-section {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
  }

  .login-section {
    margin-left: auto;
  }
}

nav.lp {
  background-color: black;
  border-bottom: none;
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
    padding: 8px 15px;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #fff;
      color: black;
    }
  }
}
</style>
