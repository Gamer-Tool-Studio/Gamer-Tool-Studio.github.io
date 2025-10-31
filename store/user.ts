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
interface OrganizationInfo {
  id: string
  name: string
  orgId: string
  ownerId: string
  isOwner: boolean
  memberCount: number
}

interface State {
  userList: UserInfo[]
  user: any
  isLoggedIn: boolean
  organization: OrganizationInfo
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
      user: {
        id: '',
        username: '',
        email: '',
        name: '',
        picture: '',
        role: 'user',
        authProvider: 'local',
        emailVerified: false,
        passwordRequired: true,
      },
      isLoggedIn: false,
      organization: {
        id: '',
        name: '',
        orgId: '',
        ownerId: '',
        isOwner: false,
        memberCount: 0,
      },
      members: [],
      keys: [],
    }
  },
  getters: {
    // Computed property to get the login status
    isUserLoggedIn: state => state.isLoggedIn,
    username: state => state.user?.username || state.user?.name,
    userEmail: state => state.user?.email,
    userPicture: state => state.user?.picture,
    isAdmin: state => state.user?.role === 'admin',
    orgName: state => state.organization?.name,
    orgId: state => state.organization?.orgId,
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
    setUser(loginUser: any) {
      // Update user data
      this.user = {
        ...this.user,
        ...loginUser,
      }

      // Update organization data if present
      if (loginUser.organization) {
        this.organization = {
          ...this.organization,
          ...loginUser.organization,
        }
      }

      debug.log('User updated:', this.user)
      debug.log('Organization updated:', this.organization)
    },

    async fetchUserProfile() {
      debug.log('Fetching user profile with organization data...')
      this.loading = true

      try {
        const { data, error } = await useAuthAPI('/user/profile', 'GET')

        if (data.value && !error.value) {
          this.setUser(data.value)
          if (data.value.keys)
            this.setKeys(data.value.keys)

          this.isLoggedIn = true
        }
        else {
          debug.log('Error fetching profile:', error.value)
        }
      }
      catch (e) {
        debug.log('Error:', e)
      }
      finally {
        this.loading = false
      }
    },

    logout() {
      this.user = {
        id: '',
        username: '',
        email: '',
        name: '',
        picture: '',
        role: 'user',
        authProvider: 'local',
        emailVerified: false,
        passwordRequired: true,
      }
      this.organization = {
        id: '',
        name: '',
        orgId: '',
        ownerId: '',
        isOwner: false,
        memberCount: 0,
      }
      this.isLoggedIn = false
      navigateTo('/')
    },
  },
})
