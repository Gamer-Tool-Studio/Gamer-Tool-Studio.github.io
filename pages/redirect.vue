<script setup>
const router = useRouter();
const { isAuthenticated } = useAuthStore();
if (await isAuthenticated()) {
  router.push({ path: '/dashboard' });
}
</script>
