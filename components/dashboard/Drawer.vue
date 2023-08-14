<template>
  <v-card id="core-navigation-drawer" class="pa-0" elevation="0">
    <v-list expand nav class="pa-0" density="compact">
      <base-item-group :items="computedItems"></base-item-group>
    </v-list>
  </v-card>
</template>

<script setup>
// Utilities
// import { mapState } from "vuex";

onMounted(() => {
  console.log("mounted drawer");
});

const items = ref([
  {
    title: "dashboard",
    value: 1,
    to: "/dashboard",
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
    title: "usage",
    to: "/dashboard/usage",
    props: {
      prependIcon: "mdi-chart-bar",
    },
  },
  {
    title: "members",
    to: "/dashboard/members",
    props: {
      prependIcon: "mdi-account-group",
    },
  },
  {
    title: "billing",
    to: "/dashboard/billing",
    props: {
      prependIcon: "mdi-wallet-bifold",
      subPages: [
        {
          title: "Overview",
          to: "/overview",
        },
        {
          title: "Payment methods",
          to: "/payment",
        },
        {
          title: "Billing history",
          to: "/billing",
        },
      ],
    },
  },
  {
    title: "API keys",
    to: "/dashboard/api-keys",
    props: {
      prependIcon: "mdi-key-chain",
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
<style lang="scss">
#core-navigation-drawer {
  height: 100%;
  max-width: 200px;
  flex: 0 0 15%;
  border-right: solid 1px lightgrey;
  .v-list-group__header.v-list-item--active:before {
    opacity: 0.24;
  }

  .v-list-item {
    padding-inline-start: 24px;
    padding-inline-end: 24px;

    &__prepend {
      .v-icon {
        margin-inline-end: 8px;
      }
    }

    &__icon--text,
    &__icon:first-child {
      margin-top: 10px;
    }

    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }

    .v-list-item-title {
      text-transform: capitalize;
    }
  }
}

.v-list-group--sub-group {
  .v-list-group__header {
    .v-list-item__icon--text {
      margin-top: 19px;
      order: 0;

      .v-list-group__header__prepend-icon {
        order: 2;
      }
    }
  }
}
</style>
