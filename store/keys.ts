import { defineStore } from 'pinia'

const debug = getDebugger('store:keys')

interface KeysInfo {
  name: string
  key: string
  created: Date
  used: string
}
interface State {
  keys: Array<KeysInfo>
}

export const useKeysStore = defineStore('keys', {
  state: (): State => {
    return {
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
  },
  actions: {
    async createApiToken(name: string) {
      const { data, error } = await useAuthAPI<{ token: string }>('/auth/gen-key', 'GET', undefined, {
        name,
      })
      debug.log(data.value.token)

      if (error.value)
        throw error.value

      return data.value
    },
    async editApiToken(name: string, id: string) {
      debug.log(name, id)

      const { data, error } = await useAuthAPI('/auth/edit-token', 'PATCH', undefined, {
        name,
        id,
      })
      debug.log(data.value)

      if (error.value)
        throw error.value

      return data.value
    },
  },
})
