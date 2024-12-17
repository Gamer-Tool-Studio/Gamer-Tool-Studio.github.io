import _process from 'node:process'

const apiVersion = _process.env.API_VERSION
export const BASE_URL = _process.server
  ? _process.env.NODE_ENV !== 'production'
    ? `http://localhost:3002/api/${apiVersion}/`
    : `https://example.com/api/${apiVersion}/`
  : null

export const NFTS_LIST = [
  {
    id: 1,
    name: 'The Wife',
    description:
      'The outspoken wife of Mr.Hamilton. Does the victim\'s life partner conceal his darkest secrets?',
    src: '/images/wife.png',
  },
  {
    id: 2,
    name: 'The Butler',
    description:
      'A refined gentleman in whom Mr. Hamilton placed the highest trust. Was it misplaced?',
    src: '/images/butler.png',
  },
  {
    id: 3,
    name: 'The Maid',
    description:
      'A shy and caring servant who might know more about her masters\' life than they know.',
    src: '/images/maid.png',
  },
  {
    id: 4,
    name: 'The Gardener',
    description:
      'A simple working man that seems to only care about plants and flowers. Or does he?',
    src: '/images/gardener.png',
  },
  {
    id: 5,
    name: 'The Cook',
    description:
      'An extravagant cooking master who\'s been in the family since she was a child? Is there a catch?',
    src: '/images/cook.png',
  },
  {
    id: 6,
    name: 'The Journalist',
    description:
      'A rising reporting star investigating Mr.Hamilton\'s latest scandal. Is he involved?',
    src: '/images/journalist.png',
  },
  {
    id: 7,
    name: 'The Businessman',
    description:
      'A rude influential businessman with life-long dealings with Mr.Hamilton. Have things gone wrong?',
    src: '/images/businessman.png',
  },
]

export const stableContractAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
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
]

export const NETWORKS_LIST = [
  {
    chainId: 80002,
    rpcUrls: ['https://rpc-amoy.polygon.technology/'],
    chainName: 'Polygon Amoy Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
  },
  {
    chainId: 56,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    chainName: 'BSC Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  {
    chainId: 421614,
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  },
  {
    chainId: 42161,
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    chainName: 'Arbitrum One Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  {
    chainId: 43114,
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    chainName: 'C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://snowtrace.io/'],
  },
  {
    chainId: 137,
    rpcUrls: ['https://polygon-rpc.com/'],
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  {
    chainId: 2732190003600000,
    rpcUrls: ['https://gamerstudiochain-2732190003600000-1.jsonrpc.sagarpc.io'],
    chainName: 'SAGA Chainlet GTS',
    nativeCurrency: {
      name: 'GTS',
      symbol: 'GTS',
      decimals: 18,
    },
    blockExplorerUrls: ['https://gamerstudiochain-2732190003600000-1.sagaexplorer.io/'],
  },
]

