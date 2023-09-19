<template>
  <footer :class="{ lp: isLandingPage }" class="comp-footer">
    <div class="footer-content">
      <div class="footer-row">
        <h4>Product</h4>
        <ul>
          <li><a href="#documentation">Download Plugin</a></li>
          <li><a href="https://github.com/yourusername">API Reference</a></li>
          <li><a href="https://github.com/yourusername">Github</a></li>
        </ul>
      </div>
      <div class="footer-row">
        <h4>Company</h4>
        <ul>
          <li><a href="#/pricing">Pricing</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-row">
        <h4>Community</h4>
        <ul>
          <li><a href="https://discord.com/yourserver">Discord</a></li>
          <li><a href="https://twitter.com/yourusername">Twitter</a></li>
          <li><a href="https://www.youtube.com/yourchannel">Youtube</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-copy">© Gamer Tools Studio 2023</p>
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
  background-color: #fff;
  width: 100%;
  text-align: center;
  padding: 20px;

  border: none !important;
}

footer.lp {
  background-color: black;
  color: #fff;
}

footer.lp a {
  color: #fff;
}
footer.lp p {
  color: #fff;
}

footer p {
  color: #6e6e80;
  font-family: "Bebas Neue";
}
footer a {
  color: #6e6e80;
  text-decoration: none;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-row {
  display: block;
  flex-basis: 30%;
  margin-bottom: 20px;
}

.footer-row h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.footer-row ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 5px;
}

.footer-section a {
  color: #6e6e80;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

footer a {
  font-size: 14px;
}
</style>
