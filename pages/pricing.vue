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

// Function to handle opening Stripe payment
async function openStripe(priceId: string) {
  const { data } = await useAuthAPI<StripeCreateLink>('/stripe/create', 'POST', {
    price_id: priceId,
    mode: 'payment',
  })

  if (data.value.url)
    window.open(data.value.url as string, '_blank')
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
        <h1>NPC-GPT Pricing Plans</h1>
        <p>
          Simple and flexible pricing plans adapted to the development stage of your game. Pay per volume of requests
          made to our API.<br>
          Only Developer packs are available at the moment. Packs for games in production will be available soon.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <div class="feature-boxes my-9">
        <div
          v-for="pricing in pricingList"
          :key="pricing.price_id"
          class="feature-box"
          :class="{ 'featured-item': pricing.featured && !isLightBoxHovered }"
          @mouseover="isLightBoxHovered = !pricing.featured && true"
          @mouseleave="isLightBoxHovered = !pricing.featured && false"
        >
          <h3>{{ pricing.description }}</h3>
          <ul class="pricing-tables">
            <li>Input tokens</li>
            <li>Output tokens</li>
            <li>Users</li>
            <li class="align-right">
              {{ formatTokens(pricing.inputTokens) }}
            </li>
            <li class="align-right">
              {{ formatTokens(pricing.outputTokens) }}
            </li>
            <li class="align-right">
              {{ pricing.users }}
            </li>
          </ul>
          <div class="price-display" :class="{ 'featured-price': pricing.featured }">
            <h4>{{ formatPrice(pricing.value) }}</h4>
          </div>
          <button class="button light-button" @click="openStripe(pricing.price_id)">
            Subscribe
          </button>
        </div>
      </div>
    </v-row>
    <v-col cols="12" class="contact-us">
      <h3>Need a tailored solution for your project?</h3>
      <a href="https://discord.gg/JdDwRfTGNF"><button class="button no-hover-button">Contact our Team</button></a>
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

.pricing .feature-box {
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  width: 280px;
}

.pricing-tables {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  column-count: 2;
  column-gap: 20px;
}

.pricing-tables li {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'NunitoSans';
}

.pricing .feature-box h3 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
}

.pricing .feature-box button {
  font-size: 20px;
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
    height: 48px;
    justify-content: center;
    margin-top: 14px;
    margin-bottom: 26px;
    min-width: 100%;
    &.featured-price {
      font-weight: 500;
      font-size: 30px;
      color: #6200ee;
    }
  }

  h4 {
    font-weight: 400;
    font-size: 20px;
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
.feature-box.featured-item {
  background-color: #fff;
  outline: 3px solid #6200ee !important;

  button.button {
    background-color: #6200ee;
    color: #fff;
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
