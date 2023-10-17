<template>
  <div><h1>Loading</h1></div>
</template>
<script setup>
const router = useRouter();
const { isAuthenticated } = useAuthStore();

if (await isAuthenticated()) {
  router.push({ path: '/dashboard' });
} else {
  router.push({ path: '/login' });
}
</script>
