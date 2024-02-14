<script lang="ts" setup>
const route = useRoute()
// Watch the user's login status
const debug = getDebugger('app')

watch(
  () => route.name,
  () => {
    debug.log(`watch route.name changed to ${String(route.name)}`)
    setPageLayout(
      route.path.includes('dashboard') ? 'dashboard-layout' : 'default',
    )
  },
  { immediate: true },
)

useHead({
  // as a string,
  // where `%s` is replaced with the title
  // of the current page
  title: 'Welcome ',
  titleTemplate: '%s - GTS',
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

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
