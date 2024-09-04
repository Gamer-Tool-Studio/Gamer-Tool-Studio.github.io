<script>
import Web3 from 'web3'

const debug = getDebugger('modal:ConnectWallet')

export default {
  name: 'ConnectWallet',
  props: {
    suspectId: Number,
  },
  emits: ['close'],
  data() {
    return {
      isLoading: false,

      networkConfig: [
      {
          chainId: 80002,
          rpcUrls: ['https://rpc-amoy.polygon.technology/'],
          chainName: 'Polygon Amoy Testnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC', // 2-6 characters long
            decimals: 18,
          },
          blockExplorerUrls: ['https://amoy.polygonscan.com/'],
        },
        {
          chainId: "56",
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          chainName: 'BNB Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB', // 2-6 characters long
            decimals: 18,
          },
          blockExplorerUrls: ['https://bscscan.com/'],
        },
        {
          chainId: "421614",
          rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
          chainName: 'Arbitrum Sepolia',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH', // 2-6 characters long
            decimals: 18,
          },
          blockExplorerUrls: ['https://sepolia.arbiscan.io'],
        }
      ],

      account: null,
      mintAmount: 1,
      mintPrice : 5,
      isConnected: false,
      isApproving: false,
      isMinting: false,
      web3: null, // Initialize Web3
      mintInProgress: false,
      mintSuccessful: false,
      contract: null, // Initialize contract for NFT
      stableContract: null, // Initialize contract for USDT
      mintPriceInUSDT: 5, // Set mint price (adjust as needed)
      contractABI : [
      {
          "inputs": [],
          "name": "mintPrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "paymentToken",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      stableContractABI: [
      // Minimal ERC20 ABI for approve function
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
            {
              name: '_spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          type: 'function',
        },
      ],
      selectedChainId: 56,
      loadedContract : null,
      contracts: [
        {
          chain: 'BNB mainnet',
          chainId: 56,
          stableConctractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
          nftContractAddress : "0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee",
          address: [
            {
              type: 'ERC20',
              address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            },
            {
              type: 'ERC1155',
              address: '0x545C05eaE06A171a583Fbad43e9F065986a13fD2',
            },
          ],
        },
        {
          chain: 'Polygon test',
          chainId: 80002,
          stableConctractAddress: "0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee",
          nftContractAddress : "0x545C05eaE06A171a583Fbad43e9F065986a13fD2",
          address: [
            {
              type: 'ERC20',
              address: '0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee',
            },
            {
              type: 'ERC1155',
              address: '0x545C05eaE06A171a583Fbad43e9F065986a13fD2',
            },
          ],
        },
        {
          chain: 'Arbritirum Sepolia',
          chainId: 421614,
          stableConctractAddress: "0xd0dCB97bC361C67b36a2254eA31909499118E1FB",
          nftContractAddress : "0x850EEE3Fd95Abd59E9160493f3E66112aC33EA97",
          address: [
            {
              type: 'ERC20',
              address: '0xd0dCB97bC361C67b36a2254eA31909499118E1FB',
            },
            {
              type: 'ERC1155',
              address: '0x850EEE3Fd95Abd59E9160493f3E66112aC33EA97',
            },
          ],
        },
      ],
    }
  },
  watch: {

    mintAmount(newVal) {
      if (newVal < 1 || !Number.isInteger(newVal))
        this.mintAmount = 1
    },
    selectedChainId(newVal){
      console.log("chain selected change")
    }
  },
  mounted() {
    //this.connectWallet() // Initiate the wallet connection when the modal is mounted
    this.checkIsConnected();
  },
  methods: {
    async handleSelectionChange(newValue) {
      // Aqui você pode adicionar a lógica para lidar com a alteração da seleção
      console.log('Selected Chain ID:', newValue);
      // Adicione aqui o código que deseja executar quando a seleção mudar
    },
    close() {
      this.$emit('close')
    },
    async setMintAmount(){
      console.log('CALL:: set mint amount');
      const requiredAllowance = await this.contract.methods.mintPrice().call();
      console.log("Mint price", this.web3.utils.fromWei(requiredAllowance, 'ether'), "ETH");
      this.mintPrice =  this.web3.utils.fromWei(requiredAllowance, 'ether');
    },
    async checkIsConnected(){
      if (window.ethereum) {

          const web3 = new Web3(window.ethereum)
          await window.ethereum.request({ method: 'eth_requestAccounts' })

          // Check the network
          const networkId =  Number(await web3.eth.net.getId())
          console.log('networkId ', networkId);
          const networkIndex = this.contracts.findIndex(contract => contract.chainId === networkId)
          console.log('networkIndex ', networkIndex );
          if (networkIndex === -1) {
            debug.error('Unsupported network:', networkId)
            throw new Error('Unsupported network')
          }

          this.selectedChainId =  networkId;

          const accounts = await web3.eth.getAccounts()
          this.account = accounts[0]
          debug.log('Wallet connected:', this.account) // Log the connected account
          this.isConnected = true // Update connection status

          console.log('Contract info loaded for chainID : ', this.contracts[networkIndex]);
          this.loadedContract = this.contracts[networkIndex];
          
          // Initialize contracts after getting accounts
          this.web3 = new Web3(window.ethereum)
          console.log('LOG: load nft contract');
          this.contract = new this.web3.eth.Contract(this.contractABI, this.loadedContract.nftContractAddress )
          console.log('LOG: load stableContract');
          this.stableContract = new this.web3.eth.Contract(this.stableContractABI, this.loadedContract.stableConctractAddress )
          console.log('finish load contracts');
          this.setMintAmount();

      }
    },
    async addDefaultNetwork(){
        console.log('Eerror changing the network ', switchError );

        console.log('Eerror chainIdSelected  ',  this.selectedChainId );
        console.log("netowkr config 0", this.networkConfig[0].chainId)

        const selectedNetwork = this.networkConfig.find(config => config.chainId === this.selectedChainId);
        console.log("select network ", selectedNetwork )
        selectedNetwork.chainId = '0x' +  selectedNetwork.chainId.toString(16);

        // Handle error, such as user rejecting the request
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            selectedNetwork
          ], // Hexadecimal chain ID
        })
        debug.error('Error switching :', switchError)

    },
    async connectWallet() {
      this.isLoading = true // Start loading as soon as the function is called
      if (window.ethereum) {
        // console.log('chainId', this.selectedChainId)
        try {
         this.checkIsConnected();
          // Request to switch network if need
          const networkId =  Number(await web3.eth.net.getId())
          try {
            if(this.selectedChainId !=  networkId){
                await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + this.selectedChainId.toString(16)  }], // Hexadecimal chain ID
              })
            }
          }
          catch (switchError) {
            this.addDefaultNetwork();
            console.error("Error adding default network!")
          }
        }
        catch (error) {
          debug.error('Error connecting to MetaMask:', error)
          debug.error('Wallet connection failed:', error) // Log the error
        }
        finally {
          this.isLoading = false // Stop loading after the process is complete
        }
      }
      else {
        debug.error('MetaMask not installed')
        this.isLoading = false // Stop loading if MetaMask is not installed
      }
    },


    async checkAllowance() {
      console.log("CALL::checkAllowance");
      console.log('account and contract address : ', this.account, this.loadedContract.nftContractAddress)
      const allowance = await this.stableContract.methods.allowance(this.account, this.loadedContract.nftContractAddress).call()
      console.log('Read allowance from contract : ', allowance);
      const requiredAllowance = await this.contract.methods.mintPrice().call();
      console.log("Mint price", this.web3.utils.fromWei(requiredAllowance, 'ether'), "ETH");
      console.log("LOG::after checkAllowance")
      return Number.parseFloat(allowance) >= requiredAllowance
    },

   
    async mintNFT() {

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      console.log('******  Mint NFT ***** ', Number(chainId) );

      if (!this.web3 || !this.contract || !this.stableContract)
        await this.connectWallet()

      console.log('MINT: after check instance ', this.suspectId )

      if (this.contract && this.stableContract && this.suspectId != null) {
        this.isLoading = true


        try {
          // Check if enough allowance is already set
          const hasEnoughAllowance = await this.checkAllowance()

          if (!hasEnoughAllowance) {
            this.isApproving = true
            const spendingCap = 10000000 // Set spending cap
            const mintPrice = spendingCap * 10 ** 18 // Adjust for USDT decimals
            await this.stableContract.methods.approve(this.contractAddress, mintPrice).send({ from: this.account })
            this.isApproving = false
          }else{
            console.log('Allowance is enough!')
          }

          this.isMinting = true
          console.log('Will start the minting for suspectId ',  this.suspectId, " with token : ", this.loadedContract.stableConctractAddress)
          // Mint NFT using suspectId from props
          await this.contract.methods.mint(this.suspectId, this.loadedContract.stableConctractAddress ).send({ from: this.account })
            .on('transactionHash', (hash) => {
              debug.log('Transaction Hash:', hash)
              this.isMinting = false // Set isMinting to false to move to the next stage
              this.mintInProgress = true // Set mintInProgress to true here
            })
            .on('confirmation', (confirmationNumber, receipt) => {
              debug.log('Mint successful:', confirmationNumber, receipt)
              this.mintInProgress = false // Set mintInProgress to false upon successful confirmation
              this.mintSuccessful = true // Set mintSuccessful to true
            })
            .on('error', debug.error)
        }
        catch (error) {
          debug.error('Error during the minting process:', error)
          this.isMinting = false
          this.mintInProgress = false // Reset this on error
        }
        finally {
          this.isLoading = false
        }
      }
      else {
        debug.error('suspectId is null or contracts are not set')
      }
    },
  },
}
</script>

