<script setup>
const { member } = defineProps(['member'])

const select = member.role
</script>

<template>
  <v-container class="member-card">
    <v-row class="align-center">
      <v-col cols="1">
        <div class="avatar">
          {{ member?.name[0] }}
        </div>
      </v-col>
      <v-col cols="4">
        {{ member.name }}
        {{ member.mail }}
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="select"
          density="compact"
          readonly
          hide-details
          :items="[member.role]"
        />
      </v-col>
      <v-col cols="4" class="remove-user-button">
        <button
          class="cancel-paid"
          type="submit"
          @click="removeUser = true"
        >
          Remove
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.member-card {
  .avatar {
    border-radius: 50%;
    align-items: center;
    background: #000;
    color: #fff;
    display: flex;
    font-size: 14px;
    height: 28px;
    justify-content: center;
    line-height: 20px;
    width: 28px;
  }
}

.remove-user-button button{
  margin-left: 2%;
}
</style>
