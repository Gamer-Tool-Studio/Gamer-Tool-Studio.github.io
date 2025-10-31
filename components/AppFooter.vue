<script>
export default {
  computed: {
    isLandingPage() {
      const path = this.$route.path
      return path === '/' || path === '/cluaido' || path === '/cluaido/'
    },
  },
}
</script>

<template>
  <footer :class="{ lp: isLandingPage }" class="comp-footer">
    <div class="footer-content">
      <div class="footer-row">
        <h4>Product</h4>
        <ul>
          <li><a href="#documentation">Plugins</a></li>
          <li><a href="https://gamertoolstudio.gitbook.io/npc-gpt/api-reference/introduction">SDKs</a></li>
          <li><a href="/cluaido">Games</a></li>
        </ul>
      </div>
      <div class="footer-row">
        <h4>Company</h4>
        <ul>
          <li><a href="#/pricing">Pricing</a></li>
          <li><a href="https://gamertoolstudio.itch.io/">About</a></li>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-row">
        <h4>Community</h4>
        <ul>
          <li><a href="https://discord.gg/JdDwRfTGNF">Discord</a></li>
          <li><a href="https://twitter.com/gamertoolstudio">Twitter</a></li>
          <li><a href="https://github.com/Gamer-Tool-Studio">Github</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-copy">
      © Gamer Tool Studio 2025
    </p>
  </footer>
</template>

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

.footer-copy{
    margin-top: 10px;
  }

@media (max-width: 768px) {
  .footer-content {
    display: inline-block;
  }

  .footer-row {
    width: 100%;
  }

  .footer-row a {
    font-size: 18px;
  }

  .footer-row h4 {
    font-size: 22px;
  }
}
</style>
