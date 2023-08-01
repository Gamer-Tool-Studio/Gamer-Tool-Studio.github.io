<template>
  <Transition name="layout" mode="out-in">
    <div>
      <h1 color="red" style="position: absolute; z-index: 99999"></h1>
      <NuxtLayout :name="layout">
        <Transition name="page" mode="out-in">
          <div :key="route.fullPath">
            <NuxtPage />
          </div>
        </Transition>
      </NuxtLayout>
    </div>
  </Transition>
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
  titleTemplate: "%s - bT Boilerplate 2023",
});
</script>
