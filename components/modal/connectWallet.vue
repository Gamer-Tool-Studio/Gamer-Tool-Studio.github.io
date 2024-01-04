<template>
  <transition name="modal-fade">
    <div class="modal-backdrop nft-modal" @click="close">
      <div class="modal" role="dialog" @click.stop>
        <v-col cols="12">
          <header class="modal-header">
            <h1>{{ isConnected ? 'Make your accusation' : 'Connect your web3 wallet' }}</h1>
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              <img src="~/assets/icons/close.svg" />
            </button>
          </header>
        </v-col>
        <section class="modal-body">
          <v-container>
            <v-row class="modal-content-section">
              <!-- Conditional Content -->
              <div v-if="!isConnected">
                <!-- Wallet Connection Content -->
                <v-col cols="12" class="text-section">
                  <p>Approve the connection in your wallet extension!</p>
                </v-col>
                <div v-if="isLoading" class="loader"></div>
                <v-col cols="12" class="connect-button">
                  <button class="button" @click="connectWallet">Connect again</button>
                </v-col>
                <v-col cols="12" class="redirect">
                  <p>Don't have web3 wallet? Get <a href="https://metamask.io/">Metamask wallet</a> now.</p>
                </v-col>
              </div>
              <div v-else>
                <!-- Minting Content -->
                <v-col cols="12" class="nft-display">
                  <img src="~/assets/images/tcg/2-butler-card.png" alt="NFT Image" class="nft-image" />
                </v-col>
                <v-col cols="12" class="amount-section">
                  <input type="number" v-model.number="mintAmount" min="1" class="mint-amount-input" />
                </v-col>
                <v-col cols="12" class="text-section">
                  <p>Total Price: {{ mintAmount * 5 }} USDT</p>
                </v-col>
                <v-col cols="12" class="connect-button">
                  <button class="button" @click="mintNFT">Mint Accusation</button>
                </v-col>
                <v-col cols="12" class="redirect">
                  <p>Don't have any USDT? Buy it on <a href="https://www.binance.com/">Binance</a> or in another exchange.</p>
                </v-col>
              </div>
            </v-row>
          </v-container>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import Web3 from 'web3';

export default {
  name: 'Connect Wallet',
  data() {
    return {
      isLoading: false,
      account: null,
      mintAmount: 1, // Default mint amount
      // ... other data properties ...
    };
  },

  mounted() {
    this.connectWallet(); // Initiate the wallet connection when the modal is mounted
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async connectWallet() {
      this.isLoading = true; // Start loading as soon as the function is called
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          // Check the network
          const networkId = await web3.eth.net.getId();
          const mumbaiTestnetId = 0x13881; // Chain ID for Mumbai Testnet

          if (networkId !== mumbaiTestnetId) {
            // Request to switch to Mumbai Testnet
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }], // Hexadecimal chain ID
              });
            } catch (switchError) {
              // Handle error, such as user rejecting the request
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x13881',
                    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                    chainName: 'Polygon Testnet Mumbai',
                    nativeCurrency: {
                      name: 'MATIC',
                      symbol: 'MATIC', // 2-6 characters long
                      decimals: 18,
                    },
                    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                  },
                ], // Hexadecimal chain ID
              });
              console.error('Error switching to Mumbai Testnet:', switchError);
              throw switchError;
            }
          }

          const accounts = await web3.eth.getAccounts();
          this.account = accounts[0];
          this.isConnected = true; // Update connection status
          // ... Additional logic after successful connection ...
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          // ... Error handling ...
        } finally {
          this.isLoading = false; // Stop loading after the process is complete
        }
      } else {
        console.error('MetaMask not installed');
        this.isLoading = false; // Stop loading if MetaMask is not installed
      }
    },
    mintNFT() {
      // TODO: Add logic to mint NFT
      console.log(`Minting ${this.mintAmount} NFT(s)`);
    },
    // ... other methods ...
  },
};
</script>

<style lang="scss">
.nft-modal {
  position: absolute;
  top: auto;
  left: auto;
  background-color: #2a2c3f;
  text-align: center;
  border: 1px solid #6e6e80;
  border-radius: 7px;
  min-width: 50%;
}

.modal-content-section {
  display: block;
  text-align: center;
}

.modal-header {
  display: inline-flex !important;
}
.modal-header button {
  float: right !important;
}
.modal-header h1 {
  color: #fff !important;
}
.text-section p {
  font-size: 22px !important;
}

  .connect-button {
    margin-bottom: 10px;
    margin-top: 10px;
  }

.connect-button button {
  font-size: 20px;
}
.redirect {
  font-size: 14px;
}

.redirect a {
  text-decoration: none;
}
.loader {
  margin: auto;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #6202ee;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.nft-display {
  text-align: center;
}

.nft-image {
  max-width: 100%;
  max-width: 200px;
  margin: auto;
  display: block;
}
.amount-section {
  width: 320px;
  text-align: center;
  margin: auto;
  padding-bottom: 0;
}
.mint-amount-input {
  width: 100%;
  padding: 10px;
  margin: 0;
  text-align: center;
  font-size: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mint-amount-input :active {
  border: 1px solid #6202EE;
}
</style>
