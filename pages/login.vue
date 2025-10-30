<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const debug = getDebugger('login')
const config = useRuntimeConfig()

const { authenticateUser, registerUser } = useAuthStore() // use authenticateUser action from auth store
const { authenticated, errorMessage } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs

const user = ref({
  password: '',
  confirmPassword: '',
  email: '',
})
const router = useRouter()

const isRegistering = computed(() => router.currentRoute.value.query.register === 'true')

async function handleRedirect() {
  // Check if there's a pending purchase
  const purchasePriceId = router.currentRoute.value.query.purchase as string

  if (purchasePriceId) {
    debug.log('Post-login purchase detected:', purchasePriceId)
    // Create Stripe checkout session
    try {
      const { data, error } = await useAuthAPI<StripeCreateLink>('/stripe/create', 'POST', {
        price_id: purchasePriceId,
        mode: 'payment',
      })

      if (data.value && data.value.url) {
        debug.log('Redirecting to Stripe:', data.value.url)
        window.location.href = data.value.url
        return
      }
      else {
        debug.log('Error creating Stripe session:', error.value)
        // Fall through to dashboard redirect if Stripe fails
      }
    }
    catch (error) {
      debug.log('Error in post-login purchase:', error)
      // Fall through to dashboard redirect if error
    }
  }

  // Normal redirect flow
  if (router.currentRoute.value.query.redirect)
    router.push({ path: router.currentRoute.value.query.redirect as string })
  else
    router.push({ path: '/dashboard' })
}

async function login() {
  // Clear any previous errors
  errorMessage.value = ''

  // For login, user.email contains username or email
  const credentials = {
    username: user.value.email, // backend accepts username field
    password: user.value.password,
  }

  await authenticateUser(credentials) // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated.value)
    handleRedirect()
}

async function register() {
  // Validate passwords match
  if (user.value.password !== user.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // Validate password length
  if (user.value.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters'
    return
  }

  // Generate username from email
  const username = user.value.email.split('@')[0]

  await registerUser({
    username,
    email: user.value.email,
    password: user.value.password,
  })

  // redirect to homepage if user is authenticated
  debug.log('authenticated', authenticated.value)
  if (authenticated.value)
    handleRedirect()
}

function loginWithHello() {
  // Build Hello.coop authorization URL
  const clientId = config.public.helloClientId || 'app_AADlRSShEPtt5l9snKYqDKwd_84S'
  const redirectUri = `${config.public.backendURL}/auth/hello/callback`
  const scope = 'openid email name picture'

  // Build state with both redirect and purchase parameters
  let state = '/dashboard'
  const purchaseParam = router.currentRoute.value.query.purchase as string
  const redirectParam = router.currentRoute.value.query.redirect as string

  if (purchaseParam)
    state = `/dashboard?purchase=${purchaseParam}`
  else if (redirectParam)
    state = redirectParam

  const authUrl = `https://wallet.hello.coop/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=${encodeURIComponent(scope)}&response_mode=form_post&state=${encodeURIComponent(state)}&nonce=${Date.now()}`

  debug.log('Hello.coop auth URL:', authUrl)
  debug.log('Client ID:', clientId)
  debug.log('Redirect URI:', redirectUri)
  debug.log('State with purchase:', state)

  // Redirect to Hello.coop
  window.location.href = authUrl
}

useHead({
  title: 'Login/Register - NPC-GPT',
  meta: [
    { name: 'description', content: 'Access NPC-GPT to start creating AI-driven characters for your games.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Login/Register - NPC-GPT' },
    { property: 'og:description', content: 'Access NPC-GPT to start creating AI-driven characters for your games.' },
    { property: 'og:image', content: 'https://gamertoolstudio.com/images/og-image-login.jpg' },
    { property: 'og:url', content: 'https://gamertoolstudio.com/login' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Login/Register - NPC-GPT' },
    { name: 'twitter:description', content: 'Start using NPC-GPT for advanced game character development.' },
    { name: 'twitter:image', content: 'https://gamertoolstudio.com/images/twitter-image-login.jpg' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Game Tool Studio' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '~/public/favicon.png' },
    { rel: 'canonical', href: 'https://gamertoolstudio.com/login' },
  ],
})
</script>

<template>
  <v-container class="login-container">
    <v-row>
      <v-col v-if="!isRegistering" cols="12" class="title">
        <h1>Welcome back!</h1>
      </v-col>
      <v-col v-if="isRegistering" cols="12" class="title">
        <h1>Create an account!</h1>
      </v-col>
      <v-col cols="12" class="container-form">
        <!-- Login Form -->
        <template v-if="!isRegistering">
          <div class="login-box">
            <label for="uname" class="pass-text"><b>Email or Username</b></label><br>
            <input
              v-model="user.email"
              type="text"
              class="input"
              placeholder="Enter Email or Username"
              name="uname"
              required
            >
          </div>
          <div class="login-box">
            <label for="psw" class="pass-text"><b>Password</b></label><br>
            <input
              v-model="user.password"
              type="password"
              class="input"
              placeholder="Enter Password"
              name="psw"
              required
            >
          </div>
        </template>

        <!-- Registration Form -->
        <template v-if="isRegistering">
          <div class="login-box">
            <label for="email" class="pass-text"><b>Email</b></label><br>
            <input
              v-model="user.email"
              type="email"
              class="input"
              placeholder="Enter Email"
              name="email"
              required
            >
          </div>
          <div class="login-box">
            <label for="psw" class="pass-text"><b>Password</b></label><br>
            <input
              v-model="user.password"
              type="password"
              class="input"
              placeholder="Enter Password"
              name="psw"
              required
            >
          </div>
          <div class="login-box">
            <label for="confirm-psw" class="pass-text"><b>Confirm Password</b></label><br>
            <input
              v-model="user.confirmPassword"
              type="password"
              class="input"
              placeholder="Confirm Password"
              name="confirm-psw"
              required
            >
          </div>
        </template>
      </v-col>
      <v-col cols="12">
        <button class="button loginBtn" @click.prevent="isRegistering ? register() : login()">
          Continue
        </button>
      </v-col>
      <v-col v-if="errorMessage" cols="12">
        <p style="color: red">
          {{ errorMessage }}
        </p>
      </v-col>
      <v-col v-if="!isRegistering" cols="12" class="register-link">
        <p>
          Don't have an account? <NuxtLink to="/login?register=true">
            Sign up
          </NuxtLink>
        </p>
      </v-col>
      <v-col v-if="isRegistering" cols="12" class="register-link">
        <p>
          Already have an account? <NuxtLink to="/login">
            Log in
          </NuxtLink>
        </p>
      </v-col>
      <v-col cols="12">
        <p>----------- Or ------------</p>
      </v-col>
      <v-col cols="12" class="hello-button-container">
        <button class="hello-login-btn" @click="loginWithHello">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" fill="#303030" />
            <path d="M10 14a4 4 0 100-8 4 4 0 000 8z" fill="#fff" />
          </svg>
          <span>Continue with Hellō</span>
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

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

.hello-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.hello-login-btn {
  width: 250px;
  padding: 15px;
  border: 1px solid #c2c8d0;
  border-radius: 3px;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #303030;
  transition: all 0.2s ease;
}

.hello-login-btn:hover {
  background-color: #f5f5f5;
  border-color: #303030;
}

.hello-login-btn svg {
  flex-shrink: 0;
}

.hello-login-btn span {
  line-height: 1;
}
</style>
