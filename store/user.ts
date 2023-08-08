import { defineStore } from "pinia";

interface MemberInfo {
  name: string;
  email: string;
  role: string;
}

interface KeysInfo {
  name: string;
  key: string;
  created: Date;
  used: string;
}
interface State {
  userList: UserInfo[];
  user: UserInfo | null;
  isLoggedIn: boolean;
  orgName: string;
  orgId: string;
  members: Array<MemberInfo>;
  keys: Array<KeysInfo>;
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
      orgName: "MyOgrName",
      orgId: "MyOrgId",
      members: [{ name: "John Doe", email: "johndoe@mail.com", role: "admin" }],
      keys: [
        {
          name: "query-game-test",
          key: "sk-...1nF6",
          created: new Date(Date.now()),
          used: "Never",
        },
      ],
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
