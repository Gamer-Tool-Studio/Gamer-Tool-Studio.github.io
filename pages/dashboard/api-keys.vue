<template>
  <v-container class="keys-page">
    <v-row>
      <v-col cols="12">
        <h1>API Keys</h1>
      </v-col>
      <v-col cols="12">
        <p>
          Your secret API keys are listed below. Please note that we do not
          display your secret API keys again after you generate them.<br /><br />Do
          not share your API key with others, or expose it in the browser or
          other client-side code. In order to protect the security of your
          account, Gamer Tools Studio may also automatically disable any API key
          that we've found has leaked publicly.
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
      <v-col cols="3" class="new-key-section">
        <modal-generate-api-key
          v-if="generateNewKeys"
          @close="generateNewKeys = false"
        >
        </modal-generate-api-key>
        <button
          class="cancel-button"
          type="submit"
          @click="generateNewKeys = true"
        >
          + Create new secret key
        </button>
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

const generateNewKeys = ref(false);

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

useHead({
  title: "API Keys ",
});
</script>

<style lang="scss">
.keys-page p {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.new-key-section {
  display: block;
}

.cancel-button:hover {
        cursor:Pointer;
        background-color:#d9d9e3;
    }
</style>
