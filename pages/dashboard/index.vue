<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const debug = getDebugger('app:pages:dashboard:index')

const store = useUserStore()

const { orgName, orgId } = storeToRefs(store)

function updateProfile(e) {
  debug.log('updateProfile', e)
}

useHead({
  title: 'Home ',
})
</script>

<template>
  <v-container class="settings-page">
    <v-row>
      <v-col cols="12">
        <h1>Organization settings</h1>
      </v-col>
      <v-col>
        <v-form @submit.prevent="updateProfile">
          <h4>Organization name</h4>
          <label>
            Human-friendly label for your organization, shown in user interfaces
          </label>
          <v-text-field v-model="orgName" />
          <h4>Organization ID</h4>
          <label>
            Identifier for this organization sometimes used in API requests
          </label>
          <v-text-field v-model="orgId" disabled />
          <button class="button" type="submit">
            Save
          </button>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.settings-page h4 {
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.settings-page button {
  font-size: 20px;
}
</style>
