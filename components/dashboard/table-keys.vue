<template>
  <v-data-table
    :items-per-page="5"
    :headers="headers"
    :items="keys"
    item-value="name"
    class="elevation-0"
  >
    <template #item.created="{ item }">
      {{ item.raw.created.toLocaleString() }}
    </template>
    <template v-slot:bottom>
      <v-toolbar flat color="transparent" height="84" class="table-toolbar">
        <modal-generate-api-key
          v-if="generateNewKeys"
          v-model:name="editedItem.name"
          :formTitle="formTitle"
          @close="close(), (generateNewKeys = false)"
          @save="save"
        >
        </modal-generate-api-key>
        <modal-revoke-key
          v-if="revokeKey"
          :name="editedItem.name"
          @close="closeDelete()"
          @delete="deleteItemConfirm"
        >
        </modal-revoke-key>
        <button class="cancel-button" @click="generateNewKeys = true">
          + Create new secret key
        </button>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

const emit = defineEmits(["deleteItem", "addItem", "editItem"]);

const headers = [
  {
    title: "Name",
    align: "start",
    key: "name",
  },
  { title: "Key", align: "end", key: "key" },
  { title: "Created", align: "end", key: "created" },
  { title: "Last Used", align: "end", key: "used" },
  { title: "Actions", key: "actions", sortable: false },
];
const { keys } = defineProps(["keys"]);

const formTitle = computed(() =>
  editedIndex.value === -1 ? "Create new secret key" : "Edit key name"
);
const editedIndex = ref(-1),
  editedItem = ref({
    name: "",
    key: 0,
    created: 0,
    used: "Never",
  }),
  defaultItem = {
    name: "",
    key: 0,
    created: null,
    used: "Never",
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
    emit("deleteItem", editedIndex.value);
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
      emit("editItem", editedIndex.value, editedItem.value);
      //   Object.assign(keys[editedIndex], editedItem);
    } else {
      emit("addItem", editedItem.value);
      //   keys.push(editedItem);
    }
    close();
  };
</script>
<style lang="scss">
.table-toolbar {
  .v-toolbar__content {
    align-items: end;
  }
}
</style>

