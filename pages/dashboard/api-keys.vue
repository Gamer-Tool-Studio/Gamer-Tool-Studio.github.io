<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const debug = getDebugger('ApiKeys')

const store = useUserStore()

const { keys } = storeToRefs(store)

// Force re-render trigger
const refreshTrigger = ref(0)

// Load keys on mount
onMounted(async () => {
  debug.log('Loading user profile and keys...')
  await store.fetchUserProfile()
  debug.log('Keys loaded:', keys.value)
})

function deleteItem(editedIndex: number) {
  debug.log('Deleting item:', editedIndex)
  keys.value.splice(editedIndex, 1)
}

function editItem(editedIndex: number, editedItem: any) {
  debug.log('Editing item:', editedIndex, editedItem)
  Object.assign(keys.value[editedIndex], editedItem)
}

function addItem(editedItem: any) {
  debug.log('Adding item:', editedItem)
  editedItem.created = new Date(Date.now())
  keys.value.push(editedItem)
}

async function handleKeyGenerated(_keyData: any) {
  // Force refresh to ensure UI updates
  await store.fetchUserProfile()
  // Force component re-render
  refreshTrigger.value++
}

async function handleKeyEdited(keyData: any) {
  debug.log('Key edited:', keyData)
  // Refresh to get updated key
  await store.fetchUserProfile()
  debug.log('Keys after edit:', keys.value)
}

useHead({
  title: 'API Keys ',
})
</script>

<template>
  <v-container class="keys-page">
    <v-row>
      <v-col cols="12">
        <h1>API Keys</h1>
      </v-col>
      <v-col cols="12">
        <p>
          Your secret API keys are listed below. Please note that we do not display your secret API keys again after you
          generate them.<br><br>Do not share your API key with others, or expose it in the browser or other
          client-side code. In order to protect the security of your account, Gamer Tools Studio may also automatically
          disable any API key that we've found has leaked publicly.
        </p>
      </v-col>
      <v-col cols="12">
        <DashboardTableKeys
          :key="refreshTrigger"
          :keys="keys"
          @delete-item="deleteItem"
          @edit-item="editItem"
          @add-item="addItem"
          @key-generated="handleKeyGenerated"
          @key-edited="handleKeyEdited"
        />
      </v-col>
      <v-col v-if="false" cols="12">
        <h3>Default organization</h3>
        <p>
          If you belong to multiple organizations, this setting controls which organization is used by default when
          making requests with the API keys above.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.keys-page p {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}
</style>

<style lang="scss">
.new-key-section {
  display: block;
}

.cancel-button:hover {
  cursor: pointer;
  background-color: #d9d9e3;
}

@media (max-width: 768px) {
  .cancel-button {
    margin-top: 30px;
  }
}
</style>
