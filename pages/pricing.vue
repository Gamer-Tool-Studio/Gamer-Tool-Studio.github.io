<template>
  <v-container class="pricing pt-0">
    <v-row class="intro-section">
      <v-col>
        <h1>NPC-GPT Pricing Plans</h1>
        <p>
          Simple and flexible pricing plans adapted to the development stage of your game. Pay per volume of requests
          made to our API only.<br />
          Only Developer packs are available at the moment. Packs for games in production will be available soon.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <div class="feature-boxes my-9">
        <div
          v-for="pricing in pricingList"
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
            <li class="align-right">{{ formatTokens(pricing.inputTokens) }}</li>
            <li class="align-right">{{ formatTokens(pricing.inputTokens) }}</li>
            <li class="align-right">{{ pricing.users }}</li>
          </ul>
          <div class="price-display" :class="{ 'featured-price': pricing.featured }">
            <h4>{{ formatPrice(pricing.value) }}</h4>
          </div>
          <button class="button light-button" @click="openStripe(pricing.price_id)">Subscribe</button>
        </div>
      </div>
    </v-row>
    <v-col cols="12" class="contact-us">
      <h3>Need a tailored solution for your project?</h3>
      <button class="button no-hover-button">Contact our Team</button>
    </v-col>
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BASE_URL, PRICING_LIST } from '~/util/urls';

definePageMeta({
  layout: 'default',
});
// let pricingList: PricingList = ref([]);

// set the pricing list to the type PricingList
let pricingList: PricingList = [];
let { data } = await useFetch(() => BASE_URL + PRICING_LIST, {
  headers: {
    'Content-Type': 'application/json',
  },
});

pricingList = data as unknown as PricingList;

console.log('pricingList', pricingList);
console.log('data', data);

const isLightBoxHovered = ref(false);

const openStripe = async (priceId: string) => {
  const { data } = await useAuthAPI<StripeCreateLink>('/stripe/create', 'POST', {
    price_id: priceId,
    mode: 'payment',
  });

  if (data.value.url) {
    window.open(data.value.url as string, '_blank');
  }
};

const formatPrice = (price: number) => {
  if (Number(price) === 0) {
    return 'Free';
  }
  return `$${price}`;
};

const formatTokens = (tokens: number) => {
  if (tokens >= 1000000) {
    return `${tokens / 1000000}M`;
  } else if (tokens >= 1000) {
    return `${tokens / 1000}K`;
  } else {
    return `${tokens}`;
  }
};
</script>

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
      color: #6200ee;
      color: #fff !important;
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
