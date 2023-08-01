import { defineStore } from "pinia";
interface State {
  userList: UserInfo[];
  user: UserInfo | null;
  isLoggedIn: boolean;
}
interface UserInfo {
  full_name?: string | "Full name";
  email: string;
  password?: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      userList: [],
      user: null,
      isLoggedIn: false,
    };
  },
  getters: {
    // Computed property to get the login status
    isUserLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    setLogin(val: boolean) {
      this.isLoggedIn = val;
    },
    setUser(loginUser: UserInfo) {
      this.user = loginUser;
    },
    logout() {
      this.user = null;
      navigateTo("/");
    },
  },
});
