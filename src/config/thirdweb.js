// ThirdWeb Configuration
export const thirdwebConfig = {
  clientId: 'demo', // Demo client ID for testing
  supportedChains: [
    {
      id: 1,
      name: 'Ethereum',
      rpc: 'https://ethereum.rpc.thirdweb.com',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorers: [
        {
          name: 'Etherscan',
          url: 'https://etherscan.io',
        },
      ],
    },
    {
      id: 137,
      name: 'Polygon',
      rpc: 'https://polygon.rpc.thirdweb.com',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      blockExplorers: [
        {
          name: 'PolygonScan',
          url: 'https://polygonscan.com',
        },
      ],
    },
    {
      id: 56,
      name: 'Binance Smart Chain',
      rpc: 'https://bsc.rpc.thirdweb.com',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      blockExplorers: [
        {
          name: 'BscScan',
          url: 'https://bscscan.com',
        },
      ],
    },
  ],
  defaultChain: 1, // Ethereum
  autoConnect: true,
  theme: {
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
    },
  },
}

// Helper functions
export const getChainById = (chainId) => {
  return thirdwebConfig.supportedChains.find(chain => chain.id === chainId)
}

export const isChainSupported = (chainId) => {
  return thirdwebConfig.supportedChains.some(chain => chain.id === chainId)
}
