import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from './user';

const BASE_URL = BACKEND_URL + '/api/v1'; //"https://dummyjson.com/auth/login";
const LOCAL_LOGIN = '/auth/local/login'; //
const LOCAL_REGISTER = '/auth/local/register'; //
const GOOGLE_LOGIN = '/auth/google/login'; //
const GOOGLE_REGISTER = '/auth/google/register'; //
const AUTH_CHECK = '/auth/check'; //

interface LoginUserPayload {
  username: string;
  password: string;
}
interface RegisterUserPayload extends LoginUserPayload {
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userProfile: {},
  }),
  actions: {
    async isAuthenticated(): Promise<Boolean> {
      const user = useUserStore();

      const { data, pending }: any = await useFetch(BASE_URL + AUTH_CHECK, {
        method: 'get',
        credentials: 'include', // fetch
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = data.value.isAuthenticated;
        console.log(data.value.user);

        user.setUser(data.value.user);
        return this.authenticated;
      }
      return false;
    },
    async authenticateGoogleUser() {
      window.location.href = BASE_URL + GOOGLE_LOGIN;
      // const { data, pending }: any = await useFetch(BASE_URL + GOOGLE_LOGIN, {
      //   method: 'get',
      // });
      // this.loading = pending;

      // if (data.value) {
      //   const token = useCookie('token'); // useCookie new hook in nuxt 3
      //   token.value = data?.value?.password; // set token to cookie
      //   this.authenticated = true; // set authenticated  state value to true
      // }
    },

    async registerGoogleUser(newUser: RegisterUserPayload) {
      const { data, pending }: any = await useFetch(BASE_URL + GOOGLE_REGISTER, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: newUser,
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },

    // LOCAL STRATEGY API
    async authenticateUser(credentials: LoginUserPayload) {
      const { data, pending }: any = await useFetch(BASE_URL + LOCAL_LOGIN, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
        credentials: 'include', // fetch
      });
      this.loading = pending;
      console.log('data', data);

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async registerUser(newUser: RegisterUserPayload) {
      const { data, pending }: any = await useFetch(BASE_URL + LOCAL_REGISTER, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: newUser,
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
