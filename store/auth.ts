import { defineStore } from 'pinia'
import { useUserStore } from './user'

const debug = getDebugger('store:auth')

const BASE_URL = `${BACKEND_URL}/api/v1` // "https://dummyjson.com/auth/login";
const LOCAL_LOGIN = '/auth/local/login' //
const LOCAL_REGISTER = '/auth/local/register' //
const AUTH_CHECK = '/auth/check' //

interface LoginUserPayload {
  username: string
  password: string
}
interface RegisterUserPayload extends LoginUserPayload {
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userProfile: {},
    errorMessage: '',
  }),
  actions: {
    clearErrorMessage() {
      this.errorMessage = ''
    },

    async isAuthenticated(): Promise<boolean> {
      const user = useUserStore()

      const { data, pending }: any = await useFetch(BASE_URL + AUTH_CHECK, {
        method: 'get',
        credentials: 'include', // fetch
      })
      this.loading = pending

      if (data.value) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.authenticated = data.value.isAuthenticated
        debug.log(data.value.user)

        user.setUser(data.value.user)
        return this.authenticated
      }
      return false
    },

    // LOCAL STRATEGY API
    async authenticateUser(credentials: LoginUserPayload): Promise<any> {
      this.clearErrorMessage()

      const { data, pending, error }: any = await useFetch(BASE_URL + LOCAL_LOGIN, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
        credentials: 'include', // fetch
      })
      this.loading = pending
      debug.log('data', data)

      if (error.value) {
        debug.log('error', error, error.value?.statusMessage, error.value?.statusCode, error.value?.data?.error)
        this.errorMessage = error.value?.data?.error
      }

      if (data.value) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.authenticated = true // set authenticated  state value to true
      }
    },
    async registerUser(newUser: RegisterUserPayload): Promise<any> {
      this.clearErrorMessage()

      const { data, pending, error }: any = await useFetch(BASE_URL + LOCAL_REGISTER, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: newUser,
      })

      if (error.value) {
        debug.log('error', error, error.value?.statusMessage, error.value?.statusCode, error.value?.data?.error)
        this.errorMessage = error.value?.data?.error
      }
      this.loading = pending

      if (data.value) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.authenticated = true // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token') // useCookie new hook in nuxt 3
      this.authenticated = false // set authenticated  state value to false
      token.value = null // clear the token cookie
    },
  },
})
