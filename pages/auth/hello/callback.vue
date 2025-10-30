<script setup lang="ts">
const route = useRoute()

// Get token from query params (sent by backend after successful auth)
const token = route.query.token as string
const error = route.query.error as string
const stateParam = route.query.state as string

// Process immediately without waiting for onMounted
if (error) {
  navigateTo(`/login?error=${encodeURIComponent(error)}`)
}
else if (!token) {
  navigateTo('/login?error=Authentication failed')
}
else {
  // Store token in cookie
  const tokenCookie = useCookie('token')
  tokenCookie.value = token

  // Update auth state
  const authStore = useAuthStore()
  authStore.authenticated = true

  // Determine redirect path
  const redirectPath = stateParam || '/dashboard'

  // Redirect after a brief moment to ensure cookie is set
  setTimeout(() => {
    window.location.href = redirectPath
  }, 500)
}
</script>

<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
        <h2 class="mt-4">
          Authenticating with Hello.coop...
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>
