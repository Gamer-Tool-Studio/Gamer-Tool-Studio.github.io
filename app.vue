<template>
  <NuxtLayout :name="layout">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
const route = useRoute();
// Watch the user's login status

let layout = ref("default");

watch(
  () => route.name,
  () => {
    console.debug(
      `MyCoolComponent - watch route.name changed to ${String(route.name)}`
    );
    // Do something here...
    console.log("route changed:", route.path);
    // setPageLayout(
    //   route.path.includes("dashboard") ? "dashboard-layout" : "default"
    // );

    layout.value = route.path.includes("dashboard")
      ? "dashboard-layout"
      : "default";
    // Optionally you can set immediate: true config for the watcher to run on init
    //},
  },
  { immediate: true }
);

useHead({
  // as a string,
  // where `%s` is replaced with the title
  // of the current page
  title: "Welcome ",
  titleTemplate: "%s - GTS",
});
</script>
<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