<template>
  <transition name="modal-fade">
    <div v-show="true" class="modal-backdrop nft-modal" @click="close">
      <div class="modal" role="dialog" @click.stop>
        <v-col cols="12">
          <header class="modal-header">
            <h1 v-if="!isConnected">
              Connect your web3 wallet
            </h1>
            <h1 v-else-if="isApproving">
              Approve USDT spending in your wallet
            </h1>
            <h1 v-else-if="isMinting">
              Approve the Minting Transaction in your wallet
            </h1>
            <h1 v-else-if="mintInProgress">
              Minting your Accusation
            </h1>
            <h1 v-else-if="mintSuccessful">
              Success!
            </h1>
            <h1 v-else>
              Make your accusation
            </h1>
          </header>
          <button type="button" class="btn-close" aria-label="Close modal" @click="close">
            <img src="~/assets/icons/close_white.png">
          </button>
        </v-col>
        <section class="modal-body">
          <v-container>
            <v-row class="modal-content-section">
              <!-- Conditional Content -->
              <v-col cols="6">
                <v-select
                  v-model="selectedChainId"
                  label="Select"
                  item-title="chain"
                  item-value="chainId"
                  :items="contracts"
                  @input="handleSelectionChange"
                />
              </v-col>
              <div v-if="!isConnected">
                <!-- Wallet Connection Content -->
                <v-col cols="12" class="text-section">
                  <p class="tx-status">
                    Approve the connection in your wallet extension!
                  </p>
                </v-col>
                <div v-if="isLoading" class="loader" />
                <v-col cols="12" class="connect-button">
                  <button class="button" @click="connectWallet">
                    Connect again
                  </button>
                </v-col>
                <v-col cols="12" class="redirect">
                  <p>Don't have web3 wallet? Get <a href="https://metamask.io/">Metamask wallet</a> now.</p>
                </v-col>
              </div>
              <!-- Approve state content -->
              <div v-else-if="isApproving">
                <div class="loader" />
              </div>
              <!-- Minting state content -->
              <div v-else-if="isMinting">
                <div class="loader" />
              </div>
              <!-- Minting in progress state content -->
              <div v-else-if="mintInProgress">
                <div class="loader" />
                <p class="tx_status">
                  Transaction pending. Check its status in your wallet
                </p>
              </div>
              <!-- Success State content -->
              <div v-else-if="mintSuccessful">
                <v-col cols="12" class="nft-display">
                  <img :src="`/images/tcg/${suspectId}.png`" alt="Suspect Image">
                </v-col>
                <p class="tx_status">
                  You have successfully minted your NFT.
                </p>
                <a href="https://testnets.opensea.io/collection/unidentified-contract-e4ba0bc2-ca14-4e90-b433-df91"><button class="opensea">Check on OpenSea</button></a>
              </div>
              <div v-else>
                <!-- Minting Content -->
                <v-col cols="12" class="nft-display">
                  <img :src="`/images/tcg/${suspectId}.png`" alt="Suspect Image">
                </v-col>
                <v-col cols="12" class="amount-section">
                  <input v-model.number="mintAmount" type="number" min="1" class="mint-amount-input">
                </v-col>
                <v-col cols="12" class="text-section">
                  <p>Total Price: {{ mintAmount * mintPrice }} USDT</p>
                </v-col>
                <v-col cols="12" class="connect-button">
                  <button class="button" @click="mintNFT">
                    Mint
                  </button>
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

