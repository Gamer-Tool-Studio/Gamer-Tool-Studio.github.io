<script lang="ts" setup>
import { ref } from 'vue'

// Debugger for the pricing page
const debug = getDebugger('pricing')

// Define page meta layout
definePageMeta({
  layout: 'default',
})

// Fetch the pricing list data
let pricingList: PricingList = []
const { data } = await useFetch(() => BASE_URL + PRICING_LIST, {
  headers: {
    'Content-Type': 'application/json',
  },
})

pricingList = data as unknown as PricingList

debug.log('pricingList', pricingList)
debug.log('data', data)

const isLightBoxHovered = ref(false)

// Function to handle opening Stripe payment or signup
async function openStripe(stripePriceId: string) {
  // Free trial redirects to signup page
  if (stripePriceId === 'trial') {
    navigateTo('/login?register=true')
    return
  }

  // Check if price ID is configured
  if (stripePriceId === 'CONFIGURE_IN_ENV') {
    // eslint-disable-next-line no-alert
    alert('This plan is not configured yet. Please set up Stripe Price IDs in your environment.')
    return
  }

  // Check if user is logged in
  const userStore = useUserStore()
  if (!userStore.isLoggedIn) {
    // Redirect to login with the price_id as a query param for post-login purchase
    navigateTo(`/login?purchase=${stripePriceId}`)
    return
  }

  // User is logged in - create Stripe checkout session
  const { data, error } = await useAuthAPI<StripeCreateLink>('/stripe/create', 'POST', {
    price_id: stripePriceId, // Pass the actual Stripe Price ID
    mode: 'payment',
  })

  if (data.value && data.value.url) {
    window.location.href = data.value.url // Redirect in same tab for better UX
  }
  else {
    debug.log('Error creating Stripe session:', error.value)
    // eslint-disable-next-line no-alert
    alert('Unable to create payment link. Please check that Stripe is configured correctly.')
  }
}

// Function to format the price
function formatPrice(price: number) {
  if (Number(price) === 0)
    return 'Free'

  return `$${price}`
}

// SEO Meta Tags for the Pricing Page
useHead({
  title: 'NPC-GPT Pricing Plans - Flexible and affordable AI character integration',
  meta: [
    {
      name: 'description',
      content: 'Choose the perfect NPC-GPT pricing plan for your game development needs. Affordable, flexible options for developers at every stage.',
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: 'NPC-GPT Pricing Plans - Flexible and Affordable AI Integration',
    },
    {
      property: 'og:description',
      content: 'Explore our pricing plans tailored for all game development stages with NPC-GPT. Find the plan that fits your needs and budget.',
    },
    {
      property: 'og:image',
      content: '~/assets/images/GTS-iso.png', // Replace with your own image URL
    },
    {
      property: 'og:url',
      content: 'https://gamertoolstudio.com/pricing', // Replace with the actual URL of your pricing page
    },
    // Twitter Card Tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'NPC-GPT Pricing Plans - Flexible and Affordable AI Integration',
    },
    {
      name: 'twitter:description',
      content: 'Choose the perfect NPC-GPT pricing plan for your game development. Flexible, affordable options for all developers.',
    },
    {
      name: 'twitter:image',
      content: '~/assets/images/GTS-iso.png', // Replace with your own image URL
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Game Tool Studio',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '~/public/favicon.png',
    },
  ],
})
</script>

