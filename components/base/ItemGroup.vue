<template>
  <v-list density="compact">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      :to="item.to"
      color="primary"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.props.prependIcon"></v-icon>
      </template>

      <v-list-item-title v-text="item.title"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
// Utilities

export default {
  name: "ItemGroup",

  inheritAttrs: false,

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
  },

  computed: {
    children() {
      return this.items?.children?.map((item) => ({
        ...item,
        to: !item.to ? undefined : `${this.items.group}/${item.to}`,
      }));
    },

    group() {
      return this.genGroup(this.items.children);
    },
  },

  methods: {
    computedText(item) {
      if (!item?.title) return "";

      let text = "";

      item.title.split(" ").forEach((val) => {
        text += val.substring(0, 1);
      });

      return text;
    },
    genGroup(children) {
      return children
        .filter((item) => item.to)
        .map((item) => {
          const parent = item.group || this.items.group;
          let group = `${parent}/${item.to}`;

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`;
          }

          return group;
        })
        .join("|");
    },
  },
};
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>
