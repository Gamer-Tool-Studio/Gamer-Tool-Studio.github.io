<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>API Keys</h1>
      </v-col>
      <v-col cols="12">
        <p>
          API keys Your secret API keys are listed below. Please note that we do
          not display your secret API keys again after you generate them. Do not
          share your API key with others, or expose it in the browser or other
          client-side code. In order to protect the security of your account,
          OpenAI may also automatically disable any API key that we've found has
          leaked publicly.
        </p>
      </v-col>
      <v-col cols="12">
        <DashboardTableKeys
          :keys="keys"
          @deleteItem="deleteItem"
          @editItem="editItem"
          @addItem="addItem"
        />
      </v-col>
      <v-col v-if="false" cols="12">
        <h3>Default organization</h3>
        <p>
          If you belong to multiple organizations, this setting controls which
          organization is used by default when making requests with the API keys
          above.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
const store = useUserStore();

const { keys } = storeToRefs(store);

function deleteItem(editedIndex) {
  console.log(editedIndex);

  keys.value.splice(editedIndex, 1);
}

function editItem(editedIndex, editedItem) {
  console.log(editedIndex, editedItem);
  Object.assign(keys.value[editedIndex], editedItem);
}

function addItem(editedItem) {
  console.log(editedItem);
  editedItem.created = new Date(Date.now());
  keys.value.push(editedItem);
}
</script>
