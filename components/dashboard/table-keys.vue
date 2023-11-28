<template>
  <v-data-table :headers="headers" :items="keys" item-value="name" class="elevation-0" density="compact">
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
      <v-toolbar flat color="transparent" height="40" class="table-toolbar">
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
        <button class="cancel-button" @click="generateNewKeys = true">+ Create new secret key</button>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

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
console.log(keys);

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