<style lang="scss">
.modal {
  position: relative;
}

.nft-modal {
  position: fixed; /* Use fixed positioning */
  top: 54%; /* Position the top edge of the modal in the middle of the screen vertically */
  left: 50%; /* Position the left edge of the modal in the middle of the screen horizontally */
  transform: translate(-50%, -50%); /* Move the modal back by half its width and height to center it */
  background-color: rgba(42, 44, 63, 0.95); /* Adjust the background color and opacity as needed */
  text-align: center;
  border: 1px solid #E5E6E8;
  border-radius: 17px;
  min-width: 50%;
  max-width: 90%; /* Optionally set a max-width to ensure it doesn't get too wide on larger screens */
  max-height: 90%; /* Optionally set a max-height to ensure it doesn't get too tall */
  overflow-y: auto; /* Allows scrolling inside the modal if content is too long */
  z-index: 10; /* Ensure it's above other elements */
  display: flex; /* Enable flex layout */
  flex-direction: column; /* Stack children vertically */

}

.modal-content-section {
  margin: auto;
  flex-grow: 1; /* Allow this section to grow and fill available space */
  display: flex; /* Enable flex layout */
  flex-direction: column; /* Stack children vertically */
  justify-content: space-around; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  min-height: 60vh !important;
}

.modal-header {
  display: inline-flex !important;
  flex-shrink: 0; /* Prevent the header from shrinking */
  padding-right: 20px;
}

