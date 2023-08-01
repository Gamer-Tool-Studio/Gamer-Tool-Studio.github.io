<template>
  <v-container id="core-navigation-drawer" class="pa-0">
    <v-row no-gutters> </v-row>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item
          :prepend-avatar="'https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico'"
          class="align-self-center"
          color="white"
          contain
        >
          <v-list-item-title class="display-1" v-text="profile.title" />
        </v-list-item>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <base-item-group :items="computedItems"></base-item-group>
    </v-list>

    <template v-slot:append>
      <base-item
        :item="{
          title: 'Upgrade',
          icon: 'mdi-package-up',
          to: '/upgrade',
        }"
      />
    </template>
  </v-container>
</template>

<script setup>
// Utilities
// import { mapState } from "vuex";

const props = defineProps({
  expandOnHover: { type: Boolean, required: true },
});

onMounted(() => {
  console.log("mounted drawer");
});

const items = ref([
  {
    title: "dashboard",
    value: 1,
    to: "/",
    props: {
      prependIcon: "mdi-view-dashboard",
    },
  },
  {
    title: "settings",
    to: "/dashboard/settings",
    props: {
      prependIcon: "mdi-cog",
    },
  },
  {
    title: "rtables",
    to: "/tables/regular-tables",
    props: {
      prependIcon: "mdi-clipboard-outline",
    },
  },
  {
    title: "typography",
    to: "/components/typography",
    props: {
      prependIcon: "mdi-format-font",
    },
  },
  {
    title: "icons",
    to: "/components/icons",
    props: {
      prependIcon: "mdi-chart-bubble",
    },
  },
  {
    title: "google",
    to: "/maps/google-maps",
    props: {
      prependIcon: "mdi-map-marker",
    },
  },
  {
    title: "notifications",
    to: "/components/notifications",
    props: {
      prependIcon: "mdi-bell",
    },
  },
]);

const computedItems = computed(() => {
  return items.value.map(mapItem);
});

const profile = computed(() => {
  return {
    avatar: true,
    title: "Avatar",
  };
});
const mapItem = (item) => {
  return {
    ...item,
    children: item.children ? item.children.map(mapItem) : undefined,
    title: item.title,
  };
};
</script>
<style lang="sass">

#core-navigation-drawer
  max-width: 200px
  flex: 0 0 15%
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-group__header

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2
</style>
