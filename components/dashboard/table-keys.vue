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
      <v-toolbar flat>
        <v-toolbar-title>Create a new key</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              + Create
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Key name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

const emit = defineEmits(["delete", "addItem", "editItem"]);

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
  editedIndex === -1 ? "Create new key" : "Edit Item"
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
  dialog = ref(false),
  dialogDelete = ref(false);

// methods
const editItem = (item) => {
    console.log(item);
    editedIndex.value = keys.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
  },
  deleteItem = (item) => {
    editedIndex.value = keys.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialogDelete.value = true;
  },
  deleteItemConfirm = () => {
    emit("delete", editedIndex.value);
    closeDelete();
  },
  close = () => {
    dialog.value = false;
    nextTick(() => {
      editedItem.value = Object.assign({}, defaultItem);
      editedIndex.value = -1;
    });
  },
  closeDelete = () => {
    dialogDelete.value = false;
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

