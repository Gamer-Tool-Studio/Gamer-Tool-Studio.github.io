import { defineStore } from 'pinia'
import { useTokenCountStore } from './tokenCount'

const debug = getDebugger('store:user')
interface MemberInfo {
  name: string
  email: string
  role: string
}

interface KeysInfo {
  name: string
  key: string
  created: Date
  used: string
}
interface State {
  userList: UserInfo[]
  user: UserInfo | null
  isLoggedIn: boolean
  orgName: string
  orgId: string
  members: Array<MemberInfo>
  keys: Array<KeysInfo>
  loading: boolean
}

interface UserInfo {
  full_name?: string | 'Full name'
  username: string
  email: string
  password?: string
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      loading: false,
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
    }
  },
  getters: {
    // Computed property to get the login status
    isUserLoggedIn: state => state.isLoggedIn,
    username: state => state.user?.username,
    userEmail: state => state.user?.email,
  },
  actions: {
    async getUserProfile(): Promise<any> {
      debug.log('Call getUserProfile ')
      this.loading = true

      const { data, pending } = await useAuthAPI<UserInfo & { keys: KeysInfo[] }>(USER_PROFILE, 'GET')
      debug.log(data.value, pending.value)

      if (data.value) {
        this.user = data.value

        this.setUser(data.value)
        this.setKeys(data.value.keys)

        const tokenStore = useTokenCountStore()
        await tokenStore.getBalance()

        this.loading = false
        return this.user
      }
    },
    setKeys(keys: KeysInfo[]) {
      this.keys = keys
    },
    setLogin(val: boolean) {
      this.isLoggedIn = val
    },
    setUser(loginUser: UserInfo) {
      this.user = loginUser
    },
    logout() {
      this.user = null
      navigateTo('/')
    },
  },
})
