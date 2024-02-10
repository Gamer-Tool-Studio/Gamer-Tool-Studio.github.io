<template>
  <v-data-table
    :headers="headers"
    :items="keys"
    item-value="name"
    class="elevation-0"
    density="compact"
    :loading="loading"
  >
    <template #[`item.dateCreated`]="{ item }">
      {{ formatDate(item.raw.dateCreated) }}
    </template>
    <template #[`item.lastUsed`]="{ item }">
      {{ formatDate(item.raw.lastUsed) }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:bottom>
      <v-toolbar flat color="transparent" height="60" class="table-toolbar">
        <modal-generate-api-key
          v-if="generateNewKeys"
          v-model:name="editedItem.name"
          v-model:id="editedItem.id"
          :formTitle="formTitle"
          @close="close(), (generateNewKeys = false)"
          @save="save"
        >
        </modal-generate-api-key>
        <modal-revoke-key v-if="revokeKey" :name="editedItem.name" @close="closeDelete()" @delete="deleteItemConfirm">
        </modal-revoke-key>
        <v-btn v-if="hasTokensAvailable" class="button cancel-button" color="none" @click="generateNewKeys = true">
          + Create new secret key
        </v-btn>
        <v-btn v-else class="button" color="none" to="/pricing"> Go to Princing </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
      <v-col class="text-center" :cols="12">
        <h4 class="my-4">You don't have any API keys yet.</h4>
      </v-col>
    </template>
  </v-data-table>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { VDataTable } from 'vuetify/labs/VDataTable';

const tokenStore = useTokenCountStore();
const userStore = useUserStore();

const { availableInputTokens } = storeToRefs(tokenStore); // make authenticated state reactive with storeToRefs
const { loading } = storeToRefs(userStore);

const emit = defineEmits(['deleteItem', 'addItem', 'editItem']);

const headers = [
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  { title: 'Key', align: 'end', key: 'key' },
  { title: 'Created', align: 'end', key: 'dateCreated' },
  { title: 'Last Used', align: 'end', key: 'lastUsed' },
  { title: 'Actions', key: 'actions', sortable: false },
];
const { keys } = defineProps(['keys']);

const hasTokensAvailable = computed(() => availableInputTokens.value > 0);

const formTitle = computed(() => (editedIndex.value === -1 ? 'Create new secret key' : 'Edit key name'));
const editedIndex = ref(-1),
  editedItem = ref({
    name: '',
    key: 0,
    created: 0,
    used: 'Never',
  }),
  defaultItem = {
    name: '',
    key: 0,
    created: null,
    used: 'Never',
  },
  generateNewKeys = ref(false),
  revokeKey = ref(false);

// methods
const editItem = (item) => {
    console.log(item);
    editedIndex.value = keys.indexOf(item);
    editedItem.value = Object.assign({}, item);
    console.log(editedItem.value);

    generateNewKeys.value = true;
  },
  deleteItem = (item) => {
    editedIndex.value = keys.indexOf(item);
    editedItem.value = Object.assign({}, item);
    revokeKey.value = true;
  },
  deleteItemConfirm = () => {
    emit('deleteItem', editedIndex.value);
    closeDelete();
  },
  close = () => {
    generateNewKeys.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedIndex.value = -1;
    });
  },
  closeDelete = () => {
    revokeKey.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedIndex.value = -1;
    });
  },
  save = () => {
    if (editedIndex.value > -1) {
      emit('editItem', editedIndex.value, editedItem.value);
      //   Object.assign(keys[editedIndex], editedItem);
    } else {
      emit('addItem', editedItem.value);
      //   keys.push(editedItem);
    }
    close();
  };

function formatDate(time) {
  const date = new Date(time);
  if (isNaN(date.getTime())) {
    return time;
  }

  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const hour = date.toLocaleString('default', { hour: '2-digit' });
  const minute = date.toLocaleString('default', { minute: '2-digit' });

  return `${year}/${month}/${day} ${hour}:${minute}`;
}
</script>
<style lang="scss">
.table-toolbar {
  .v-toolbar__content {
    align-items: end;
  }
}
</style>
