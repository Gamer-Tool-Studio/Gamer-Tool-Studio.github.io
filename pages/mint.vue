<script lang="ts" setup>
import { ref } from 'vue'
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Debugger for the pricing page
const debug = getDebugger('pricing')


// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({ 
  clientId: "5767633e1a68bf575326487901480929"
 });

// connect to your contract
const contract = getContract({ 
  client, 
  chain: defineChain(421614), 
  address: "0x850EEE3Fd95Abd59E9160493f3E66112aC33EA97"
});

// Define page meta layout
definePageMeta({
  layout: 'default',
})

let nftList = [
    {
    id : 1,
    image: "https://npc-gpt-api-04c6279a15ad.herokuapp.com/assets/characters/2-butler-card.png",
    title : "The Butler",
    price       : "5 usd",
    feature : true

  },
  {
    id : 2,
    image: "https://npc-gpt-api-04c6279a15ad.herokuapp.com/assets/characters/3-maid-card.png",
    title : "The Maid",
    price       : "10 usd",
    feature : true


  },
  {
    id : 3,
    image : "https://npc-gpt-api-04c6279a15ad.herokuapp.com/assets/characters/4-gardener-card.png",
    title : "The Gardener",
    price       : "15 usd",
    feature : true


  },
  {
    id : 4,
    image : "https://npc-gpt-api-04c6279a15ad.herokuapp.com/assets/characters/5-cook-card.png",
    title : "The Cook",
    price       : "20 usd",
    feature : true


  },
  {
    id : 5,
    image : "https://npc-gpt-api-04c6279a15ad.herokuapp.com/assets/characters/6-journalist-card.png",
    title : "The Journalist",
    price       : "25 usd",
    feature : true


  }
]
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


async function mintTheirdWeb(nftID: string) {

   console.log("mint the nft ", nftID )

  // import { prepareContractCall, sendTransaction } from "thirdweb";

  //   const transaction = await prepareContractCall({ 
  //     contract, 
  //     method: "function mint(uint256 id, address paymentToken)", 
  //     params: [nftID, paymentToken] 
  //   });
  //   const { transactionHash } = await sendTransaction({ 
  //     transaction, 
  //     account 
  //   });

}

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
  title: 'Mint Cluaido NFT Effortless :)',
  meta: [
    {
      name: 'description',
      content: 'Welcome to Cluaidos NFT minting page! Explore and mint a variety of unique characters from the Cluaido universe with our simple and intuitive tools. Each character is ready for you to bring to life—just follow the easy steps to add your favorite Cluaido characters to your collection. Get started now and join the Cluaido adventure!',
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
        <h1>Mint Cluaido NFT Effortless :)</h1>
        <p>
          Welcome to Cluaido’s minting page! Enjoy a seamless experience as you mint unique characters from the Cluaido universe. Our straightforward process makes it easy to add your favorite Cluaido NFTs to your collection. Just a few simple steps and you’re done. Start minting effortlessly and become part of the Cluaido community today!
        </p>
      </v-col>
    </v-row>

    <v-row>
      <div class="feature-boxes my-9">
        <div
          v-for="nft in nftList"
          :key="nft.id"
          class="feature-box"
          :class="{ 'featured-item': nft.featured && !isLightBoxHovered }"
          @mouseover="isLightBoxHovered = !nft.featured && true"
          @mouseleave="isLightBoxHovered = !nft.featured && false"
        >
          <h3>{{ nft.title }}</h3>
          <ul class="pricing-tables">
            <li>Title </li>
            <li class="align-right">
              {{ formatTokens(nft.title) }}
            </li>
          </ul>
          <img :src="nft.image" alt="NFT Image" class="nft-image" />
          <div class="price-display" :class="{ 'featured-price': nft.featured }">
            <h4>{{ formatPrice(nft.price) }}</h4>
          </div>
          <button class="button light-button" @click="mintTheirdWeb(nft.id)">
            Mint
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

.nft-image {
  width: 185px; /* Ajuste o tamanho conforme necessário */
  height: 185px; /* Ajuste o tamanho conforme necessário */
  object-fit: cover; /* Faz com que a imagem se ajuste bem ao contêiner */
  margin-top: 10px; /* Espaçamento superior opcional */
}

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
