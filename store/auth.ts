import axios from 'axios';
import { defineStore } from 'pinia';

const BASE_URL = 'http://127.0.0.1:3002/api/v1'; // "https://dummyjson.com/auth/login";

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
  }),
  actions: {
    async authenticateUser(credentials: LoginUserPayload) {
      // useFetch from nuxt 3
      // dummy before our API

      const res: any = await axios(BASE_URL + '/auth/local/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: credentials,
        withCredentials: true,
        // onResponse({ request, response, options }) {
        //   // Process the response data
        //   console.log('getSetCookie', response.headers.getSetCookie());
        // },
      });
      console.log('res', res);
      // this.loading = pending;
      console.log('data', res.data);

      if (res.data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = res.data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async registerUser(newUser: RegisterUserPayload) {
      // useFetch from nuxt 3
      // dummy before our API
      const { data, pending }: any = await useFetch(BASE_URL + '/auth/local/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: newUser,
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.password; // set token to cookie
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
