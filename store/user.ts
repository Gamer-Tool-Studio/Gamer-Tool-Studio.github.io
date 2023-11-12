import { defineStore } from 'pinia';
import { USER_PROFILE } from '@/util/urls';

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
  full_name?: string | 'Full name';
  username: string;
  email: string;
  password?: string;
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
      isLoggedIn: false,
      orgName: 'MyOgrName',
      orgId: 'MyOrgId',
      members: [{ name: 'John Doe', email: 'johndoe@mail.com', role: 'admin' }],
      keys: [
        {
          name: 'query-game-test',
          key: 'sk-...1nF6',
          created: new Date(Date.now()),
          used: 'Never',
        },
      ],
    };
  },
  getters: {
    // Computed property to get the login status
    isUserLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.user?.username,
    userEmail: (state) => state.user?.email,
  },
  actions: {
    async getUserProfile(): Promise<any> {
      console.log('Call getUserProfile ');

      const { data, pending }: any = await useAuthAPI(USER_PROFILE, 'GET');
      console.log(data.value, pending.value);

      if (data.value) {
        this.user = data.value;
        console.log(data.value);

        this.setUser(data.value);
        this.setKeys(data.value.keys);
        return this.user;
      }
    },
    setKeys(keys: KeysInfo[]) {
      this.keys = keys;
    },
    setLogin(val: boolean) {
      this.isLoggedIn = val;
    },
    setUser(loginUser: UserInfo) {
      this.user = loginUser;
    },
    logout() {
      this.user = null;
      navigateTo('/');
    },
  },
});