export const nftContractAbi = [
  {
    inputs: [
      { internalType: 'address[]', name: '_acceptedTokens', type: 'address[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'BatchMintInvalidBatchId',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'BatchMintInvalidTokenId',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'batchId', type: 'uint256' }],
    name: 'BatchMintMetadataFrozen',
    type: 'error',
  },
  { inputs: [], name: 'ContractMetadataUnauthorized', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'needed', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'approver', type: 'address' }],
    name: 'ERC1155InvalidApprover',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'idsLength', type: 'uint256' },
      { internalType: 'uint256', name: 'valuesLength', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'operator', type: 'address' }],
    name: 'ERC1155InvalidOperator',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    name: 'ERC1155InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
    type: 'error',
  },
  { inputs: [], name: 'LazyMintInvalidAmount', type: 'error' },
  { inputs: [], name: 'LazyMintUnauthorized', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fromTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_toTokenId',
        type: 'uint256',
      },
    ],
    name: 'BatchMetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'prevURI',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newURI',
        type: 'string',
      },
    ],
    name: 'ContractURIUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxSupply',
        type: 'uint256',
      },
    ],
    name: 'MaxSupplyUpdated',
    type: 'event',
  },
  { anonymous: false, inputs: [], name: 'MetadataFrozen', type: 'event' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPrice',
        type: 'uint256',
      },
    ],
    name: 'MintPriceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Minted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'TokenAccepted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'TokenRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'startTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'encryptedBaseURI',
        type: 'bytes',
      },
    ],
    name: 'TokensLazyMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'value', type: 'string' },
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'URI',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [],
    name: 'SUSPECT_1_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_2_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_3_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_4_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_5_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_6_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUSPECT_7_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'acceptToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'acceptedTokens',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'accounts', type: 'address[]' },
      { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'batchFrozen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBaseURICount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'getBatchIdAtIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'string', name: '_baseURIForTokens', type: 'string' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'lazyMint',
    outputs: [{ internalType: 'uint256', name: 'batchId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'maxSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'paymentToken', type: 'address' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'mintedCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'removeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_uri', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'newMaxSupply', type: 'uint256' },
    ],
    name: 'updateMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newPrice', type: 'uint256' }],
    name: 'updateMintPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'uri',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const NFT_ADDRESSES_LIST = [
  {
    chain: 'SAGA Chainlet',
    chainId: 2732190003600000,
    stableContractAddress: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
    nftContractAddress: '0x56b4fAAfA1AF53553542429aB9bC77F55E9722f7',
    stableSymbol: 'GTS',
    address: [
      {
        type: 'ERC20',
        address: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
      },
      {
        type: 'ERC1155',
        address: '0x56b4fAAfA1AF53553542429aB9bC77F55E9722f7',
      },
    ],
  },
  {
    chain: 'OP Mainnet',
    chainId: 10,
    stableContractAddress: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    nftContractAddress: '0xd0dCB97bC361C67b36a2254eA31909499118E1FB',
    stableSymbol: 'USDT',
    address: [
      {
        type: 'ERC20',
        address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
      },
      {
        type: 'ERC1155',
        address: '0xd0dCB97bC361C67b36a2254eA31909499118E1FB',
      },
    ],
  },
  {
    chain: 'BSC Binance Smart Chain',
    chainId: 56,
    stableContractAddress: '0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409',
    nftContractAddress: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
    stableSymbol: 'USDC',
    address: [
      {
        type: 'ERC20',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      },
      {
        type: 'ERC1155',
        address: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
      },
    ],
  },
  // {
  //   chain: 'Polygon test',
  //   chainId: 80002,
  //   stableContractAddress: '0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee',
  //   nftContractAddress: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
  //   stableSymbol : 'USDT',
  //   address: [
  //     {
  //       type: 'ERC20',
  //       address: '0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee',
  //     },
  //     {
  //       type: 'ERC1155',
  //       address: '0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC',
  //     },
  //   ],
  // },
  // {
  //   chain: 'Arbitrum Sepolia',
  //   chainId: 421614,
  //   stableContractAddress: '0xd0dCB97bC361C67b36a2254eA31909499118E1FB',
  //   nftContractAddress: '0x52772940628d1EBc08E1B50C39e466495f808F89',
  //   stableSymbol : 'USDT',
  //   address: [
  //     {
  //       type: 'ERC20',
  //       address: '0xd0dCB97bC361C67b36a2254eA31909499118E1FB',
  //     },
  //     {
  //       type: 'ERC1155',
  //       address: '0x52772940628d1EBc08E1B50C39e466495f808F89',
  //     },
  //   ],
  // },
  // {
  //   chain: 'Arbitrum One',
  //   chainId: 42161,
  //   stableContractAddress: '',
  //   nftContractAddress: '',
  //   stableSymbol : 'USDT',
  //   address: [
  //     {
  //       type: 'ERC20',
  //       address: '',
  //     },
  //     {
  //       type: 'ERC1155',
  //       address: '',
  //     },
  //   ],
  // },
  // {
  //   chain: 'Avalanche C-Chain',
  //   chainId: 43114,
  //   stableContractAddress: '',
  //   nftContractAddress: '',
  //   stableSymbol : 'USDT',
  //   address: [
  //     {
  //       type: 'ERC20',
  //       address: '',
  //     },
  //     {
  //       type: 'ERC1155',
  //       address: '',
  //     },
  //   ],
  // },
  // {
  //   chain: 'Polygon Mainnet',
  //   chainId: 137,
  //   stableContractAddress: '',
  //   nftContractAddress: '',
  //   stableSymbol : 'USDT',
  //   address: [
  //     {
  //       type: 'ERC20',
  //       address: '',
  //     },
  //     {
  //       type: 'ERC1155',
  //       address: '',
  //     },
  //   ],
  // },
]
