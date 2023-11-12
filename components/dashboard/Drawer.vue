<template>
  <v-card id="core-navigation-drawer" class="pa-0" elevation="0">
    <!-- <v-list expand nav class="pa-0" density="compact"> -->
    <base-item-group :items="computedItems" v-model:open="open" v-model:selected="selected"></base-item-group>
    <!-- </v-list> -->
  </v-card>
</template>

<script setup>
const route = useRoute();
const selected = ref([]);
const open = ref([]);

watch(
  () => route.name,
  (r) => {
    if (r.includes('billing') && !open.value.includes('Billing')) {
      open.value.push('Billing');
    } else {
      open.value.splice(0);
    }
  },
);
watch(
  selected,
  (s) => {
    if (open.value.includes('Billing') && !s.value?.[0]?.title) {
      return;
    } else {
      open.value.pop();
    }
  },
  { deep: true },
);
watch(
  () => open,
  (o) => {
    if (route.path.includes('billing') && !o.value.includes('Billing')) {
      open.value.push('Billing');
    }

    if (o.value.length > 0) {
      selected.value.splice(0);
    }
  },
  { deep: true },
);

const items = ref([
  {
    title: 'ORGANIZATION',
    class: 'drawer-title',
    // to: "/dashboard",
    props: {
      prependIcon: '',
    },
  },
  {
    title: 'ORG NAME',
    // to: "/dashboard",
    props: {
      prependIcon: 'mdi-briefcase',
    },
  },
  {
    title: 'Settings',
    to: '/dashboard',
    props: {
      prependIcon: 'mdi-cog',
    },
  },
  {
    title: 'Usage',
    to: '/dashboard/usage',
    props: {
      prependIcon: 'mdi-chart-bar',
    },
  },
  {
    title: 'Members',
    to: '/dashboard/members',
    props: {
      prependIcon: 'mdi-account-group',
    },
  },
  {
    title: 'Billing',
    to: '/dashboard/billing/overview',
    path: '/dashboard/billing',
    props: {
      prependIcon: 'mdi-wallet-bifold',
      subPages: [
        {
          title: 'Overview',
          to: '/overview',
        },
        /* {
          title: 'Payment methods',
          to: '/payment-methods',
        }, */
        {
          title: 'Billing history',
          to: '/history',
        },
        {
          title: 'Pricing',
          to: '/pricing',
        },
        {
          title: 'Preferences',
          to: '/preferences',
        },
      ],
    },
  },
  {
    title: 'USER',
    // to: "/dashboard/api-keys",
    class: 'drawer-title',
    props: {
      prependIcon: '',
    },
  },
  {
    title: 'API keys',
    to: '/dashboard/api-keys',
    props: {
      prependIcon: 'mdi-key-chain',
    },
  },
]);

const computedItems = computed(() => {
  return items.value.map(mapItem);
});

const profile = computed(() => {
  return {
    avatar: true,
    title: 'Avatar',
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
  padding-top: 32px !important;
  height: 100%;
  max-width: 300px;
  flex: 0 0 15%;
  border-right: solid 1px lightgrey;

  * {
    // outline: solid 1px red;
  }
  .v-list-group__header.v-list-item--active:before {
    opacity: 0.24;
  }

  .v-list {
    overflow-x: hidden;
  }
  .v-list-item {
    // padding-inline-start: 24px;
    // padding-inline-end: 14px;
    font-size: 14px !important;

    &__prepend {
      .v-icon {
        // margin-inline-end: 8px;
        ~ .v-list-item__spacer {
          width: 8px;
        }
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
      font-size: 14px !important;
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
