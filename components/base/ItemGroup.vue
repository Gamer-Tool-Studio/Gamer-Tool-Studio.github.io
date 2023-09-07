<template>
  <v-list
    density="compact"
    v-model:opened="openModel"
    v-model:selected="selectedModel"
    open-strategy="single"
    select-strategy="single-independent"
  >
    <template v-for="(item, i) in items" :key="i">
      <v-list-group v-if="getChildren(item)" :value="item.title">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="item.title"
            @click="$router.push(item.to)"
          >
            <template #prepend>
              <v-icon :icon="item.props.prependIcon"> </v-icon>
            </template>

            <template #append> </template>
          </v-list-item>
        </template>
        <template
          v-for="({ title, icon, to }, j) in getChildren(item)"
          :key="j"
        >
          <v-list-item
            :title="title"
            :prepend-icon="icon"
            :value="title"
            :aria-label="title"
            :to="to"
          >
          </v-list-item>
        </template>
      </v-list-group>

      <v-list-item v-else :to="item.to" color="primary" :value="item">
        <v-list-item-title v-text="item.title" :aria-label="item.title">
        </v-list-item-title>
        <template #prepend>
          <v-icon :icon="item.props.prependIcon"></v-icon>
        </template>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
// Utilities

export default {
  name: "ItemGroup",
  computed: {
    openModel: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("update:open", value);
      },
    },
    selectedModel: {
      get() {
        return this.selected;
      },
      set(value) {
        console.log("update:selected", value);
        this.$emit("update:selected", value);
      },
    },
  },
  emits: ["update:open", "update:selected"],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    subGroup: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {},
  methods: {
    getPrependIcon(item) {
      return item?.props?.prependIcon;
    },
    getChildren(item) {
      return item?.props?.subPages?.map((i) => ({
        ...i,
        to: !i.to ? undefined : `${item.path}${i.to}`,
      }));
    },
    computedText(item) {
      if (!item?.title) return "";

      let text = "";

      item.title.split(" ").forEach((val) => {
        text += val.substring(0, 1);
      });

      return text;
    },
  },
};
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>

