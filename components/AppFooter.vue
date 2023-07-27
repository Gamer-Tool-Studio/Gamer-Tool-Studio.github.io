<template>
  <footer :class="{ lp: isLandingPage }">
    <p>© Gamer Tools Studio All rights Reserved 2023</p>
  </footer>
</template>
<script>
export default {
  computed: {
    // Going to make some small js tweaks
    isLandingPage() {
      return this.$route.path == "/";
    },
  },
};
</script>
<style lang="scss">
/* Footer Styles */
footer {
  p {
    margin: 0;
  }
  * {
    color: #6e6e80;
    text-align: center;
    padding: 20px;
  }
  &.lp {
    background-color: #000;
  }
}
</style>
