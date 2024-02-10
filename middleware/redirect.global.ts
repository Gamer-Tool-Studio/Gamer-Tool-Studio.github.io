export default defineNuxtRouteMiddleware(async (route) => {
  if (route.fullPath === '/dashboard/billing/pricing') {
    return navigateTo('/pricing');
  }
});
