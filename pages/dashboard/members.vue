<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const store = useUserStore()

const { members } = storeToRefs(store)

const inviteUser = ref(false)

useHead({
  title: 'Members ',
})
</script>

<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="8">
        <h1>Members</h1>
      </v-col>
      <v-col cols="4">
        <modal-invite-new-user
          v-if="inviteUser"
          @close="inviteUser = false"
        />
        <button class="button" type="submit" @click="inviteUser = true">
          Invite members
        </button>
      </v-col>
      <v-col v-for="member in members" :key="member.email">
        <dashboard-member-card :member="member" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">

</style>