.modal-header h1 {
  color: #fff !important;
}

.btn-close {
  position: absolute; /* Position the button absolutely within the modal */
  top: 29px; /* Distance from the top edge of the modal */
  right: 15px; /* Distance from the right edge of the modal */
  border: none; /* Optional: Removes the border from the button */
  background: none; /* Optional: Removes the background from the button */
  cursor: pointer; /* Changes the cursor to a pointer on hover */
  /* Add additional styles as needed */
}

.btn-close img{
  max-width:20px;
}
.modal-body {
  flex-grow: 1; /* Allow the body to grow and fill available space */
  display: flex; /* Enable flex layout for the body */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center content horizontally */
  justify-content: center !important; /* Center content vertically */
}

.text-section p {
  font-size: 22px !important;
}

.connect-button {
  margin-top: 40px;
  padding-top: 5px;
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

.nft-display img {
  margin-bottom:0 !important;
  max-width: 200px;
  min-height: 100%;
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
    -moz-appearance: textfield; /* Removes default spinner for Firefox */
    appearance: textfield; /* Removes default spinner for other browsers */
    border: 1px solid #E5E6E8;
    border-radius: 7px;
  }

  .mint-amount-input::-webkit-inner-spin-button,
  .mint-amount-input::-webkit-outer-spin-button {
    opacity: 1;
  }

  .mint-amount-input :active {
    border: 1px solid #6202EE !important;
  }

.tx_status {
  font-size:22px;
  margin-top: 40px;
}

.opensea {
  background-color: #2081e2; /* OpenSea's primary blue color */
  color: white; /* White text color */
  border: none; /* No border */
  padding: 10px 20px; /* Padding around the text and logo */
  border-radius: 5px; /* Rounded corners */
  font-weight: bold; /* Bold font */
  display: inline-flex; /* To align the logo and text inline */
  align-items: center; /* Center items vertically */
  text-decoration: none; /* Remove underline from text */
  cursor: pointer; /* Change cursor to pointer on hover */
  font-size: 16px; /* Font size */
  margin-top: 50px;

  &:before {
    content: ''; /* Before pseudo-element for the logo */
    background-image: url('/images/opensea_logo.png');
    background-size: cover; /* Cover the entire content area */
    display: inline-block; /* Make it an inline block */
    width: 24px; /* Width of the logo */
    height: 24px; /* Height of the logo */
    margin-right: 10px; /* Space between logo and text */
  }

  &:hover {
    background-color: darken(#2081e2, 10%); /* Slightly darken the button on hover */
    cursor: pointer;
  }
}
</style>