<template>
  <v-container class="pricing pt-0">
    <v-row class="intro-section">
      <v-col>
        <h1>NPC-GPT Token Packs</h1>
        <p>
          Purchase token packs adapted to the development stage of your game. One-time payment for the tokens you need.<br>
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <div class="pricing-grid">
          <div
            v-for="pricing in pricingList"
            :key="pricing.stripe_price_id"
            class="feature-box"
            :class="{
              'featured-item': pricing.featured && !isLightBoxHovered,
              'trial-pack': pricing.isFreeTrial,
            }"
            @mouseover="isLightBoxHovered = !pricing.featured && true"
            @mouseleave="isLightBoxHovered = !pricing.featured && false"
          >
            <div v-if="pricing.isFreeTrial" class="trial-badge">
              Free Trial
            </div>
            <div v-if="pricing.featured" class="popular-badge">
              Most Popular
            </div>
            <h3>{{ pricing.description }}</h3>
            <div class="price-display" :class="{ 'featured-price': pricing.featured }">
              <h4>{{ formatPrice(pricing.value) }}</h4>
              <p v-if="pricing.value > 0" class="price-period">
                one-time
              </p>
            </div>
            <ul class="pricing-features">
              <li>
                <v-icon size="16" color="success">
                  mdi-check-circle
                </v-icon>
                <span>{{ formatTokens(pricing.inputTokens) }} input tokens</span>
              </li>
              <li>
                <v-icon size="16" color="success">
                  mdi-check-circle
                </v-icon>
                <span>{{ formatTokens(pricing.outputTokens) }} output tokens</span>
              </li>
              <li>
                <v-icon size="16" color="success">
                  mdi-check-circle
                </v-icon>
                <span>{{ pricing.users }} {{ pricing.users === 'Unlimited' ? 'seats' : (pricing.users === 1 ? 'seat' : 'seats') }}</span>
              </li>
            </ul>
            <button
              class="button light-button"
              :class="{ 'featured-button': pricing.featured }"
              @click="openStripe(pricing.stripe_price_id)"
            >
              {{ pricing.isFreeTrial ? 'Start Free Trial' : 'Buy Now' }}
            </button>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-col cols="12" class="contact-us">
      <h3>Need a tailored solution for your project?</h3>
      <a href="https://discord.gg/JdDwRfTGNF"><button class="button shiny">Contact our Team</button></a>
    </v-col>
  </v-container>
</template>

<style lang="scss" scoped>
.pricing .intro-section h1 {
  font-size: 40px;
  line-height: 88px;
  margin-bottom: 15px;
}

.pricing p {
  font-size: 20px;
  font-weight: 100;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.pricing .feature-box {
  background-color: #fff;
  width: 100%;
  position: relative;
}

.trial-badge, .popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
}

.trial-badge {
  background-color: #4CAF50;
  color: white;
}

.popular-badge {
  background-color: #6200ee;
  color: white;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 20px 0 30px 0;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
    font-family: 'NunitoSans';

    span {
      flex: 1;
    }
  }
}

.pricing .feature-box h3 {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
}

.pricing .feature-box button {
  font-size: 18px;
  width: 100%;
}

.featured-button {
  background-color: #6200ee !important;
  color: white !important;

  &:hover {
    background-color: #4a00b8 !important;
  }
}

.contact-us h3 {
  font-family: 'Titillium Web';
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 26px;
}

.contact-us button {
  font-size: 18px;
}

.contact-us button:hover {
  color: #6200ee;
  color: #fff;
}

.feature-box {
  background-color: #fff;
  transition: outline-color 0.3s ease-in-out; /* Add transition for smooth effect */
  outline: 2px solid #ececf1;

  &:hover {
    outline: 3px solid #6200ee !important;
  }
  .align-right {
    text-align: end;
  }
  .price-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 4px;
    margin-top: 8px;
    margin-bottom: 20px;
    min-width: 100%;

    &.featured-price {
      h4 {
        color: #6200ee;
      }
    }

    h4 {
      font-weight: 700;
      font-size: 48px;
      margin: 0;
    }

    .price-period {
      font-size: 16px;
      color: #666;
      margin: 0;
    }
  }

  button.button {
    font-size: 20px;
    background-color: #fff;
    border: 1px solid #6200ee !important;
    color: #6200ee;

    &:hover {
      color: #fff !important;
      background-color: #6200ee !important;
    }
  }
}

.shiny{
  transition: background 0.6s ease-in-out !important;
  text-decoration: none;
  border-radius: 7px;
}

.shiny:hover{
  background: linear-gradient(135deg, #1a1a1a, #303030, #6200ee, #303030, #1a1a1a) !important;
  background-size: 200% 200% !important;
  animation: metallic-shine 1.5s ease-in-out forwards !important;
  color:#fff !important;
}

@keyframes metallic-shine {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}

.feature-box.featured-item {
  background-color: #fff;
  outline: 3px solid #6200ee !important;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(98, 0, 238, 0.2);

  button.button {
    background-color: #6200ee;
    color: #fff;
  }
}

@media (max-width: 1400px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .feature-box.featured-item {
    transform: scale(1);
  }

  .pricing .intro-section h1 {
    font-size: 32px;
    line-height: 1.2;
  }

  .pricing .feature-box h3 {
    font-size: 24px;
  }

  .feature-box .price-display h4 {
    font-size: 40px;
  }
}

@media (max-width: 900px) {
  .contact-us button {
    padding: 15px;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
src/utils/urlssrc/utils
